import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import LoginProcess from './components/LoginProcess';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/loginProcess' element={<LoginProcess />} />
      </Routes>
    </>
  );
}

export default App;
