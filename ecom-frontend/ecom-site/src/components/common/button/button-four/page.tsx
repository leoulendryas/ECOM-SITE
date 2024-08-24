import { ReactNode } from 'react';

interface Button4Props {
  text: ReactNode;
}

const Button4: React.FC<Button4Props> = ({ text }) => {
  return (
    <button className="w-full bg-white text-base border rounded-lg border-black text-darkGray font-semibold py-2 px-6 hover:bg-gray-200">
      {text}
    </button>
  );
};

export default Button4;
