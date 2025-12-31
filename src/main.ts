import "dotenv/config";
import bs58 from "bs58";
import { Monitor } from "./Monitor";
import { PumpFunParser } from "./classes/PumpfunParser";
import { BuyHandler } from "./classes/handlers/BuyHandler";
import { SellHandler } from "./classes/handlers/SellHandler";
import { PUMPFUN_PROGRAM } from "./constants";

const GRPC_URL = process.env.GRPC_URL!;

function decodeKeys(message: any): string[] {
    const rawKeys: Buffer[] = message.staticAccountKeys ?? message.accountKeys ?? [];
    return rawKeys.map((k) => bs58.encode(Buffer.from(k)));
}

function decodeData(ix: any): Buffer | null {
    if (!ix?.data) return null;
    return typeof ix.data === "string" ? Buffer.from(ix.data, "base64") : Buffer.from(ix.data);
}

async function main() {
    console.log("Listening for Pump.fun transactions...\n");

    const parser = new PumpFunParser([new BuyHandler(), new SellHandler()]);
    const monitor = new Monitor(GRPC_URL, PUMPFUN_PROGRAM);

    await monitor.start((update) => {
        const tx = update?.transaction?.transaction?.transaction;
        const message = tx?.message;
        if (!message) return;

        const keys = decodeKeys(message);
        if (keys.length === 0) return;

        const instructions = message.instructions ?? [];
        for (const ix of instructions) {
            if (keys[ix.programIdIndex] !== PUMPFUN_PROGRAM) continue;

            const rawData = decodeData(ix);
            if (!rawData) continue;

            const accountIndexes: number[] = Array.from(ix.accounts ?? []);

            parser.parse({
                data: rawData,
                accounts: accountIndexes.map((i) => keys[i]),
            });
        }
    });
}

main().catch(console.error);
