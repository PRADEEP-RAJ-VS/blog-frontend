import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    // allow your Azure-hosted URL so that `vite preview` won’t block it
    allowedHosts: [
      "cloud-auto-gzcwg7ahcabqhrf2.centralindia-01.azurewebsites.net"
    ]
  }
});
