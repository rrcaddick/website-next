# TinaCMS failure investigation

## Summary

The primary failure is not in your schema or your content files. It is a runtime module interoperability problem in the installed Tina stack:

- `tinacms@3.7.2` is published as ESM.
- Its built entrypoint imports `color-string` like this:
  - `import colorString, { get, to } from "color-string"`
- The installed `color-string@1.9.1` package is CommonJS-only.
- In this environment, Node exposes only the default export for that package, not named exports like `get` and `to`.
- When Next compiles and executes the Tina API route, Node throws:
  - `SyntaxError: Named export 'get' not found`

That crash causes `/api/tina/gql` to return a 500 HTML error page instead of JSON. The Tina admin then tries to parse that HTML as JSON and shows:

- `Unexpected error checking schema: SyntaxError: Unexpected token '<'`

So the browser error is only a downstream symptom. The real break is the server-side `tinacms` import.

## What I verified locally

### 1. The installed packages match the failing import

- `package.json` uses:
  - `tinacms: ^3.7.2`
  - `@tinacms/cli: ^2.2.2`
  - `@tinacms/datalayer: ^2.0.15`
  - `tinacms-authjs: ^21.0.2`
- `node_modules/tinacms/dist/index.js` contains:
  - `import colorString, { get as get$6, to as to$1 } from "color-string";`
- `node_modules/color-string/package.json` is version `1.9.1`
- `node_modules/color-string/index.js` is CommonJS (`require(...)`, `module.exports = ...`)

### 2. This reproduces outside Next.js

Direct Node import of `color-string` shows only a default export:

```js
import("color-string") // => [ 'default' ]
```

Direct Node import of `tinacms` fails with the same error you see during `npm run dev`:

```txt
SyntaxError: Named export 'get' not found
```

That confirms the issue is in the installed Tina package/runtime interaction, not in your content schema.

### 3. Why the API route is the place where it blows up

Your Tina route is:

- [src/pages/api/tina/[...routes].ts](/home/ray/repos/next/src/pages/api/tina/[...routes].ts)

It imports `tinacms-authjs` at module scope:

```ts
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from "tinacms-authjs";
```

`tinacms-authjs` itself imports `AbstractAuthProvider` from `tinacms`, which triggers the broken `tinacms -> color-string` import chain before the route handler even runs.

This matters because your `.env` has:

- `TINA_PUBLIC_IS_LOCAL=true`

So local development should be able to use `LocalBackendAuthProvider()` without touching Auth.js at all, but the top-level import still forces the broken package to load.

## Why the browser shows `Unexpected token '<'`

The admin UI calls:

- `http://localhost:3000/api/tina/gql`

Your Tina config explicitly points there:

- [.tina/config.ts](/home/ray/repos/next/.tina/config.ts)

Because the API route crashes during module load, Next returns an HTML error response. The admin expects JSON, starts parsing, sees `<!DOCTYPE html>`, and throws the `Unexpected token '<'` message.

## Phased fix approach

## Phase 1: Fix the actual package/runtime break

Preferred fix:

- Upgrade the Tina package set together so all Tina packages resolve to a version where the `color-string` interop problem is fixed.

Packages that should be kept aligned:

- `tinacms`
- `@tinacms/cli`
- `@tinacms/datalayer`
- `tinacms-authjs`
- `tinacms-gitprovider-github`
- `next-tinacms-cloudinary`

Why:

- The failure is inside `node_modules/tinacms/dist/index.js`, not in your app code.
- A clean reinstall of the current versions alone is unlikely to help, because the broken import is already present in the published bundle currently installed.

Validation after upgrading:

1. Delete `node_modules` and lockfile only if you intentionally want a full reinstall.
2. Reinstall dependencies.
3. Verify this succeeds before starting Next:

```bash
node --input-type=module -e 'import("tinacms").then(()=>console.log("ok"))'
```

If that import still fails, the root issue is not fixed yet.

## Phase 2: Remove the local-dev footgun in the API route

Even if you upgrade Tina, the API route should be hardened for local development.

Recommended change:

- Do not import `tinacms-authjs` at the top of [src/pages/api/tina/[...routes].ts](/home/ray/repos/next/src/pages/api/tina/[...routes].ts).
- Load Auth.js only inside the non-local branch.

Why:

- With `TINA_PUBLIC_IS_LOCAL=true`, local dev should not depend on `tinacms-authjs` or `next-auth`.
- Right now the route eagerly imports Auth.js code even when it will not be used.
- That turns an avoidable dependency issue into a hard startup failure.

Practical effect:

- This is the smallest project-level workaround for local development.
- It may allow local Tina editing to work even before you fully upgrade the Tina package set.

## Phase 3: Re-test the admin flow

After fixing Phase 1 and/or Phase 2:

1. Run `npm run dev`
2. Open `http://localhost:3000/admin/index.html`
3. Confirm `POST /api/tina/gql` returns `200` instead of `500`
4. Confirm the browser no longer shows the JSON parse error

The key signal is the API route. Once it returns JSON, the browser-side error should disappear.

## Phase 4: Clean up secondary config risks

These are not the cause of the current crash, but they will matter next:

- `.env` has `NEXTAUTH_SECRET=` empty
- `.env` has `GITHUB_BRANCH=` empty
- `.tina/config.ts` has `clientId: ""` and `token: ""`

Why they are secondary:

- Local mode is enabled, so the current crash happens before those values become the main problem.
- For production or non-local auth flows, these blanks will need to be addressed.

## Recommended order of action

1. Fix the Tina package/runtime mismatch first.
2. Refactor the API route so local mode does not import Auth.js eagerly.
3. Re-test `/admin/index.html`.
4. Only then deal with production auth and cloud config values.

## Root cause in one line

`/admin/index.html` fails because the Tina GraphQL API route crashes while importing `tinacms@3.7.2`, whose ESM bundle tries to use named imports from the CommonJS-only `color-string@1.9.1` package.
