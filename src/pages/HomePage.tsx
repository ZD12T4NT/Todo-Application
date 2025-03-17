import React from 'react';
import dashImage from '../../src/dashImage.png'
import CTA from '../components/UI/callToAction'
import { Testimonials } from '../components/UI/Testimonials';
import { Footer } from '../components/UI/Footer';
import { Features } from '../components/UI/Features';
import { TextAndCarousel } from '../components/UI/TextAndCarousel';
import { HeroVideoDialog } from '../components/UI/HeroVideoDialog'; // Import the HeroVideoDialog component

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#001514] text-white home-clip mx-auto px-6 pb-[5rem] sm:pb-32 lg:flex lg:pb-36 lg:pl-8 pt-[11rem] lg:px-8">
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

      <Features />

       {/* Dashboard Section */}
    

<section>
  <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
    <div className="dashboardImage shadow-lg my-7 rounded-3xl">
      <HeroVideoDialog
        videoSrc="https://www.youtube.com/embed/X9-PxHfCwVM?si=ZNGxs7kbanz1z30Y"  // Replace with the actual video URL
        thumbnailSrc={dashImage}  // You can use your `dashImage` here for the thumbnail
        thumbnailAlt="Video Thumbnail"  // You can also update the alt text
        className="rounded-3xl"  // You can add custom styles here if needed
      />
    </div>
  </div>
</section>


      <Testimonials />

      <TextAndCarousel />

      <CTA/>

     <Footer />
    </div>
  );
};

export default HomePage;
