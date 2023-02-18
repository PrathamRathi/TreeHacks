import { Route, Routes } from "react-router-dom";
import { Home, Students, Grades } from "./views";
import { NavBar } from "./components";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/grades" element={<Grades />} />
      </Routes>
    </div>
  );
}

export default App;
