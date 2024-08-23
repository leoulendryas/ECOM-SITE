import { ReactNode } from 'react';

interface Button1Props {
  children: ReactNode;
}

const Button1: React.FC<Button1Props> = ({ children }) => {
  return (
    <button className="bg-transparent text-base text-darkGray font-semibold py-1 px-4 rounded-full border-2 border-darkGray hover:bg-gray-200">
      {children}
    </button>
  );
};

export default Button1;
