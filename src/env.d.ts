/// <reference types="astro/client" />

// Minimal typing for the Workers runtime module used by the form endpoint.
// (Run `npx wrangler types` for full generated bindings if more are added.)
declare module 'cloudflare:workers' {
  export const env: Record<string, unknown>;
}
