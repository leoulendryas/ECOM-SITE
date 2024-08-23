import { ReactNode } from 'react';

interface Button2Props {
  children: ReactNode;
}

const Button2: React.FC<Button2Props> = ({ children }) => {
  return (
    <button className="bg-transparent text-base text-darkGray font-semibold py-1 px-6 rounded-md border-2 border-darkGray hover:bg-gray-200">
      {children}
    </button>
  );
};

export default Button2;
