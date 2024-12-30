import { useState } from "react";

import styles from "../projects/ProjectForm.module.css";

import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";

function ServiceForm({ btnText, handleSubmit, projectData }) {
  const [service, setService] = useState({});

  const submit = (e) => {
    e.preventDefault();

    projectData.services.push(service);
    // pego todos os meus serviços atuais...
    handleSubmit(projectData);
    // passo esses serviços de volta para o projectData quando fizer submit
  };

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <Input
        type="text"
        text="Nome do Serviço"
        placeholder="Insira o nome do serviço"
        name="name"
        id="name"
        handleOnChange={handleChange}
      />

      <Input
        type="number"
        text="Custo do Serviço"
        placeholder="Insira o custo do serviço"
        name="costs"
        id="costs"
        handleOnChange={handleChange}
      />

      <Input
        type="text"
        text="Descrição do Serviço"
        placeholder="Descreva o serviço"
        name="description"
        id="description"
        handleOnChange={handleChange}
      />

      {!service.name || !service.costs || !service.description ? (
        <div className={styles.message_error}>Preencha Todos os Campos </div>
      ) : (
        <SubmitButton text={btnText} />
      )}
    </form>
  );
}

export default ServiceForm;
