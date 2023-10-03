import { $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';

type Escrow = Record<{
    id: string;
    orderId: string;
    consumerId: string;
    farmerId: string;
    amount: nat64;
    isDelivered: boolean;
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>

const escrowStorage = new StableBTreeMap<string, Escrow>(0, 44, 1024);

$update;
export function createEscrow(orderId: string, consumerId: string, farmerId: string, amount: nat64): Result<Escrow, string> {
    const escrow: Escrow = {
        id: uuidv4(),
        orderId,
        consumerId,
        farmerId,
        amount,
        isDelivered: false,
        createdAt: ic.time(),
        updatedAt: Opt.None,
    };
    escrowStorage.insert(escrow.id, escrow);
    return Result.Ok(escrow);
}

