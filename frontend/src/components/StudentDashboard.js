import React, { useState } from 'react';

const StudentDashboard = () => {
  const [examPin, setExamPin] = useState('');
  const [handshakeStatus, setHandshakeStatus] = useState(null);

  // Function to start the handshake
  const startHandshake = () => {
    fetch("http://localhost:4567/handshake",{ mode: "cors" })
      .then(response => response.json())
      .then(data => {
        if (data.handshake === "ok") {
          setHandshakeStatus("✅ Handshake successful! Monitoring started.");
        } else {
          setHandshakeStatus("❌ Handshake failed. Ensure the monitoring app is running.");
        }
      })
      .catch(error => {
        setHandshakeStatus("❌ Handshake request failed. Is the Python app running?");
        console.error("Handshake error:", error);
      });
  };

  // Function to handle Exam PIN submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (examPin.trim() === "") {
      alert("Please enter a valid Exam PIN.");
      return;
    }
    console.log(`Exam PIN Entered: ${examPin}`);
    startHandshake(); // Start handshake after PIN entry
  };

  return (
    <div>
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
