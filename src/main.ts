import { Monitor } from "./GRPCMonitor"
import 'dotenv/config';

const TARGET_ADDRESS = '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P' // PUMPFUN addres

const listener = new Monitor(process.env.GRPC_URL!, TARGET_ADDRESS)
listener.start()
