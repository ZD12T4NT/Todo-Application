import React from 'react'

export const callToAction = () => {
  return (
    <>{/* CTASection */}
    <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
    <div className="max-w-full lg:max-w-3xl xl:max-w-4xl mx-auto px-6 md:px-12 text-center py-6 md:py-12">
       <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
       Gain calmness and clarity with the world’s most beloved productivity app
       </h1>
       <p className="text-lg md:text-xl mb-6">
       374000+ ★★★★★ reviews on Google Play and App Store
       </p>
       <a
         href="/login"
         className="bg-white text-blue-600 py-3 px-6 rounded-md text-lg font-semibold shadow-md hover:bg-blue-100 transition duration-300"
       >
         Get Started
       </a>
     </div>
   </div></>
  )
}

export default
callToAction;


