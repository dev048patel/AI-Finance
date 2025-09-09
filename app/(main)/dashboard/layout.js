// npm i react-spinners
// This will install the react-spinners package which provides a collection of loading spinners for React applications.

// Dashboard layout component with Suspense for lazy loading
// Suspense means that the component will wait for the DashboardPage to load before rendering it and show a fallback UI in the meantime

import React, { Suspense } from 'react'
import DashboardPage from './page'
import {BarLoader} from "react-spinners"

const DashboardLayout = () => {
  return (
    <div className="px-5">
      <h1 className="text-6xl font-bold gradient-title mb-5">Dashboard</h1>

      {/* Dashboard Page */}

    {/* Using Suspense */}
      <Suspense 
        fallback={<BarLoader className="mt-4" width={100} color="#9333ea" />}
      > 
         <DashboardPage/>
      </Suspense>
    </div>
  )
}

export default DashboardLayout
