import { v4 as uuidv4 } from "uuid";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Project.module.css";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import Message from "../layout/Message";
import ProjectForm from "../projects/ProjectForm";
import ServiceForm from "../services/ServiceForm";
import ServiceCard from "../services/ServiceCard";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [typeMessage, setTypeMessage] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "aplication/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setServices(data.services);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function editPost(project) {
    setMessage("");

    // Verificando se o Orçamento não é menor que o preço do projeto
    if (project.precoProjeto < project.costs) {
      // Mando menssagem para o usuário...
      setMessage("Orçamento não pode ser menor que o custo do projeto!");
      setTypeMessage("error");

      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);

        setMessage("Projeto Atualizado com Sucesso!");
        setTypeMessage("success");
      })
      .catch((err) => console.log(err));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function createService(project) {
    const posicaoUltimoServico = project.services.length - 1;
    // defino qual é o ultimo serviço para eu poder acessa-lo 

    const ultimoServico = project.services[posicaoUltimoServico];
    // acesso esse serviço

    ultimoServico.id = uuidv4();
    // defino um id pro serviço

    const ultimoServicoCosts = ultimoServico.costs;
    const newCost = parseFloat(project.costs) + parseFloat(ultimoServicoCosts);
    // pego o seu valor e somo ao custo total no momento


    if (newCost > parseFloat(project.precoProjeto)) {
      setMessage("");
      setMessage("Orçamento ultrapassado! Verifique o valor máximo do serviço.");
      setTypeMessage("error");

      project.services.pop();
      // se o orçamento for menor que o custo, para não dar erro, a gente retira esse serviço usando o .pop()

      setShowServiceForm(!showServiceForm);
      return false;
    }

    project.costs = newCost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setServices(data.services);
        setShowServiceForm(!showServiceForm);
      })
      .catch((err) => console.log(err));
  }

  function removeService(id, cost) {
    // retiro o serviço selecionado
    const atualizarServico = project.services.filter(
      (service) => service.id !== id
    );

    // defino o projeto atual
    const projetoAtualizado = project;

    // retiro o serviço selecionado do projeto atual
    projetoAtualizado.services = atualizarServico;

    const valorAtual = parseFloat(projetoAtualizado.costs);

    // Agora eu mudo o valor para subtrair do antigo pelo atual
    projetoAtualizado.costs = valorAtual - parseFloat(cost);

    // Eu primeiro pego o valor que nunca mudou (projetoAtualizado.cost), e subtraio pelo valor do serviço (cost)

    fetch(`http://localhost:5000/projects/${projetoAtualizado.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify(projetoAtualizado),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projetoAtualizado);
        setServices(atualizarServico);

        setMessage("");

        setTypeMessage("success");
        setMessage("Serviço removido com sucesso!");
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {project.nomeProjeto ? (
        <div className={styles.project_details}>
          <Container customClass="column">
          {message && <Message type={typeMessage} msg={message} />}

            <div className={styles.details_container}>
              <h1>Projeto: {project.nomeProjeto}</h1>

              <button onClick={toggleProjectForm} className={styles.btn}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
              </button>

              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria :</span>
                    {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento :</span> R$
                    {project.precoProjeto}
                  </p>
                  <p>
                    <span>Total Utilizado :</span> R$
                    {project.costs}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    btnText="Concluir Edição"
                    handleSubmit={editPost}
                    projectData={project}
                  />
                </div>
              )}

              
            </div>

            <div className={styles.service_form_container}>
              <h2>Adicione um serviço :</h2>

              <button onClick={toggleServiceForm} className={styles.btn}>
                {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
              </button>

              {showServiceForm ? (
                <div className={styles.project_info}>
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                </div>
              ) : (
                <div className={styles.project_info}>
                  <p>Número de serviços: {services.length}</p>
                </div>
              )}
            </div>

            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    projectId = {project.id}
                    name={service.name}
                    cost={service.costs}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}

              {services.length === 0 && <p>Não há serviços cadastrados!</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
