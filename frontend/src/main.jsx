// 1. Core React Imports
import React from 'react'
import ReactDOM from 'react-dom/client'

// 2. Component and Style Imports
import App from './App.jsx'
import './index.css' // We import the CSS once here to apply globally

// 3. Render the root Application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)