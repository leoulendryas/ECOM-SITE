import { ReactNode } from 'react';

interface Button2Props {
  text: ReactNode;
}

const Button2: React.FC<Button2Props> = ({ text }) => {
  return (
    <button className="bg-transparent text-base text-darkGray font-semibold py-1 px-6 rounded-md border-2 border-darkGray hover:bg-gray-200">
      {text}
    </button>
  );
};

export default Button2;
