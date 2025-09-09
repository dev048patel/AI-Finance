// Drawer -> Component that controls the sliding panel
// DrawerTrigger -> clickable element which opens the drawer 
// DrawerContent -> the content inside the drawer 
// Connecting zod with react-hook-form using zodResolver
// useFormState -> to manage form state and validation
// register -> to register input fields with react-hook-form

"use client";

import React, {useState} from 'react'
import {Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose} from "./ui/drawer"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {accountSchema} from "@/app/lib/schema"
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Switch } from './ui/switch'
import { Button } from './ui/button'

const CreateAccountDrawer = ({children}) => {
    // UseState - will help to open and close the drawer
    // open - is the state variable to track whether the drawer is open or closed
    // setOpen - is the function to update the open state
    const [open, setOpen] = useState(false);   
    
   const {
          register, handleSubmit, formState:{errors}, setValue, watch, reset, 
         } =  useForm({
      resolver: zodResolver(accountSchema),
      defaultValue: {
        name: "",
        balance: "",
        type: "CURRENT",
        isDefault: false,
      },
    });

    // Function to handle form submission
    const onSubmit = async(data) => {
      console.log(data)
    }

  return (
    // tell drawer whether it is open and then will update the state when it changes
    <Drawer open = {open} onOpenChange={setOpen}>
    
      <DrawerTrigger asChild>{children}</DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Create New Account</DrawerTitle>     
      </DrawerHeader>
    <div className = "px-4 pb-4">
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)} >

      {/* Drawer -> NAME */}
      <div className='space-y-2'>

        <label htmlFor="name" className='text-sm font-medium'>
           Account Name
        </label>
        
        {/* Connect Input to react hook form */}
        <Input 
            id='name' placeholder="eg., Main Checking"
            {...register("name")}
        />
        {/* If there is any error in name -> display error */}
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Drawer ->  */}
      <div className='space-y-2'>

        <label htmlFor="type" className='text-sm font-medium'>
           Account Type
        </label>
        <Select 
          onValueChange={(value)=>setValue("type", value)}
          defaultValue={watch("type")}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CURRENT">Current</SelectItem>
            <SelectItem value="SAVINGS">Savings</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-sm text-red-500">{errors.type.message}</p>
        )}
      </div>

      {/* Drawer -> Balance */}
      <div className='space-y-2'>

        <label htmlFor="balance" className='text-sm font-medium'>
           Initial Balance
        </label>
        
        <Input 
            id="balance" type="number" step="0.01" placeholder="0.00"
            {...register("balance")}
        />
        {errors.balance && (
          <p className="text-sm text-red-500">{errors.balance.message}</p>
        )}
      </div>
      
      {/* Drawer -> Default */}
      <div className="flex items-center justify-between rounded-lg border p-3">
        <div className='space-y-0.5 '>
          <label 
            htmlFor="isDefault"
            className='text-sm font-medium cursor-pointer'
          >
            Set as Default 
          </label>

          <p className="text-sm text-muted-foreground">
            This account will be selected by default for transactions
          </p>
        </div>
          <Switch 
            id="isDefault"
            onCheckedChange={(checked)=>setValue("isDefault", checked)}
            checked={watch("isDefault")}
          />       
      </div>

        {/* Drawer -> Button */}
        <div className="flex gap-4 pt-4">
            <DrawerClose asChild>
              <Button type="button" variant="outline" className = "flex-1">
                Cancel
              </Button>

            </DrawerClose>
            <Button type="submit" className="flex-1" >
              Create Account
            </Button>
        </div>

    </form>
    </div>  
    </DrawerContent>
</Drawer>
  )
}

export default CreateAccountDrawer;
