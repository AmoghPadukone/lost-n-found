import { Route, Routes } from "react-router-dom";
import "./App.css";
import Info from "./pages/Info";
import Home from "./pages/home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  );
}

export default App;
