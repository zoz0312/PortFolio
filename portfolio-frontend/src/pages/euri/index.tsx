import { Route, RouteComponentProps } from "react-router-dom"
import Home from './euri.Home';
import About from './euri.About';

const EuRi: React.FC<RouteComponentProps> = (
  { match }: RouteComponentProps,
): JSX.Element => {
  return (
    <>
      <Route exact path={`${match.path}`} component={Home} />
      <Route path={`${match.path}/about`} component={About} />
    </>
  );
}

export default EuRi;
