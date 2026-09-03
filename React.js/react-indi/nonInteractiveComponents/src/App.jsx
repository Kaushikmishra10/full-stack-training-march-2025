import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import "./Rb.css"
import { RouterProvider } from 'react-router-dom'
// import { routes } from './routes/DataModeRoutes'
import { routes } from './routes/frontroutes/RBRoutes'

function App() {

  return (
    <>
  <RouterProvider router={routes}/>
    </>
  );
}

export default App