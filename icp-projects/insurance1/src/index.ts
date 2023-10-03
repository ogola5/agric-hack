import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';

type Farmer = Record<{
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
}>

const farmerStorage = new StableBTreeMap<string, Farmer>(0, 44, 1024);

$update;
export function registerFarmer(name: string, address: string, phone: string, email: string): Result<Farmer, string> {
    const farmer: Farmer = {
        id: uuidv4(),
        name,
        address,
        phone,
        email,
    };
    farmerStorage.insert(farmer.id, farmer);
    return Result.Ok(farmer);
}

$update;
export function updateFarmer(id: string, name: string, address: string, phone: string, email: string): Result<Farmer, string> {
    return match(farmerStorage.get(id), {
        Some: (farmer) => {
            const updatedFarmer: Farmer = { ...farmer, name, address, phone, email };
            farmerStorage.insert(farmer.id, updatedFarmer);
            return Result.Ok<Farmer, string>(updatedFarmer);
        },
        None: () => Result.Err<Farmer, string>(`couldn't update a farmer with id=${id}. Farmer not found`)
    });
}

$update;
export function deleteFarmer(id: string): Result<Farmer, string> {
    return match(farmerStorage.remove(id), {
        Some: (deletedFarmer) => Result.Ok<Farmer, string>(deletedFarmer),
        None: () => Result.Err<Farmer, string>(`couldn't delete a farmer with id=${id}. Farmer not found.`)
    });
}

$query;
export function getFarmers(): Result<Vec<Farmer>, string> {
    return Result.Ok(farmerStorage.values());
}

$query;
export function getFarmer(id: string): Result<Farmer, string> {
    return match(farmerStorage.get(id), {
        Some: (farmer) => Result.Ok<Farmer, string>(farmer),
        None: () => Result.Err<Farmer, string>(`a farmer with id=${id} not found`)
    });
}

// Function to receive payment of premiums from farmers
$update;
export function receivePremiumPayment(id: string, amount: nat64): Result<Farmer, string> {
    return match(farmerStorage.get(id), {
        Some: (farmer) => {
            // Add logic here to handle premium payment from the farmer
            // You can update the farmer's record and perform necessary processing
            // For example, update the payment status or calculate the next premium due date

            // Here, we assume that the premium payment is successful
            const updatedFarmer: Farmer = { ...farmer };
            farmerStorage.insert(farmer.id, updatedFarmer);

            return Result.Ok<Farmer, string>(updatedFarmer);
        },
        None: () => Result.Err<Farmer, string>(`a farmer with id=${id} not found`)
    });
}
// Function to make a payment for a claim to a farmer
$update;
export function makeClaimPayment(farmerId: string, amount: nat64): Result<Farmer, string> {
    return match(farmerStorage.get(farmerId), {
        Some: (farmer) => {
            // Add logic here to handle the payment for the claim to the farmer
            // You can update the farmer's record and perform necessary processing
            // For example, deduct the claimed amount from the farmer's balance
            
            // Here, we assume that the payment for the claim is successful
            const updatedFarmer: Farmer = { ...farmer };
            farmerStorage.insert(farmer.id, updatedFarmer);

            return Result.Ok<Farmer, string>(updatedFarmer);
        },
        None: () => Result.Err<Farmer, string>(`a farmer with id=${farmerId} not found`)
    });
}
// Function to receive a claim from a farmer
$update;
export function receiveClaim(farmerId: string, amount: nat64): Result<Farmer, string> {
    return match(farmerStorage.get(farmerId), {
        Some: (farmer) => {
            // Add logic here to handle the registration of a claim from the farmer
            // You can update the farmer's record and perform necessary processing
            // For example, store the claim details or calculate the claim amount
            
            // Here, we assume that the claim registration is successful
            const updatedFarmer: Farmer = { ...farmer };
            farmerStorage.insert(farmer.id, updatedFarmer);

            return Result.Ok<Farmer, string>(updatedFarmer);
        },
        None: () => Result.Err<Farmer, string>(`a farmer with id=${farmerId} not found`)
    });
}

// The following part is for making the UUID package work with Azle
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    }
};
