import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";

function App() {
  return (
    <>
      <Router>
        <div className="container dark">
          <div className="app">
            <Routes>
              <Route path="/" element={<NotesListPage />} />
              <Route path="/note/:id" element={<NotePage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
