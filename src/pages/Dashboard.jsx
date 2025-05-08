// src/pages/Dashboard.js

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('');
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        navigate('/login');
        return;
      }

      setUserEmail(user.email);

      const { data: userGoals } = await supabase
        .from('user_goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setGoals(userGoals || []);
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-zinc-700 pb-4">
        <h1 className="text-3xl font-bold text-mindloft">Mindloft Dashboard</h1>
        <button
          onClick={handleLogout}
          className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
        <button
        onClick={() => navigate('/ziel')}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded mt-4 md:mt-0 md:ml-4"
        >
        Ziel setzen
        </button>

      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4">Willkommen, <span className="text-mindloft">{userEmail}</span>!</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Ziel-Box */}
          <div className="bg-zinc-900 rounded-xl shadow-md p-5">
            <h3 className="text-lg font-bold mb-2">Aktuelles Ziel</h3>
            {goals.length > 0 ? (
              <p className="text-zinc-200">{goals[0].goal}</p>
            ) : (
              <p className="text-zinc-400">Noch kein Ziel gesetzt.</p>
            )}
          </div>

          {/* Chat-Box */}
          <div className="bg-zinc-900 rounded-xl shadow-md p-5">
            <h3 className="text-lg font-bold mb-2">Letzter Chat</h3>
            <p className="text-zinc-400">Noch kein Chat gestartet.</p>
          </div>

          {/* ToDo-Box */}
          <div className="bg-zinc-900 rounded-xl shadow-md p-5">
            <h3 className="text-lg font-bold mb-2">Nächste Schritte</h3>
            <ul className="list-disc list-inside text-zinc-300">
              <li>Ziel präzisieren</li>
              <li>Ersten Chat starten</li>
              <li>Feedback erhalten</li>
            </ul>
          </div>
          <button
            onClick={() => navigate('/chat')}
            className="mt-4 bg-white text-black font-semibold px-6 py-2 rounded hover:bg-zinc-200"
            >
            Chat starten
          </button>

        </div>
      </section>
    </div>
  );
}
