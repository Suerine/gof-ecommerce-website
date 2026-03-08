import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/layout/Layout";


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;