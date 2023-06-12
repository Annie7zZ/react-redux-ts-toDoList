import React from 'react';
import baseRouter from './router'
import {useRoutes} from 'react-router-dom'
function App() {
  const routers = useRoutes(baseRouter)
  return (
    <div className="App">
      {routers}
    </div>
  );
}

export default App;
