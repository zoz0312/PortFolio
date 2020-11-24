import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from '@pages/Home';
import Main from '@pages/Main';
import AJu from '@pages/aju/index';
import EuRi from '@pages/euri/index';

const Root: React.FC = () => (
  // TODO 루트 라우터를 반환한다
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/aju" component={AJu} />
      <Route path="/euri" component={EuRi} />
      <Route path="/home" exact component={Home} />
      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default Root;