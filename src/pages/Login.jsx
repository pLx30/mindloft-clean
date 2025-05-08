// src/pages/Login.jsx

import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else navigate('/dashboard')
  }

  return (
    <form onSubmit={handleLogin} style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <input placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} /><br />
      <input placeholder="Passwort" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
