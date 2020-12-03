import * as React from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import Main from '@pages/Main';
import AJu from '@pages/aju/index';
import EuRi from '@pages/euri/index';
import Admin from '@pages/admin/index';
import MainAnimation from '@components/animations/main.animation';

const Root: React.FC<RouteProps> = (
  { location }
): JSX.Element => {
  // console.log('location', location)
  // TODO : Pagenation
  return (
    <>
      <MainAnimation location={location}>
        <Switch location={location}>
          <Route exact path="/" component={Main} />
          <Route path="/aju" component={AJu} />
          <Route path="/euri" component={EuRi} />
          <Route path="/admin" component={Admin} />
          <Redirect path="*" to="/" />
        </Switch>
      </MainAnimation>
    </>
  )
};

export default Root;