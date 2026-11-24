import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: "/",
        name: "Scare - Battle Royale",
        short_name: "Scare",
        description: "Scare Multiplayer Battle Royale Game",

        start_url: "/",
        scope: "/",

        display: "fullscreen",
        orientation: "landscape",

        background_color: "#080b10",
        theme_color: "#080b10",

        categories: ["games", "entertainment"],

        icons: [
            {
                src: "/icons/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icons/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}