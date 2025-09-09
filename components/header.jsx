import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { LayoutDashboard, PenBox } from 'lucide-react';
import { checkUser } from '../lib/checkUser';

const Header = async () => {

    await checkUser();
  return (
    <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <nav className = "container mx-auto px-4 py-4 flex items-center justify-between" >
            <Link href = "/">
                <Image
                    src={"/logo.png"} alt = "Wealth Logo"
                    width = {200} height={60} // This height and width  is for resolutuion
                    className = "h-12 w-auto object-contain " // this height and width is for image 

                />
                
            </Link>
                
        <div className="flex items-center space-x-4" > 
            <SignedIn> 
                <Link // Link to dashboard
                    href = {"/dashboard"}
                    className="text-gray-600 hover:text-blue-600 flex items-center gap-2" 
                > 
                    <Button variant = "outline"> 
                        <LayoutDashboard size ={18} />
                        <span className=" hidden md:inline">
                            Dashboard 
                        </span >
                    </Button>
                </Link>
                
                <Link href = {"/transcation/create"}> 
                    <Button  className="flex items-center gap-2"> 
                        <PenBox size ={18} />
                        <span className=" hidden md:inline ">
                            Add Transaction 
                        </span >
                    </Button>
                </Link>


            </SignedIn>
            <SignedOut>
            
             <SignInButton forceRedirectUrl="/dashboard" >  
                <Button variant = "outline">Login</Button> 
              </SignInButton>
              
              </SignedOut>
            
             <SignedIn>
              <UserButton appearance={{
                elements:{
                    avatarBox:"w-20 h-20",

                },
              }}
              
              />
            </SignedIn>
        </div>   
        </nav>
    </div>
  )
}

export default Header;

// If user -> SignedOut -> show SignInButton and SignUpButton (Wont need signup)
// But if user -> SignedIn -> show UserButton (profile, sign out etc)

// forceRedirectUrl -> after sign in where to redirect (dashboard)

// hidden md:inline -> hidden on small screen but inline on medium and larger screens
// UserButton -> from clerk (profile, sign out etc)