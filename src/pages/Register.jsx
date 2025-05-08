// src/pages/Register.jsx

import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) alert(error.message)
    else navigate('/dashboard')
  }

  return (
    <form onSubmit={handleRegister} style={{ padding: "2rem" }}>
      <h2>Registrieren</h2>
      <input placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} /><br />
      <input placeholder="Passwort" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
      <button type="submit">Registrieren</button>
    </form>
  )
}

export default Register
