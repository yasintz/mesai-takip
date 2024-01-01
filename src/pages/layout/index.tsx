import { Outlet } from 'react-router-dom';
import { BottomTab } from 'src/components/BottomTab';

export const Layout = () => {
  return (
    <div className="page-container">
      <Outlet />
      <BottomTab />
    </div>
  );
};
