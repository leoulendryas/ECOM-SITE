import { ReactNode } from 'react';

interface Button5Props {
  text: ReactNode;
}

const Button5: React.FC<Button5Props> = ({ text }) => {
  return (
    <button className="border border-3 border-black bg-white text-base text-darkGray font-semibold py-1 px-6 rounded-full hover:bg-gray-200">
      {text}
    </button>
  );
};

export default Button5;
