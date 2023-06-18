import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { useSelector } from 'react-redux';
import Store from './pages/Store';
import DetailStore from './pages/Store/detail';

function App() {
  const username = useSelector((state) => state.username);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ username ? (<Home />) : (<Navigate to="/signin" />)}/>
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/stores" element={username ? (<Store />) : (<Navigate to="/signin" />)} />
        <Route path="/store" element={username ? (<DetailStore />) : (<Navigate to="/signin" />)} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
