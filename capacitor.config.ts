
import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "com.hieulv03.scare",
    appName: "Scare",
    webDir: "www",
    server: {
        url: "https://YOUR-SCARE-WEBSITE-URL",
        cleartext: false,
    },
    plugins: {
        Fullscreen: {
            activateOnLoad: false,
        },
    },
};

export default config;
