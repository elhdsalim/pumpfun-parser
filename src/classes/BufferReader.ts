export class BufferReader {
    static u64(buf: Buffer, offset: number): string {
        return buf.readBigUInt64LE(offset).toString();
    }
}