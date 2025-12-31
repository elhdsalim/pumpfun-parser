import { BufferReader } from "../../classes/BufferReader";
import { DISCRIMINATORS } from "../../constants";
import { InstructionHandler, ParsedInstruction } from "../../types";

export class BuyHandler implements InstructionHandler {
    private readonly discriminator: string;

    constructor() {
        this.discriminator = DISCRIMINATORS.BUY;
    }

    public getDiscriminator(): string {
        return this.discriminator;
    }

    public handle(ix: ParsedInstruction): void {
        console.log("BUY", {
            amount: BufferReader.u64(ix.data, 8),
            maxSol: BufferReader.u64(ix.data, 16),
            user: ix.accounts[6],
            mint: ix.accounts[2],
        });
    }
}
