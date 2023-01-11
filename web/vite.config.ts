import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import sentryVitePlugin from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  return defineConfig({
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [
      sentryVitePlugin({
        org: "cr3ators-studio",
        project: "shiritori_front",

        // Specify the directory containing build artifacts
        include: "./dist",

        // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
        // and needs the `project:releases` and `org:read` scopes
        authToken: process.env.SENTRY_AUTH_TOKEN,

        // Optionally uncomment the line below to override automatic release name detection
        // release: process.env.RELEASE,
      }),
      ,
      react(),
      tsconfigPaths(),
    ],
    resolve: {
      alias: {
        path: "path-browserify",
      },
    },
  });
};
