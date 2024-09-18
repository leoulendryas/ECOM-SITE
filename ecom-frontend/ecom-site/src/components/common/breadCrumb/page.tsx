import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-gray-700 mx-20 pt-12 pb-6" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <FaChevronRight className="mx-2 text-gray-400" />}
          {item.href ? (
            <Link href={item.href}>
              <div className="text-black font-bold text-xl hover:underline">{item.label}</div>
            </Link>
          ) : (
            <span className="font-bold text-lg text-gray">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
