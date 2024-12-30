import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "../Pages/Project.module.css";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import Message from "../layout/Message";
import ServiceEdit from "./ServiceEdit";

function Service() {
  const { projectId, id } = useParams();

  const [project, setProject] = useState([]);
  const [service, setService] = useState([]);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [typeMessage, setTypeMessage] = useState();


  // Faço a requisição do meu projeto...
  useEffect(() => {
    fetch(`http://localhost:5000/projects/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        // Defino projeto e serviço...
        setProject(data);
        setService(data.services.filter((service) => service.id === id)[0]);
      })
      .catch((err) => console.log(err));
    }, [projectId, id]);


  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function atualizarServico(newService) {
    setMessage("")

    // Preço antigo vai levar o serviço antigo (service) subtraindo do custo atual (project.costs)
    const oldPrice = (parseFloat(project.costs) - parseFloat(service.costs))

    // Para o novo preço de serviço, basta adicionar o preço antigo (oldPrice) junto do preço do projeto novo (newService)
    const newPrice = oldPrice + parseFloat(newService.costs)

    // Conferindo se os valores são coesos e passando a menssagem para o usuário
    if (parseFloat(project.precoProjeto) < newPrice ) {
      setShowServiceForm(!showServiceForm);
      setMessage("O preço do serviço é maior que o orçamento para o projeto!");
      setTypeMessage("error");

      return false;
    }

    project.costs = newPrice
    
    // eu passo por todos os serviços até encontrar o meu, quando encontrar eu substituo no valor digitado no input (realizando assim as alterações do handleSubmit), caso contrário eu não mudo nada!
    const newServices = project.services.map((service) => 
      service.id === id ? newService : service
    )

    // Crio um novo projeto e passo os novos valores de serviços, assim, a única alteração será feita sobre o serviço com mesmo id do serviço que eu quero mudar!
    const newProject = {
      ...project , services : newServices
    }



    fetch(`http://localhost:5000/projects/${projectId}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    })
    .then((resp) => resp.json())
    .then((data) => {
      // Defino meu projeto e serviço novamente...
      setProject(data);
      setService(data.services.find((service) => service.id === id));

      // envio uma menssagem de sucesso ao usuário e escondo o formulário
      setTypeMessage("success");
      setMessage("Serviço Editado com Sucesso");
    })
    .catch((err) => console.log(err));
  }

  return (
    <>
      {service ? (
        <div className={styles.project_details}>
          <Container customClass="collumn">
            {message && <Message type={typeMessage} msg={message} />}

            <div className={styles.details_container}>
              <h1>Serviço : {service.name}</h1>
              <button onClick={toggleServiceForm} className={styles.btn}>
                {!showServiceForm ? "Editar Serviço" : "Fechar"}
              </button>

              <div className={styles.project_info}>
                <p>
                  <span>Orçamento para o Projeto :</span> R${project.precoProjeto}
                </p>
                <p>
                  <span>Custo serviço :</span> R${service.costs}
                </p>
                <p>
                  <span>Descrição do serviço :</span> {service.description}{" "}
                </p>
              </div>
            </div>

            {!showServiceForm ? (
              <div> </div>
            ) : (
              <div className={styles.details_container}>
                <div className={styles.project_info}>
                  <ServiceEdit
                    btnText="Concluir Edição"
                    projectData={project}
                    handleSubmit={atualizarServico}
                  />
                </div>
              </div>
            )}
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Service;
