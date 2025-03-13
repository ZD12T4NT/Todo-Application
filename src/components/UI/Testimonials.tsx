import React from 'react'

export const Testimonials = () => {
  return (
    <>   {/* Testimonials Section (optional) */}
          <section className=" py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
              <h2 className="text-3xl font-bold mb-10">What Our Users Are Saying</h2>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="w-full sm:w-1/3 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl">
                  <p className="text-lg italic mb-4">&apos;This app has completely transformed how I organize my day!&apos;</p>
                  <p className="font-semibold">John Doe</p>
                </div>
                <div className="w-full sm:w-1/3 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl">
                  <p className="text-lg italic mb-4">&apos;Perfect for managing both personal and work tasks.&apos;</p>
                  <p className="font-semibold">Jane Smith</p>
                </div>
                <div className="w-full sm:w-1/3 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl">
                  <p className="text-lg italic mb-4">&apos;I love the reminders and task prioritization features!&apos;</p>
                  <p className="font-semibold">Sam Wilson</p>
                </div>
              </div>
            </div>
          </section></>
  )
}


