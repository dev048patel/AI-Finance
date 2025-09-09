// Create Accont -> Backend Logic

// This file contains the server side action functions for the dashboard page


// data - contains : name, type, balance, isDefault - model Account


"use server";
import {auth} from "@clerk/nextjs/server"
import {db} from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { th } from "date-fns/locale";

// Function to serialize the transaction object 
const serializedTransaction = (obj) =>{
    const serialized = {...obj}; // copy the object

    if(obj.balance){
        serialized.balance = obj.balance.toNumber(); // convert Prisma Decimal -> JS number
    }
}

export async function createAccount(data){
    try{
        const {userId} = await auth();
        // If user does not exist, throw an error
        if(!userId) throw new Error("Unathorized");
        
        // Check in the database if userId exists
        const user = await db.user.findUnique({
            where: {clerkUserId: userId}
        });

        // If user does not exist - in database, throw an error
        if(!user){
           throw new Error("User does not exist");
        }

        // Conver balance to float before saving
        const balance = parseFloat(data.balance);
        // Nan - Not a number
        if(isNaN(balanceFloat)){
            throw new Error("Invalid Balance Amount");
        }

        // If user is creating a first account then - isDefault 

        const existingAccounts = await db.account.findMany({
            where: {userId: user.id}
        });

        const shouldBeDefault = 
            existingAccounts.length === 0? true:data.isDefault;

        // If user is creating an account I want other accounts to be not default accounts
        if(shouldBeDefault){
            await db.account.updateMany({
                where: {userId: user.id, isDefault: true}, // this will check all the accounts of user which are default
                data: {isDefault: false} // now make them not default(false)

            });
        }

        // Create a new Account
        const account = await db.account.create({
            data:{
                ...data,
                balance: balanceFloat,
                userId: user.id,
                isDefault: shouldBeDefault,
            },
        });

        // IMP - NEXT.js server - does not support decimal type - so we have to convert it to number
        const serializedAccount =  serializedTransaction(account);
        revalidatePath("/dashboard"); // this will revalidate the dashboard path and fetch the new data from the server 
        return {success: true, data: serializedAccount};

    }catch(error){
        throw new Error(error.message);
    }
}