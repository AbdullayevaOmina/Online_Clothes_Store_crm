import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/*" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@modals", replacement: "/src/components/modals" },
      { find: "@global_table", replacement: "/src/components" },
      { find: "@layout", replacement: "/src/layout" },
      { find: "@ui", replacement: "/src/components/ui" },
      { find: "@store", replacement: "/src/store/index" },
      { find: "@notification", replacement: "/src/plugins/notification.ts" },
      { find: "@router", replacement: "/src/router" },
      { find: "@auth-interface", replacement: "/src/interfaces/auth.ts" },
      {
        find: "@categories-interface",
        replacement: "/src/interfaces/categories.ts",
      },
      {
        find: "@products-interface",
        replacement: "/src/interfaces/products.ts",
      },
      {
        find: "@workers-interface",
        replacement: "/src/interfaces/workers.ts",
      },
      {
        find: "@users-interface",
        replacement: "/src/interfaces/users.ts",
      },
      { find: "@global-interface", replacement: "/src/interfaces/global.ts" },
      { find: "@service", replacement: "/src/service" },
      { find: "@validation", replacement: "/src/utils/validations.ts" },
      { find: "@token-service", replacement: "/src/utils/token-service.ts" },
      { find: "@data-service", replacement: "/src/utils/data-service.ts" },
    ],
  },
});
