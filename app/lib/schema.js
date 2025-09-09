// This file contains Zod schemas for validating data structures in the application.
// Schemas can be used for form validation, API request/response validation, and more.



import {z} from 'zod';

export const accountSchema = z.object({
    
    // name = minimum 1 character, if not show "Name is required"
    name: z.string().min(1, "Name is required"),
    // type = can only be "CURRENT" or "SAVING"
    type: z.enum(["CURRENT", "SAVING"]),
    // balance = minimum 1 character, if not show "Initial balance is required"
    balance: z.string().min(1, "Initial balance is required"),
    // isDefault = boolean, default value is false
    isDefault: z.boolean().default(false),
}) ;