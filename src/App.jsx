import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';

function App() {
  const token = localStorage.getItem('authToken');

  return (
    <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
          <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
        </Routes>
    </Router>
  );
}

export default App;
