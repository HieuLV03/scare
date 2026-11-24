
import { Client } from "@colyseus/sdk";

const serverUrl = (
    process.env.NEXT_PUBLIC_GAME_SERVER_URL ||
    "https://scare.onrender.com"
)
    .trim()
    .replace(/\/+$/, "");

console.log("[SCARE] Colyseus server URL:", serverUrl);

const client = new Client(serverUrl);

export default client;
