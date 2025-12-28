export type ParsedInstruction = {
    data: Buffer;
    accounts: string[];
};

export interface InstructionHandler {
    getDiscriminator(): string;
    handle(ix: ParsedInstruction): void;
}
