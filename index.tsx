import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import Bar from './Bar';

function App() {
  return (
    <div
      style={{
        padding: '120px 32px',
      }}
    >
      <Bar />
    </div>
  );
}

render(<App />, document.getElementById('root'));
