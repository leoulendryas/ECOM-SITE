import React from 'react';
import ButtonOne from '@/components/common/button/button-one/page';

const HeroSection: React.FC = () => {
  return (
    <div 
      className="relative w-full h-[590px] lg:h-[590px] flex items-end pb-5 md:pb-0 md:items-center justify-left overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('/images/user/hero-image.png')` }} 
    >
      <div className="relative text-white text-left px-4 md:px-20 space-y-4 md:space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold">Text Text</h1>
        <p className="text-lg md:text-xl max-w-3xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh.
        </p>

        <div className="flex flex-col items-center space-y-2 md:flex-row md:justify-left md:space-x-4 md:space-y-0">
          <ButtonOne text="New & Featured" />
          <ButtonOne text="Create Your Own" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
