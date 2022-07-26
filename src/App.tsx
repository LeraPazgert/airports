import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import { useAppDispatch } from './hooks/redux';
import AirportDetailsPage from './pages/AirportDetailsPage';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import { fetchHandbooks } from './store/actions/handbookActions';


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHandbooks())
  }, [dispatch]);
  
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/auth' element={<AuthPage />}></Route>
        <Route path='/airport/:id' element={<AirportDetailsPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
