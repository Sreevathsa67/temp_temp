import React, { useState } from 'react';

const StudentDashboard = () => {
  const [examPin, setExamPin] = useState('');
  const [handshakeStatus, setHandshakeStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!examPin.trim()) {
      setHandshakeStatus('❌ Please enter a valid Exam PIN.');
      return;
    }

    setHandshakeStatus('⏳ Attempting handshake...');
    
    fetch("http://localhost:4567/handshake", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        if (data.handshake === "ok") {
          setHandshakeStatus("✅ Handshake successful! Redirecting to exam selection...");
          
          console.log("✅ Redirecting to index.html...");  // 🛑 Debugging step
          
          setTimeout(() => {
            window.location.href = "mains.html";
          }, 1000);

        } else {
          setHandshakeStatus("❌ Handshake failed. Is the Python app running?");
        }
      })
      .catch((err) => {
        console.error("🚨 Handshake error:", err);
        setHandshakeStatus("❌ Could not reach Python app. Make sure it's running on port 4567.");
      });
};

  return (
    <div style={{ margin: "1rem" }}>
      <h2>Student Dashboard</h2>
      <p>Welcome, student! Enter your Exam PIN to begin.</p>

      {/* Exam PIN Input Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Exam PIN"
          value={examPin}
          onChange={(e) => setExamPin(e.target.value)}
        />
        <button type="submit">Start Exam</button>
      </form>

      {/* Display handshake status */}
      {handshakeStatus && <p>{handshakeStatus}</p>}
    </div>
  );
};

export default StudentDashboard;
