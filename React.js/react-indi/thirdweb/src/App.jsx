import React from 'react'
import "./App.css";
import { Profile } from './components/StaticProfile';
import PropAvatar from './components/DynamicProfile';
import Counter from './components/Counter';
import Todo from './components/Todolist';


export const App = () => {
  return (
    <div className="app">
      <Profile /> 
      <h1>Dynamic Profile</h1>
      <h2>Avatar 1</h2>
      <PropAvatar
        image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBRA2TmZWxhMbzalqzdjW_zZJBp7U3ZdE--w&s"
        name = "Kaushik Mishra"
        email = "kaushikmishra@gmail.com"
        phone = "+91 8400491135"
      />
      <h2>Avatar 2</h2>
      <PropAvatar
        image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRssw4zxCfYg8DHGl8TEZxM9oaXLirYyU82sg&s"
        name = "Satyam Mishra"
        email = "satyammishra@gmail.com"
        phone = "+91 8400491135"
      />
      <h2>Avatar 3</h2>
      <PropAvatar
        image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk5PkjpGFOVgYzU2HbGzhIhU0szCPIAYe-9Q&s"
      />
      <Counter />
      <Todo />
    </div>
  );
};
