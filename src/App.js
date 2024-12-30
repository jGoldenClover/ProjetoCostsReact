import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Pages/Home";
import Company from "./Components/Pages/Company";
import Contact from "./Components/Pages/Contact";
import NewProject from "./Components/Pages/NewProject";
import Projects from "./Components/Pages/Projects";
import Project from "./Components/Pages/Project";
import Service from "./Components/services/Service";

import Container from "./Components/layout/Container";
import NavBar from "./Components/layout/NavBar";
import Footer from "./Components/layout/Footer";

function App() {
  return (
    <Router>
      <NavBar />

      <Container customClass={"min-height"}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/company" element={<Company />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/projects/:projectId/:id" element={<Service />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
