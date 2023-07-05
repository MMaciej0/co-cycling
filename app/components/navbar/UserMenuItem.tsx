'use client';

interface UserMenuItemProps {
  label: string;
  onClick?: () => void;
}

const UserMenuItem: React.FC<UserMenuItemProps> = ({ label, onClick }) => {
  return (
    <li
      onClick={onClick}
      className="tracking-wider px-4 py-2 border-b-[1px] last:border-0 cursor-pointer hover:bg-highlight hover:text-primary"
    >
      {label}
    </li>
  );
};

export default UserMenuItem;
