import React from 'react'
import Dashboard from './components/Dashboard'
import Auth from './pages/Auth'
import {Routes, Route, Navigate} from 'react-router'
import Home from './pages/Home'

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
  )
}

export default App

const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? (
    <Navigate to='/dashboard' />
  ) : <Navigate to='/dashboard' />

}