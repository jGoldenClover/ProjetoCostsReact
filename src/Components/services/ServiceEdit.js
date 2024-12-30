import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'


import styles from "../projects/ProjectForm.module.css";

import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";

function ServiceEdit({ btnText, handleSubmit, projectData }) {

  const { id } = useParams()
  const [service, setService] = useState({});

  // Eu uso o useEffect por que ele só vai executar o código caso eu receba o meu projectData e caso eu tenha um id
  useEffect(() => {
    // Se eu receber os serviços de projectData...
    if (projectData.services) {

      // Defina o serviço :
      setService(projectData.services.find((service) => service.id === id) )
    }
  } , [projectData , id])


  function handleChange (e) {
    // Toda a mudança feita vai atualizar meu serviço, 
    setService({...service , [e.target.name] : e.target.value})
  }

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(service);
    // Ao clicar no submit eu quero alterar o serviço...
  };


  return (
    <form className={styles.form} onSubmit={submit}>
      <Input
        type="text"
        text="Nome do Serviço"
        name="name"
        id="name"
        value={service.name || ''}
        handleOnChange={handleChange}
        />

      <Input
        type="number"
        text="Custo do Serviço"
        name="costs"
        id="costs"
        value={service.costs || ''}
        handleOnChange={handleChange}

        />

      <Input
        type="text"
        text="Descrição do Serviço"
        name="description"
        id="description"
        value={service.description || ''}
        handleOnChange={handleChange}

      />

      <SubmitButton text={btnText} />
    </form>
  );
}

export default ServiceEdit;
