// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// ✅ Environment-Variablen (kommen aus .env-Datei)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// ✅ Supabase-Client erstellen
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
