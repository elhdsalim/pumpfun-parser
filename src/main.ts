import bs58 from "bs58";
import { Connection } from "@solana/web3.js";
import { PumpFunParser } from "./classes/PumpfunParser";
import { BuyHandler } from "./classes/handlers/BuyHandler";
import { SellHandler } from "./classes/handlers/SellHandler";
import 'dotenv/config'

async function main() {
    const conn = new Connection(process.env.RPC_URL!);

    const tx = await conn.getTransaction("4PC97hmk25zK3ZxxUWhVZ4p811mWcQde9yyMdwodg9KX7Ev42BCeAWPbSz9asEocRXWb1iuVoJGjmbbwNeAtFZu2", {
        maxSupportedTransactionVersion: 0
    });

    if (!tx) return;

    const keys = tx.transaction.message.staticAccountKeys.map(k =>
        k.toBase58()
    );

    const instructions = tx.transaction.message.compiledInstructions;

    const parser = new PumpFunParser([
        new BuyHandler(),
        new SellHandler(),
    ]);

    for (const ix of instructions) {
        if (keys[ix.programIdIndex] !== "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P") continue;

        const rawData =
            typeof ix.data === "string"
                ? Buffer.from(bs58.decode(ix.data))
                : Buffer.from(ix.data);

        const accountIndexes = ix.accountKeyIndexes

        parser.parse({
            data: rawData,
            accounts: accountIndexes.map(i => keys[i]),
        });
    }
}

main();
