import React, { useState, useEffect } from "react";
// import notes from "../assets/data";
import ListItem from "../Components/ListItem";
import Header from "../Components/Header";
import AddButton from "../Components/AddButton";

const NotesListPage = () => {
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    try {
      let response = await fetch("http://localhost:8000/notes");
      let data = await response.json();
      setNotes(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="notes">
      <Header title={"Notes List"} />
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPage;
