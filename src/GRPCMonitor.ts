import Client, {CommitmentLevel, SubscribeRequest} from '@triton-one/yellowstone-grpc'
import * as grpc from '@grpc/grpc-js'

/**
 * Monitor that listen every transactions on a specifiec account
 */
export class Monitor {
    private client: Client
    private stream: grpc.ClientWritableStream<SubscribeRequest> | null = null

    /**
     * Create a new monitor
     * @param grpcUrl - the GRPC URL
     * @param targetAddress - Account we want to listen
     */
    constructor(private readonly grpcUrl: string,private readonly targetAddress: string) {
        this.client = new Client(grpcUrl, undefined, {
            'grpc.max_receive_message_length': 1024 * 1024 * 1024,
        })
    }

    async start() {
        this.stream = await this.client.subscribe()

        this.stream.on('data', (data) => {
            console.log(data)
        })

        this.stream.on('error', (err) => {
            console.error('stream error', err)
        })

        this.stream.on('end', () => {
            console.log('stream ended')
        })

        const request: SubscribeRequest = {
            commitment: CommitmentLevel.CONFIRMED,
            transactions: {
                listen: {
                    accountInclude: [this.targetAddress],
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
        }

        this.stream.write(request)
    }
}
