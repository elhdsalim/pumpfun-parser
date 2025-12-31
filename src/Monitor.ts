import Client, { CommitmentLevel, SubscribeRequest, SubscribeUpdate } from "@triton-one/yellowstone-grpc";
import * as grpc from "@grpc/grpc-js";

type OnData = (data: SubscribeUpdate) => void;

export class Monitor {
    private client: Client;
    private stream: grpc.ClientWritableStream<SubscribeRequest> | null = null;

    constructor(private readonly grpcUrl: string, private readonly programId: string) {
        this.grpcUrl = grpcUrl;
        this.programId = programId;
        this.client = new Client(grpcUrl, undefined, {
            "grpc.max_receive_message_length": 1024 * 1024 * 1024,
        });
    }

    async start(onData: OnData) {
        this.stream = await this.client.subscribe();

        this.stream.on("data", onData);
        this.stream.on("error", (err) => console.error("stream error", err));
        this.stream.on("end", () => console.log("stream ended"));

        const request: SubscribeRequest = {
            commitment: CommitmentLevel.CONFIRMED,
            transactions: {
                listen: {
                    accountInclude: [this.programId],
                    accountExclude: [],
                    accountRequired: [], 
                },
            },
            accounts: {},
            blocks: {},
            blocksMeta: {},
            entry: {},
            slots: {},
            transactionsStatus: {},
            accountsDataSlice: [],
        };

        this.stream.write(request);
    }
}
