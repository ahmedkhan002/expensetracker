import React from 'react'
import Dashboard from './components/Dashboard'
import Auth from './pages/Auth'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import toast, { Toaster } from 'react-hot-toast';
import Root from './Routes/Root'
import ProtectedRoute from './Routes/ProtectedRoute'
import AuthRoute from './Routes/AuthRoute'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/auth" element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        } />
        <Route path="*" element={<Root />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App