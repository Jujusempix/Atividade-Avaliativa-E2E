import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  fixturesFolder: "fixtures",
  screenshotsFolder: "screenshots",
  videosFolder: "videos",
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "e2e/**/*.cy.ts",
    supportFile: "support/e2e.ts",
  },
});
