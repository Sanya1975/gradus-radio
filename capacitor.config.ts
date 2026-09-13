import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.gradus.radio",
  appName: "Градус",
  webDir: "dist",
  server: {
    androidScheme: "https",
    cleartext: true,
  },
};

export default config;