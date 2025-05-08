// src/pages/ChatPage.jsx
import { useEffect, useState } from 'react';
import { useSession } from '../lib/sessionContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function ChatPage() {
  const { session } = useSession();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    const fetchGoal = async () => {
      const { data, error } = await supabase
        .from('user_goals')
        .select('goal_id')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data && data.goal_id) setGoal(data.goal_id);
    };

    fetchGoal();
  }, [session, navigate]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: `Du bist ein KI-Coach, der dem Nutzer hilft, sein Ziel zu erreichen: ${goal || 'kein Ziel festgelegt'}` },
            ...updatedMessages,
          ],
        }),
      });

      const json = await res.json();
      const assistantMessage = json.choices[0].message;
      setMessages([...updatedMessages, assistantMessage]);
    } catch (err) {
      console.error('Fehler bei OpenAI:', err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Mindloft Chat</h1>
      <p className="mb-6">Ziel: {goal || 'Noch kein Ziel festgelegt'}</p>

      <div className="space-y-4 mb-6">
        {messages.map((msg, index) => (
          <div key={index} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            <span className="inline-block px-4 py-2 rounded-xl bg-zinc-800 text-white">
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-3 rounded-xl bg-zinc-800 text-white border border-zinc-700"
          placeholder="Nachricht eingeben..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white"
        >
          Senden
        </button>
      </div>
    </div>
  );
}
