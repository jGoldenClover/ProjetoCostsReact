import { useEffect, useState } from "react";

import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

import styles from "./ProjectForm.module.css";

function ProjectForm({ btnText, handleSubmit, projectData }) {
  // agora a gente vai mudar o valor das categorias dentro do select baseado nas opções que eu defini no db.json[categories]
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-type": "aplication/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    console.log(project)
    handleSubmit(project);
  };

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  // Quando clicar na categoria eu completo o projeto novamente:
  function handleCategory(e) {
    // Entrego o próprio projeto junto com a categoria
    setProject({
      ...project, category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });

    
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <Input
        type="text"
        text="Nome do Projeto"
        placeholder="Insira o nome do projeto"
        name="nomeProjeto"
        id="nomeProjeto"
        handleOnChange={handleChange}
        value= {project.nomeProjeto ? project.nomeProjeto : ''}
        
      />

      <Input
        type="number"
        text="Orçamento do projeto"
        placeholder="Insira o Orçamento"
        name="precoProjeto"
        id="precoProjeto"
        handleOnChange={handleChange}
        value={project.precoProjeto ? project.precoProjeto : 0}
      />

      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : []}
      />

      
      {!project.nomeProjeto || !project.precoProjeto || !project.category ? <div className={styles.message_error}>Preencha Todos os Campos </div> : <SubmitButton text={btnText} />}
      


    </form>
  );
}

export default ProjectForm;
