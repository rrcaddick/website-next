import { readFile, writeFile, readdir } from "fs/promises";
import { join } from "path";

const BASE_URL = "https://res.cloudinary.com/dqxnz4cpu/image/upload";
const CONTENT_DIR = "content";

async function* findJson(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* findJson(full);
    else if (entry.name.endsWith(".json")) yield full;
  }
}

async function patch() {
  const files = [];
  for await (const f of findJson(CONTENT_DIR)) files.push(f);
  let patched = 0;

  for (const file of files) {
    const original = await readFile(file, "utf8");
    const updated = original.replace(/\/images\//g, `${BASE_URL}/images/`);
    if (updated !== original) {
      await writeFile(file, updated, "utf8");
      console.log(`Patched: ${file}`);
      patched++;
    }
  }

  console.log(`Done — patched ${patched} files.`);
}

patch().catch(console.error);
