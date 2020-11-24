import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';
import Root from './pages';

function App({}) {
  return (
    <div className="App">
      <BrowserRouter>
        <Route render={Root} />
      </BrowserRouter>
    </div>
  );
}

export default App;
