import React from 'react'

export const Features = () => {
  return (
    <> {/* Features Section */}
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl font-bold mb-10">Why use our app?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-3">Simple Task Management</h3>
            <p className="text-gray-700">
              Quickly add, organize, and manage your tasks in a clean and intuitive interface.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-3">Set Reminders</h3>
            <p className="text-gray-700">
              Never forget a task with our easy-to-set reminders that keep you on track.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-3">Collaborate with Others</h3>
            <p className="text-gray-700">
              Share tasks, collaborate with teammates, and boost your productivity together.
            </p>
          </div>
        </div>
      </div>
    </section></>
  )
}



