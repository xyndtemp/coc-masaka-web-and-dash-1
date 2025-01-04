import { sentryVitePlugin } from "@sentry/vite-plugin";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { componentTagger } from "lovable-tagger";
import config from "./src/config/default.json";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: "8080",
  },

  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    sentryVitePlugin({
      org: "xyrus-code",
      project: "coc-masaka-airtable",
      release: {
        name: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
      },
    })
  ].filter(Boolean),

  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "lib",
        replacement: resolve(__dirname, "lib"),
      },
      {
        find: "config",
        replacement: resolve(__dirname, "./src/config"),
      }
    ],
  },

  build: {
    sourcemap: true
  }
}));