// IMP Note: {children} means which ever page / component is currently rendering inside.


import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";


const inter = Inter ({ subsets: ["latin"] });

export const metadata = {
  title: "Personal Finance",
  description: "Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    // Wrapping the entire app with ClerkProvider to enable authentication
    <ClerkProvider> 
    <html lang="en">
      <body className={`${inter.className}`}>
          {/* header */}
          <Header/>
       
       <main className = "min-h-screen"> {children} </main> 
       
        
        <footer className="bg-blue-50 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>Made by Dev Patel</p>
          </div>
        </footer>
      
      
      </body>
    </html>
    </ClerkProvider>
  );
}

