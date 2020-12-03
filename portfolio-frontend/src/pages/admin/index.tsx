import AdminLayout from '@components/layout/AdminLayout';
import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import AdminHome from './admin.Home';
import AdminUser from './admin.User';

const Admin: React.FC<RouteComponentProps> = (
  { match }: RouteComponentProps,
): JSX.Element => {
  return (
    <AdminLayout>
      <Route exact path={`${match.path}`} component={AdminHome} />
      <Route exact path={`${match.path}/user`} component={AdminUser} />
    </AdminLayout>
  );
}

export default Admin;
