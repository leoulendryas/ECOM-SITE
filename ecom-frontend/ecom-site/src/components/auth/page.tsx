import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button4 from '@/components/common/button/button-four/page';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const texts = [
    "Welcome to Brand, where style meets culture.",
    "Discover unique fashion tailored just for you.",
    "Join our community and stay ahead in fashion.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [texts.length]);

  const handleToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsTransitioning(false);
    }, 500); 
  };

  const backgroundPosition = isLogin ? 'left' : 'right';

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Image Section with Sliding Text */}
      <div className="w-full lg:w-1/2 bg-gray-100 relative h-64 lg:h-auto hidden lg:block">
        <Image
          src="/images/user/login-image.png"
          alt="Brand Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        {/* Sliding Text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">{texts[index]}</h2>
          <div className="flex space-x-2 mt-4">
            {texts.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${i === index ? 'bg-white' : 'bg-gray'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Auth Section */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center p-4 sm:p-8">
        <div className="text-center mb-4 lg:mb-6 space-y-2 lg:space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">LOGO</h1>
          <p className="text-black text-2xl font-medium">JOIN BRAND</p>
        </div>
        
        {/* Toggle Buttons */}
        <div className="relative flex flex-col items-center mb-8">
          <div className="relative flex bg-lightGray rounded-full justify-center py-1 px-1 max-w-96">
            <div
              className={`absolute inset-0 bg-white rounded-full transition-all duration-500 ease-in-out transform ${
                backgroundPosition === 'left' ? 'translate-x-1' : 'translate-x-full'
              }`}
              style={{ width: '49%', marginTop: '4px', marginBottom: '4px' }}
            ></div>
            <button
              className={`relative z-10 flex-2 text-center sm:px-8 sm:py-2 px-4 py-1 rounded-rull transition-colors duration-500 ${
                isLogin ? 'text-black' : 'text-gray'
              }`}
              onClick={handleToggle}
            >
              LOG IN
            </button>
            <button
              className={`relative z-10 flex-2 text-center sm:px-8 sm:py-2 px-4 py-1 rounded-full transition-colors duration-500 ${
                !isLogin ? 'text-black' : 'text-gray'
              }`}
              onClick={handleToggle}
            >
              SIGN UP
            </button>
          </div>
        </div>

        {/* Form */}
        <div
          className={`transition-all duration-500 ease-in-out transform ${
            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          } w-full max-w-xs sm:max-w-sm lg:max-w-md`}
        >
          {isLogin ? (
            <form className="w-full">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-2 sm:p-3 bg-lightGray text-gray rounded-xl mb-4 sm:mb-6 text-sm sm:text-lg focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 sm:p-3 bg-lightGray rounded-xl mb-2 sm:mb-2 text-sm sm:text-lg focus:outline-none"
              />
              <div className="text-left text-primary text-sm mb-3 sm:mb-4">
                <a href="#">Forgot your password?</a>
              </div>
              <div className="w-full py-2 sm:py-3">
                <Button4 text="LOG IN" />
              </div>
            </form>
          ) : (
            <form className="w-full">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-2 sm:p-3 bg-lightGray rounded-xl mb-4 sm:mb-6 text-sm sm:text-lg focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-2 sm:p-3 bg-lightGray rounded-xl mb-4 sm:mb-6 text-sm sm:text-lg focus:outline-none"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-2 sm:p-3 bg-lightGray rounded-xl mb-4 sm:mb-6 text-sm sm:text-lg focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-2 sm:p-3 bg-lightGray rounded-xl mb-4 sm:mb-6 text-sm sm:text-lg focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 sm:p-3 bg-lightGray rounded-xl mb46 sm:mb-6 text-sm sm:text-lg focus:outline-none"
              />
              <div className="flex items- space-x-2 mb-3 sm:mb-4">
                <input type="checkbox" id="signup-checkbox" className="h-4 w-4 sm:h-5 sm:w-5 text-gray" />
                <label htmlFor="signup-checkbox" className="text-xs sm:text-sm text-gray">
                  Tick here to receive emails about our product, exclusive content, and more. View our <a href="#" className="text-darkGray">privacy policy</a>.
                </label>
              </div>
              <button className="w-full py-2 sm:py-3">
                <Button4 text="SIGN UP" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
