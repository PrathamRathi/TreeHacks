import { Route, Routes } from "react-router-dom";
import { Home, Students, Grades } from "./views";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/students" element={<Students />} />
      <Route path="/grades" element={<Grades />} />
    </Routes>
  );
}

export default App;
