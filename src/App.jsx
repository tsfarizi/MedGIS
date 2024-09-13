import { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard isAuthenticated={isAuthenticated} onAuthenticate={handleAuthentication} />}
        />
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
