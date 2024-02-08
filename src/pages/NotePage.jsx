import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import notes from "../assets/data";
import ArrowLeft from "../assets/Arrowleft.jsx";
import Header from "../Components/Header";

const NotePage = () => {
  const { id } = useParams();
  // const note = notes.find((note) => note.id === Number(id));
  let [note, setNote] = useState([]);
  let [text, setText] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    getNote();
  }, [id]);

  // get note from json server api
  let getNote = async () => {
    if (id === "new") return;
    let response = await fetch(`http://localhost:8000/notes/${id}`);
    let data = await response.json();
    setNote(data);
  };

  let handleSubmit = () => {
    if (id != "new" && !note.body) {
      deleteNote();
    } else if (id === "new" && note !== null) {
      createNote();
    } else {
      updateNote();
    }
  };

  // create function
  let createNote = async () => {
    await fetch(`http://localhost:8000/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  // update function
  let updateNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  // delete function
  let deleteNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note }),
    });
    navigate("/");
  };

  return (
    <div className="note">
      {id !== "new" ? (
        <Header title={"Notes"} btn={"Delete"} onDel={() => deleteNote()} />
      ) : (
        <Header title={"Notes"} />
      )}

      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft />
          </Link>
        </h3>
        <button
          type="button"
          onClick={() => {
            handleSubmit();
            setText("Saved ✅");
          }}
        >
          {text}
        </button>
      </div>
      <textarea
        onChange={(e) => {
          setText("Save");
          setNote({ ...note, body: e.target.value });
        }}
        value={note.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
