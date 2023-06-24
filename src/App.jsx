import "./App.css";
import Posts from "./components/Posts/Posts";
import ReportCard from "./components/Posts/ReportCard";
import Footer from "./components/UI/Footer";
import Navbar from "./components/UI/Navbar";

function App() {
  return (
    <>
      <Navbar />

      {/* <ReportCard /> */}
      <Posts />
      <Footer />
    </>
  );
}

export default App;
