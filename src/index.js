import React from 'react'
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './styles/index.css';
import Home from './Home';
import Learner from './Learner.js'
import Org from './Org.js'

document.title="LMS";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />}/>
          <Route path="learner" element={<Learner />} />
          <Route path="org" element={<Org />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
