// src/pages/GoalPage.jsx
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useSession } from "../lib/sessionContext";

export default function GoalPage() {
  const navigate = useNavigate();
  const context = useSession();

  if (!context) {
    return <div className="text-white p-4">Lade...</div>;
  }

  const { session } = context;
  const [goal, setGoal] = useState("");

  if (!session) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async () => {
    if (!goal.trim()) {
      alert("Bitte gib ein Ziel ein.");
      return;
    }
  
    // Neues Ziel in 'user_goals' speichern
    const { data, error } = await supabase
      .from("user_goals")
      .insert([
        {
          user_id: session.user.id,
          goal: goal,
        },
      ])
      .select()
      .single(); // wichtig, damit wir direkt die goal_id bekommen
  
    if (error) {
      console.error("Fehler beim Speichern des Ziels:", error.message);
      alert("Ziel konnte nicht gespeichert werden.");
      return;
    }
  
    const goal_id = data.id;
  
    // Bestehende Fortschritte archivieren
    await supabase
      .from("progress")
      .update({ archived: true })
      .eq("user_id", session.user.id)
      .eq("archived", false);
  
    // Neuen Fortschritt starten
    const { error: progressError } = await supabase
      .from("progress")
      .insert([
        {
          user_id: session.user.id,
          goal_id: goal_id,
          level: 1,
          points: 0,
          milestones: [],
          updated_at: new Date().toISOString(),
          archived: false,
        },
      ]);
  
    if (progressError) {
      console.error("Fehler beim Anlegen des Fortschritts:", progressError.message);
      alert("Fortschritt konnte nicht erstellt werden.");
      return;
    }
  
    // Weiter zum Chat
    navigate("/chat");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-white px-4">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Was ist dein Ziel?</h1>
        <input
          type="text"
          placeholder="Gib dein Ziel ein"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 mb-4"
        />
        <button
          onClick={handleSubmit}
          className="bg-white text-black font-semibold px-5 py-2 rounded hover:bg-zinc-200"
        >
          Starten
        </button>
      </div>
    </div>
  );
}
