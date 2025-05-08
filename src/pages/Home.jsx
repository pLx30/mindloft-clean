// src/pages/Home.jsx
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <>
      <Header />
      <main className="home">
        <section className="hero">
          <h1>Lerne besser. Denke klarer.
          Werde, wer du sein willst.</h1>
          <p>Mit Mindloft erschaffst du dein persönliches Denk- und Entwicklungssystem …</p>

          <h1>Was ist Mindloft?</h1>
          <p>Mindloft ist kein Kurs. Kein Coaching. Und auch kein Chatbot.  Es ist dein persönlicher Denkraum – geführt von einer KI, die sich an dich anpasst.Du gibst dein Ziel ein, Mindloft baut dir deinen individuellen Weg.  Täglich. Klar. Ohne Überforderung.
            <li>🧠 Du denkst klarer.</li>
            <li> Du lernst smarter.</li>  
            <li>🎯 Du erreichst, was dir wirklich wichtig ist.</li></p>

            <h1>Für wen ist Mindloft?</h1>
          <p>Mindloft ist für alle, die sich oft fragen:
            🔹 „Warum bin ich ständig überfordert?“ 
            🔹 „Wie bekomme ich meine Gedanken klar?“  
            🔹 „Ich will weiterkommen – aber wo fange ich an?“  
            🔹 „Ich habe Ideen, aber keine Struktur.“  
            🔹 „Ich will lernen – auf meine Art.
            “Egal, ob du Schüler, Gründer, kreativer Kopf oder einfach auf der Suche bist:  **Mindloft passt sich dir an. Nicht umgekehrt.**</p>

            <h1>Wie funktioniert Mindloft?</h1>
          <p>🧭 Du sagst, wo du hinwillst.
            🤖 Deine persönliche KI analysiert deinen Fokus, deine Lernart & dein Tempo.
            📅 Jeden Tag bekommst du Impulse, Fragen & Aufgaben – genau auf dich zugeschnitten.
            📈 Du wächst. Schritt für Schritt. Klarer. Effektiver. Echte Fortschritte.
            Ohne Druck. Ohne Überforderung.  
            Ein System, das dich kennt – und mit dir wächst.</p>

            <h1>Was du bekommst</h1>
          <p>✅ Eine persönliche KI, die deine Ziele versteht
            ✅ Einen klaren, individuell angepassten Lernpfad
            ✅ Tägliche Impulse, Denkfragen & Aufgaben
            ✅ Begleitung, keine Anleitung
            ✅ Struktur – aber so, wie sie zu dir passt
            ✅ Einen Ort, an dem du wirklich weiterkommst.</p>

            <h1>Bereit, deinen Weg zu starten?</h1>
          <p>Du musst nicht perfekt vorbereitet sein.  
            Du musst nur bereit sein, loszugehen.
‍
            **Mit Mindloft beginnt dein Weg – so, wie er zu dir passt.**
‍               
            🎯 Starte mit deinem ersten Ziel  
            📅 Lerne in deinem Tempo  
            🤖 Werde begleitet – nicht belehrt</p>
          <Link to="/register" className="cta-button">Jetzt starten</Link>
        </section>
      </main>
    </>
  )
}

export default Home
