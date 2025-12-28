import { InstructionHandler, ParsedInstruction } from "../types";

export class PumpFunParser {
    private handlers: Map<string, InstructionHandler>;

    constructor(handlers: InstructionHandler[]) {
        this.handlers = new Map();
        handlers.forEach(h => this.handlers.set(h.getDiscriminator(), h));
    }

    public parse(ix: ParsedInstruction): void {
        if (ix.data.length < 24) return;

        const disc = ix.data.subarray(0, 8).toString("hex");
        this.handlers.get(disc)?.handle(ix);
    }
}
