import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import S from 'subsecond';

// store subsecond object on the window for eval access
(window as any).S = S;

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<HomeScreen />} path="/" />
          <Route element={<StatsScreen />} path="/:userName/:repoName" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
