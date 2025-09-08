"use client"
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const HeroSection = () => {

    const imageRef = useRef(); // Access the DOM element directly

    // Adding scroll event to the image
    useEffect(() => { 
        const imageElement = imageRef.current ;

        // Will take 2 things - current scroll position and how much scroll we want to apply to the image
        const handleScroll = () => {
            const scrollPosition = window.scrollY ; // Vertical scroll position
            const scrollThreshold = 100; // When it is 100 px from the top we will apply full scroll to the image
            if(scrollPosition > scrollThreshold){
                imageElement.classList.add("scrolled");
            }else{
                imageElement.classList.remove("scrolled");
            }
        }
        
        window.addEventListener("scroll", handleScroll);

        return() => window.removeEventListener("scroll", handleScroll);
    }, []);




  return (
    <div className="pb-20 px-4">
        <div className="container mx-auto text-center ">
            
            <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
                Manage Your Finance <br /> with Intelligence
            </h1>
            <p className = "text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                AI powered personal finance app that helps you budget, track expenses, and achieve your financial goals with ease.
            </p>
            <div className="flex justify-center space-x-4">
                <Link href="/dashboard">
                    <Button size="lg" className = "px-8">
                        Get Started
                    </Button>    
                </Link>
                <Link href="https://github.com/dev048patel">
                    <Button size="lg" variant = "outline "className = "px-8">
                        My Github
                    </Button>    
                </Link>
            </div>

            <div className="hero-image-wrapper " >
                <div ref = {imageRef} className="hero-image">
                    <Image
                        src = "/banner.jpeg"
                        width = {1280}
                        height = {720}
                        alt = "Dashboard Preview"
                        className="rounded-lg shadow-2xl border mx-auto "
                        priority
                    />
                </div>

            </div>
            
        </div>
    </div>
  )
}

export default HeroSection


// And this are more like client side components "use client"\
// This has the text, image of banner.jpeg and the button of get started and my github


// Now will add scroll events which is hapenning when we are moving downwards and upwards - image
// 