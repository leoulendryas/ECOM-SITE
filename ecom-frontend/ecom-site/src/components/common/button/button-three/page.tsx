import { ReactNode } from 'react';

interface Button3Props {
  text: ReactNode;
}

const Button3: React.FC<Button3Props> = ({ text }) => {
  return (
    <button className="border-2 border-primary text-base bg-transparent text-primary font-semibold py-1 px-4 rounded-full hover:bg-blue-500 hover:text-white transition-all">
      {text}
    </button>
  );
};

export default Button3;
