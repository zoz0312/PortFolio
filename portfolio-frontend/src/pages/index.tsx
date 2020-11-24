import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Main from './Main';
import AJu from './aju/index';

const Root: React.FC = () => (
  // TODO 루트 라우터를 반환한다
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/aju" component={AJu} />
      <Route path="/home" exact component={Home} />
      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default Root;