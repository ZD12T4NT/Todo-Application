import React from 'react'

export const Footer = () => {
  return (
    <>
     {/* Footer Section */}
     <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p>&copy; 2025 Your App Name. All rights reserved.</p>
          <div className="mt-4">
            <a href="/about" className="text-blue-300 hover:text-blue-500 mx-2">
              About
            </a>
            <a href="/contact" className="text-blue-300 hover:text-blue-500 mx-2">
              Contact
            </a>
            <a href="/privacy" className="text-blue-300 hover:text-blue-500 mx-2">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}


