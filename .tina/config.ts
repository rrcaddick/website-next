import { defineConfig } from "tinacms";
import { TinaUserCollection, UsernamePasswordAuthJSProvider } from "tinacms-authjs/dist/tinacms";
import { LocalAuthProvider } from "tinacms";

const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

// ─── Shared field groups ─────────────────────────────────────────────────────

const heroFields = [
  { name: "mobileSrc", label: "Mobile Image", type: "image" as const, required: true },
  { name: "desktopSrc", label: "Desktop Image", type: "image" as const, required: true },
];

const infoSectionFields = [
  { name: "heading", label: "Heading", type: "string" as const, required: true },
  {
    name: "content",
    label: "Content (one item per line)",
    type: "string" as const,
    list: true,
  },
  {
    name: "align",
    label: "Alignment",
    type: "string" as const,
    options: [
      { value: "left", label: "Left" },
      { value: "center", label: "Center" },
      { value: "right", label: "Right" },
    ],
  },
];

const ctaFields = [
  { name: "heading", label: "Heading", type: "string" as const, required: true },
  {
    name: "description",
    label: "Description",
    type: "string" as const,
    ui: { component: "textarea" },
  },
  {
    name: "button",
    label: "Button",
    type: "object" as const,
    fields: [
      { name: "href", label: "URL", type: "string" as const },
      { name: "label", label: "Label", type: "string" as const },
    ],
  },
];

const galleryImageFields = [
  { name: "src", label: "Thumbnail", type: "image" as const },
  { name: "alt", label: "Alt Text", type: "string" as const },
  { name: "fullSize", label: "Full-Size Image", type: "image" as const },
];

// Card blocks modelled as Tina templates (adds _template field alongside type).
// CardBlockRenderer checks `block._template || block.type` for backwards compatibility
// with existing JSON that only has `type`.
// Note: `required` is omitted on `content` in title/subheading to keep the GraphQL
// type as nullable `String` across all non-list templates (avoids String! vs String
// conflict). The `list` template uses `contentItems` (not `content`) to avoid the
// String vs [String] type conflict. CardBlockRenderer handles both field names for
// backwards compatibility with existing JSON that uses `content: string[]`.
const blockTemplates = [
  {
    name: "title",
    label: "Title",
    fields: [{ name: "content", label: "Text", type: "string" as const }],
  },
  {
    name: "text",
    label: "Text",
    fields: [
      {
        name: "content",
        label: "Text",
        type: "string" as const,
        ui: { component: "textarea" },
      },
    ],
  },
  {
    name: "subheading",
    label: "Subheading",
    fields: [{ name: "content", label: "Text", type: "string" as const }],
  },
  {
    name: "list",
    label: "List",
    fields: [
      {
        name: "contentItems",
        label: "Items (one per line)",
        type: "string" as const,
        list: true,
      },
    ],
  },
];

// ─── Config ──────────────────────────────────────────────────────────────────

