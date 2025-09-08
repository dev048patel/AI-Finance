// When user logs in -> we want it to show in our database

import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async() => {
   const user = await currentUser();    
    
   // check if the user does not exists 
   if(!user){
    return null;
   }

   // if user exists, check if the user is already in our database 
   try{
    const loggedInUser = await db.user.findUnique({
        where: {
            clerkUserId: user.id,
        },
    });

    // If the user is found in the database, return the user object
    if(loggedInUser){
        return loggedInUser;
    }

    // If the user is not found, create a new user in the database
    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await db.user.create({
        data:{
            clerkUserId: user.id,
            name,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
        },
    }); 

    return newUser;

   }catch(error){
    console.log(error.message);
   }

};
