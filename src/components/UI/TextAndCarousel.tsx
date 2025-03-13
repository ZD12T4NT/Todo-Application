export const TextAndCarousel = () => {
    return (
      <div className="flex flex-col items-center p-8  rounded-lg relative">
        <div className="container flex flex-col md:flex-row items-center justify-between">
          {/* Left Text Block */}
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Trusted by Leading Brands</h2>
            <p className="text-gray-600 mb-4">
              We work with some of the most reputable companies in the industry. Join them today!
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all">
              Get Started
            </button>
          </div>
  
          {/* Right Scrolling Marquee */}
          <div className="md:w-1/2 overflow-hidden relative">
            <div className="marquee w-full overflow-hidden whitespace-nowrap relative">
              <div className="marquee-inner flex w-max animate-scroll">
                {[...Array(1)].map((_, i) => (
                  <span key={i} className="flex items-center gap-10">
                    {[
                      "https://images.pexels.com/photos/27372369/pexels-photo-27372369/free-photo-of-a-person-holding-a-butterfly-on-their-finger.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                      "https://images.pexels.com/photos/15275556/pexels-photo-15275556/free-photo-of-a-cat-near-a-fish-pond.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                      "https://images.pexels.com/photos/31116666/pexels-photo-31116666/free-photo-of-vibrant-yellow-sunflowers-in-urban-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                      "https://images.pexels.com/photos/27372369/pexels-photo-27372369/free-photo-of-a-person-holding-a-butterfly-on-their-finger.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                      "https://images.pexels.com/photos/15275556/pexels-photo-15275556/free-photo-of-a-cat-near-a-fish-pond.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                      "https://images.pexels.com/photos/31116666/pexels-photo-31116666/free-photo-of-vibrant-yellow-sunflowers-in-urban-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    ].map((src, index) => (
                      <div key={index + i * 10} className="flex items-center justify-center w-[20rem]">
                        <img src={src} alt={`Logo ${index + 1}`} className="h-[15rem] w-full object-cover" />
                      </div>
                    ))}
                  </span>
                ))}
              </div>
            </div>
  
            {/* Fade effect for left and right sides */}
            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-10">
              <div className="gradient-fade-left absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-[#fefdfc] to-transparent"></div>
              <div className="gradient-fade-right absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-[#fefdfc] to-transparent"></div>
            </div>
          </div>
        </div>
  
        {/* Styles */}
        <style>
          {`
            @keyframes scroll {
              from {
                transform: translateX(0%);
              }
              to {
                transform: translateX(-50%);
              }
            }
            .animate-scroll {
              animation: scroll 20s linear infinite;
            }
          `}
        </style>
      </div>
    );
  };
  