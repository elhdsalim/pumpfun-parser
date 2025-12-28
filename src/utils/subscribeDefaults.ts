import { CommitmentLevel, SubscribeRequest } from '@triton-one/yellowstone-grpc'

export const BASE_SUBSCRIBE_REQUEST: Omit<SubscribeRequest, 'transactions'> = { // SubscribeRequest type without 'transactions'
    commitment: CommitmentLevel.CONFIRMED, // FINALIZED would not be useful
    accounts: {},
    blocks: {},
    blocksMeta: {},
    entry: {},
    slots: {},
    transactionsStatus: {},
    accountsDataSlice: [],
}
