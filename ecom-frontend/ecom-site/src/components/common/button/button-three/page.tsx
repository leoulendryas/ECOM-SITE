import { ReactNode } from 'react';

interface Button3Props {
  children: ReactNode;
}

const Button3: React.FC<Button3Props> = ({ children }) => {
  return (
    <button className="border-2 border-primary text-base bg-transparent text-primary font-semibold py-1 px-4 rounded-full hover:bg-blue-500 hover:text-white transition-all">
      {children}
    </button>
  );
};

export default Button3;
