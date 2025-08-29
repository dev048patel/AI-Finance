// rapper for signed in and signed out

import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      {children} 
    </div>
  )
}

export default AuthLayout

// Here children will have the sign in and sign up pages ( CLERK PROVIDES THEM )
