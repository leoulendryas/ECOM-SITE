import { ReactNode } from 'react';

interface Button1Props {
  text: ReactNode;
}

const Button1: React.FC<Button1Props> = ({ text }) => {
  return (
    <button className="bg-white text-base text-darkGray font-semibold py-1 px-6 rounded-full hover:bg-black hover:text-white">
      {text}
    </button>
  );
};

export default Button1;
