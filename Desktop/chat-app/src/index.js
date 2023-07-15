import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjQcXq7UkDdln-CzJh-68ZNWdCXsxAxXg",
  authDomain: "react-chat-app-6ca38.firebaseapp.com",
  databaseURL: "https://react-chat-app-6ca38-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-6ca38",
  storageBucket: "react-chat-app-6ca38.appspot.com",
  messagingSenderId: "316005294396",
  appId: "1:316005294396:web:1630645114f28ca63afe39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
