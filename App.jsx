import React, { useState } from 'react';
import './App.css';

const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()-_=+[]{};:,.?/';

function generatePassword(length, useUpper, useLower, useNumbers, useSymbols) {
  let pool = '';

  if (useUpper) pool += uppercase;
  if (useLower) pool += lowercase;
  if (useNumbers) pool += numbers;
  if (useSymbols) pool += symbols;

  if (!pool) return '';

  return Array.from({ length }, () => pool[Math.floor(Math.random() * pool.length)]).join('');
}

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [message, setMessage] = useState('');

  const handleGenerate = () => {
    const safeLength = Math.max(4, Math.min(40, Number(length) || 12));
    const nextPassword = generatePassword(safeLength, useUpper, useLower, useNumbers, useSymbols);

    if (!nextPassword) {
      setMessage('Select at least one character type.');
      setPassword('');
      return;
    }

    setLength(safeLength);
    setPassword(nextPassword);
    setMessage('');
  };

  const handleCopy = async () => {
    if (!password) {
      setMessage('Generate a password first.');
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      setMessage('Password copied to clipboard!');
    } catch (error) {
      setMessage('Copy failed. Please copy manually.');
    }
  };

  return (
    <main className="app-shell">
      <section className="passwordBox">
        <h1>Password Generator</h1>
        <p className="subtitle">Create a secure password in one click.</p>

        <div className="passwordBoxin">
          <input type="text" readOnly value={password} placeholder="Your password appears here" />
          <button type="button" onClick={handleCopy}>Copy</button>
        </div>

        <label className="field">
          <span>Password length</span>
          <input
            type="number"
            min="4"
            max="40"
            value={length}
            onChange={(event) => setLength(event.target.value)}
          />
        </label>

        <label className="checkbox-row">
          <input type="checkbox" checked={useUpper} onChange={() => setUseUpper(!useUpper)} />
          Include uppercase letters
        </label>
        <label className="checkbox-row">
          <input type="checkbox" checked={useLower} onChange={() => setUseLower(!useLower)} />
          Include lowercase letters
        </label>
        <label className="checkbox-row">
          <input type="checkbox" checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)} />
          Include numbers
        </label>
        <label className="checkbox-row">
          <input type="checkbox" checked={useSymbols} onChange={() => setUseSymbols(!useSymbols)} />
          Include symbols
        </label>

        <button type="button" className="generate-btn" onClick={handleGenerate}>Generate Password</button>
        {message ? <p className="message">{message}</p> : null}
      </section>
    </main>
  );
}

export default App;