import {    BsPencil , BsFillTrashFill, BsPen } from 'react-icons/bs' 
import { Link } from 'react-router-dom'

import styles from './ProjectCard.module.css'


function ProjectCard ({id , nomeProjeto , precoProjeto , category , handleRemove}) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.project_card}>
            <h4>{nomeProjeto}</h4>
            <p>
                <span>Orçamento :</span> R${precoProjeto}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.project_card_actions}>
                <Link to={`/projects/${id}`} > 
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>

            </div>

        </div>
    )
}

export default ProjectCard ;