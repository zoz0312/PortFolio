import React from 'react';
import './AdminLayout.scss'
import { Link, RouteComponentProps } from 'react-router-dom';

const AdminLayout: React.FC = (
  { children }
): JSX.Element => {
  return (
    <>
      <header>
        AdminLayout
      </header>
      <nav>
        <Link to='/admin' className="flex-item">
          Home
        </Link>
        <Link to='/admin/user' className="flex-item">
          User
        </Link>
      </nav>
      <div className="container">
        { children }
      </div>
    </>
  );
}

export default AdminLayout;
