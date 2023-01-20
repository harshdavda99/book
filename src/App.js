import './App.css';
import { Routes, Route } from "react-router-dom";
import { Login } from './Auth/Login';
import { Register } from './Auth/Register';
import { Booklist } from './Pages/Booklist';
import { BookForm } from './Pages/BookForm';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Booklist" element={<Booklist/>}/>
        <Route path="/BookForm" element={<BookForm/>}/>
        <Route path="/Editbook/:_id" element={<BookForm/>}/>
        <Route path="*" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
