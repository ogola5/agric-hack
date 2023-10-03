import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64 } from 'azle';
import { v4 as uuidv4 } from 'uuid';

type Farmer = Record<{
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    premiumPaymentAmount: nat64;
}>;

const farmerStorage = new StableBTreeMap<string, Farmer>(0, 44, 1024);

$update;
export function createFarmer(name: string, address: string, phone: string, email: string, premiumPaymentAmount: nat64): Result<Farmer, string> {
    const farmer: Farmer = {
        id: uuidv4(),
        name,
        address,
        phone,
        email,
        premiumPaymentAmount,
    };
    farmerStorage.insert(farmer.id, farmer);
    return Result.Ok(farmer);
}

$query;
export function getFarmers(): Result<Vec<Farmer>, string> {
    return Result.Ok(farmerStorage.values());
}

$query;
export function getFarmer(id: string): Result<Farmer, string> {
    return match(farmerStorage.get(id), {
        Some: (farmer) => Result.Ok<Farmer, string>(farmer),
        None: () => Result.Err<Farmer, string>(`a farmer with id=${id} not found`),
    });
}

$update;
export function updateFarmer(id: string, name: string, address: string, phone: string, email: string): Result<Farmer, string> {
    return match(farmerStorage.get(id), {
        Some: (farmer) => {
            farmer.name = name;
            farmer.address = address;
            farmer.phone = phone;
            farmer.email = email;
            farmerStorage.insert(farmer.id, farmer);
            return Result.Ok<Farmer, string>(farmer);
        },
        None: () => Result.Err<Farmer, string>(`couldn't update a farmer with id=${id}. farmer not found`),
    });
}

$update;
export function deleteFarmer(id: string): Result<Farmer, string> {
    return match(farmerStorage.remove(id), {
        Some: (deletedFarmer) => Result.Ok<Farmer, string>(deletedFarmer),
        None: () => Result.Err<Farmer, string>(`couldn't delete a farmer with id=${id}. farmer not found.`),
    });
}

$update;
export function payPremium(id: string, paymentAmount: nat64): Result<Farmer, string> {
    return match(farmerStorage.get(id), {
        Some: (farmer) => {
            farmer.premiumPaymentAmount = paymentAmount;
            farmerStorage.insert(farmer.id, farmer);
            return Result.Ok<Farmer, string>(farmer);
        },
        None: () => Result.Err<Farmer, string>(`A farmer with id=${id} not found`),
    });
}

$update;
export function deliverGoods(id: string): Result<Farmer, string> {
    return match(farmerStorage.get(id), {
        Some: (farmer) => {
            // Logic for delivering goods to the consumer
            // This can include updating the status of the delivery
            // and interacting with the escrow contract to accept payment
            // once the goods are accepted by the consumer.
            // You can implement this logic as per your requirements.
            return Result.Ok<Farmer, string>(farmer);
        },
        None: () => Result.Err<Farmer, string>(`A farmer with id=${id} not found`),
    });
}

// Export the Farmer type for use in other parts of your code
export { Farmer };
