// src/components/Header.jsx
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Mindloft</Link>
        <nav className="nav">
          <Link to="/">Start</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Registrieren</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
