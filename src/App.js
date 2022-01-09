import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';

const Rotas = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact={true} element={<Home />}></Route>
        <Route path="/details/:id" exact={true} element={<Details />}></Route>
      </Routes>
    </Router>
  );
};

export default Rotas;
