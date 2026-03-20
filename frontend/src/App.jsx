import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/layout/Layout";
import WhatsAppWidget from "./components/ui/WhatsappWidget";



function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
        <WhatsAppWidget />
      </Layout>
    </BrowserRouter>
  );
}

export default App;