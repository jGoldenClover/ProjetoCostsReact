import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Projects.module.css";

import Message from "../layout/Message";
import Container from "../layout/Container";
import Loading from "../layout/Loading";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../projects/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage , setProjectMessage] = useState('')

  const location = useLocation();

  let message = "";

  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    fetch("http://localHost:5000/projects", {
      method: "GET",
      headers: {
        "Content-Type": "aplication/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data);
        setRemoveLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "aplication/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(projects.filter((projects) => projects.id !== id));
        // isso é simples, basicamente eu filtro entre todos os projetos, e digo que só quero manter aqueles com id diferente do id do projeto que eu estou deletando no momento
        setProjectMessage('Projeto Removido com Sucesso!');
      
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1> Meus Projetos </h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {message && <Message type="success" msg={message} />}
      {/* Menssagem exibida ao criar um novo projeto */}


      {projectMessage && <Message type="success" msg={projectMessage} />}
      {/* Menssagem exibida ao deletar um projeto */}

      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((projects) => (
            // criando um modelo para cada projeto:
            <ProjectCard
              id={projects.id}
              nomeProjeto={projects.nomeProjeto}
              precoProjeto={projects.precoProjeto}
              category={projects.category?.name}
              key={projects.id}
              handleRemove={removeProject}
            />
          ))}

        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não ha Projetos Cadastrados!</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
