/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import { Route, Router, useNavigate } from '@solidjs/router';
import App from './App';
import { Home } from './components/Home';
import { Read } from './components/Read';
import { Stats } from './components/Stats';

const Redirect = () => {
  const navigate = useNavigate();
  navigate("/");
  return <></>;
}

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/read/:id" component={Read} matchFilters={{id: /^\d+$/}} />
      <Route path ="/stats" component={Stats} />
      <Route path="*" component={Redirect} />
    </Router>
  ), 
  document.getElementById("root")!
);
