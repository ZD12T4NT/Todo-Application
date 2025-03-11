import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#0A122A] text-white home-clip mx-auto px-6 pb-[5rem] sm:pb-32 lg:flex lg:pb-36 lg:pl-8 pt-[11rem] lg:px-8">
        <div className="max-w-full lg:max-w-3xl xl:max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Stay on top of your tasks with ease
          </h1>
          <p className="text-lg md:text-xl mb-6">
            A smart way to organize your tasks, set reminders, and boost productivity.
          </p>
          <a
            href="/login"
            className="bg-white text-blue-600 py-3 px-6 rounded-md text-lg font-semibold shadow-md hover:bg-blue-100 transition duration-300"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
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
      </section>

      {/* Testimonials Section (optional) */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Users Are Saying</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full sm:w-1/3 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl">
              <p className="text-lg italic mb-4">"This app has completely transformed how I organize my day!"</p>
              <p className="font-semibold">John Doe</p>
            </div>
            <div className="w-full sm:w-1/3 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl">
              <p className="text-lg italic mb-4">"Perfect for managing both personal and work tasks."</p>
              <p className="font-semibold">Jane Smith</p>
            </div>
            <div className="w-full sm:w-1/3 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl">
              <p className="text-lg italic mb-4">"I love the reminders and task prioritization features!"</p>
              <p className="font-semibold">Sam Wilson</p>
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default HomePage;
