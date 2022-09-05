import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import Navigation from "./components/Navigation";
import CreateNotes from "./components/CreateNotes";
import CreateUsers from "./components/CreateUsers";
import NoteList from "./components/NotesList";

import "./App.css";
function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
    
      <Route path="/" exact component={NoteList} />
      <Route path="/edit/:id" component={CreateNotes} />
      <Route path="/create" component={CreateNotes} />
      <Route path="/user" component={CreateUsers} />
      
      </div>      
    </Router>
  );
}

export default App;
