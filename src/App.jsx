import React from 'react'
import MainRouter from './configs/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
      <MainRouter />
      <ToastContainer position="top-center"/>
    </>
  );
}

export default App