export default defineConfig({
  branch,
  clientId: "",
  token: "",
  authProvider: isLocal ? new LocalAuthProvider() : new UsernamePasswordAuthJSProvider(),

  // Self-hosted: point the Tina admin at our own API route
  contentApiUrlOverride: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/tina/gql`,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      return pack.CloudinaryMediaStore;
    },
  },

  schema: {
    collections: [
      TinaUserCollection,
      // ── Accommodation ───────────────────────────────────────────────────────
      {
        name: "accommodation",
        label: "Accommodation",
        path: "content/accommodation",
        format: "json",
        ui: {
          router: ({ document }) => `/accommodation/${document._sys.filename}`,
        },
        fields: [
          { name: "slug", label: "Slug", type: "string", required: true },
          { name: "title", label: "Title", type: "string", required: true },
          {
            name: "description",
            label: "Description",
            type: "string",
            ui: { component: "textarea" },
            required: true,
          },
          { name: "hero", label: "Hero Images", type: "object", fields: heroFields },
          {
            name: "gallery",
            label: "Gallery",
            type: "object",
            list: true,
            fields: galleryImageFields,
          },
          { name: "imagesPerPage", label: "Images Per Page", type: "number" },
          { name: "cardImage", label: "Card Image", type: "image" },
          { name: "cardMobileImage", label: "Card Mobile Image", type: "image" },
          {
            name: "cardDescription",
            label: "Card Description",
            type: "string",
            ui: { component: "textarea" },
          },
          { name: "cardFeatures", label: "Card Features", type: "string", list: true },
          { name: "showBookNow", label: "Show Book Now Button", type: "boolean" },
          {
            name: "infoSections",
            label: "Info Sections",
            type: "object",
            list: true,
            fields: infoSectionFields,
          },
          { name: "cta", label: "Call to Action", type: "object", fields: ctaFields },
        ],
      },

      // ── Adventures ──────────────────────────────────────────────────────────
      {
        name: "adventures",
        label: "Adventures",
        path: "content/adventures",
        format: "json",
        ui: {
          router: ({ document }) => `/adventures/${document._sys.filename}`,
        },
        fields: [
          { name: "slug", label: "Slug", type: "string", required: true },
          { name: "title", label: "Title", type: "string", required: true },
          {
            name: "description",
            label: "Description",
            type: "string",
            ui: { component: "textarea" },
            required: true,
          },
          { name: "category", label: "Category", type: "string" },
          { name: "hero", label: "Hero Images", type: "object", fields: heroFields },
          {
            name: "gallery",
            label: "Gallery",
            type: "object",
            list: true,
            fields: galleryImageFields,
          },
          { name: "imagesPerPage", label: "Images Per Page", type: "number" },
          { name: "cardImage", label: "Card Image", type: "image" },
          { name: "cardMobileImage", label: "Card Mobile Image", type: "image" },
          {
            name: "cardDescription",
            label: "Card Description",
            type: "string",
            ui: { component: "textarea" },
          },
          { name: "cardFeatures", label: "Card Features", type: "string", list: true },
          {
            name: "infoSections",
            label: "Info Sections",
            type: "object",
            list: true,
            fields: infoSectionFields,
          },
          { name: "cta", label: "Call to Action", type: "object", fields: ctaFields },
        ],
      },

      // ── Listing Pages ────────────────────────────────────────────────────────
      // home, accommodation, adventures, entertainment, facilities, fairy-folk-n-roll, venue
      {
        name: "listingPages",
        label: "Listing Pages",
        path: "content/pages",
        format: "json",
        match: {
          exclude: "{contact,gallery}",
        },
        ui: {
          router: ({ document }) => {
            const filename = document._sys.filename;
            return filename === "home" ? "/" : `/${filename}`;
          },
        },
        fields: [
          { name: "title", label: "Title", type: "string", required: true },
          {
            name: "description",
            label: "Description",
            type: "string",
            ui: { component: "textarea" },
          },
          { name: "hero", label: "Hero Images", type: "object", fields: heroFields },
          {
            name: "items",
            label: "Cards",
            type: "object",
            list: true,
            fields: [
              { name: "image", label: "Card Image", type: "image" },
              { name: "href", label: "Link URL", type: "string" },
              {
                name: "blocks",
                label: "Content Blocks",
                type: "object",
                list: true,
                templates: blockTemplates,
              },
            ],
          },
          { name: "columns", label: "Grid Columns", type: "number" },
          { name: "showBookNow", label: "Show Book Now Button", type: "boolean" },
          {
            name: "infoSections",
            label: "Info Sections",
            type: "object",
            list: true,
            fields: infoSectionFields,
          },
          { name: "cta", label: "Call to Action", type: "object", fields: ctaFields },
          {
            name: "footnote",
            label: "Footnote",
            type: "string",
            ui: { component: "textarea" },
          },
          { name: "galleryHeading", label: "Gallery Section Heading", type: "string" },
        ],
      },

      // ── Contact Page ─────────────────────────────────────────────────────────
      {
        name: "contactPage",
        label: "Contact Page",
        path: "content/pages",
        format: "json",
        match: { include: "contact" },
        ui: {
          router: () => `/contact`,
        },
        fields: [
          { name: "title", label: "Page Title", type: "string" },
          { name: "mobileSrc", label: "Mobile Hero Image", type: "image" },
          { name: "desktopSrc", label: "Desktop Hero Image", type: "image" },
          { name: "infoHeading", label: "Info Section Heading", type: "string" },
          {
            name: "infoSections",
            label: "Info Sections",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.sectionTitle || "New Section",
              }),
            },
            fields: [
              { name: "sectionTitle", label: "Section Title", type: "string" },
              { name: "sectionsItems", label: "Items", type: "string", list: true },
            ],
          },
          { name: "formHeading", label: "Form Heading", type: "string" },
          {
            name: "formFields",
            label: "Form Fields",
            type: "object",
            list: true,
            fields: [
              { name: "name", label: "Field Name (HTML)", type: "string" },
              { name: "label", label: "Display Label", type: "string" },
              {
                name: "type",
                label: "Input Type",
                type: "string",
                options: ["text", "email", "tel", "textarea"],
              },
              { name: "placeholder", label: "Placeholder", type: "string" },
              { name: "required", label: "Required", type: "boolean" },
            ],
          },
          { name: "formSubmitLabel", label: "Submit Button Label", type: "string" },
        ],
      },

      // ── Gallery Page ──────────────────────────────────────────────────────────
      {
        name: "galleryPage",
        label: "Gallery Page",
        path: "content/pages",
        format: "json",
        match: { include: "gallery" },
        ui: {
          router: () => `/gallery`,
        },
        fields: [
          { name: "galleryHeading", label: "Heading", type: "string" },
          {
            name: "galleryDetail",
            label: "Description",
            type: "string",
            ui: { component: "textarea" },
          },
          { name: "emptyMessage", label: "Empty State Message", type: "string" },
        ],
      },

      // ── Site Settings ─────────────────────────────────────────────────────────
      {
        name: "site",
        label: "Site Settings",
        path: "content",
        format: "json",
        match: { include: "site" },
        ui: { global: true },
        fields: [
          { name: "address", label: "Address", type: "string" },
          { name: "phone", label: "Phone", type: "string" },
          { name: "email", label: "Email", type: "string" },
          {
            name: "social",
            label: "Social Links",
            type: "object",
            fields: [
              { name: "facebook", label: "Facebook URL", type: "string" },
              { name: "instagram", label: "Instagram URL", type: "string" },
              { name: "youtube", label: "YouTube URL", type: "string" },
            ],
          },
          {
            name: "seo",
            label: "SEO",
            type: "object",
            fields: [
              { name: "defaultTitle", label: "Default Page Title", type: "string" },
              {
                name: "defaultDescription",
                label: "Default Meta Description",
                type: "string",
                ui: { component: "textarea" },
              },
              {
                name: "home",
                label: "Home Page SEO",
                type: "object",
                fields: [
                  { name: "title", label: "Title", type: "string" },
                  {
                    name: "description",
                    label: "Description",
                    type: "string",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
          {
            name: "errors",
            label: "Error Pages",
            type: "object",
            fields: [
              {
                name: "generic",
                label: "Generic Error",
                type: "object",
                fields: [
                  { name: "title", label: "Title", type: "string" },
                  { name: "message", label: "Message", type: "string" },
                  { name: "button", label: "Button Label", type: "string" },
                ],
              },
              {
                name: "gallery",
                label: "Gallery Error",
                type: "object",
                fields: [
                  { name: "title", label: "Title", type: "string" },
                  { name: "message", label: "Message", type: "string" },
                  { name: "button", label: "Button Label", type: "string" },
                ],
              },
            ],
          },
          {
            name: "defaults",
            label: "Defaults",
            type: "object",
            fields: [{ name: "galleryHeading", label: "Gallery Heading Fallback", type: "string" }],
          },
        ],
      },

      // ── Navigation ────────────────────────────────────────────────────────────
      {
        name: "nav",
        label: "Navigation",
        path: "content",
        format: "json",
        match: { include: "nav" },
        ui: { global: true },
        fields: [
          {
            name: "topLevelLinks",
            label: "Top Level Links",
            type: "object",
            list: true,
            fields: [
              { name: "href", label: "URL", type: "string" },
              { name: "label", label: "Label", type: "string" },
            ],
          },
          {
            name: "accommodationLinks",
            label: "Accommodation Dropdown Links",
            type: "object",
            list: true,
            fields: [
              { name: "href", label: "URL", type: "string" },
              { name: "label", label: "Label", type: "string" },
            ],
          },
          {
            name: "adventureLinks",
            label: "Adventure Dropdown Links",
            type: "object",
            list: true,
            fields: [
              { name: "href", label: "URL", type: "string" },
              { name: "label", label: "Label", type: "string" },
            ],
          },
        ],
      },
    ],
  },
});
