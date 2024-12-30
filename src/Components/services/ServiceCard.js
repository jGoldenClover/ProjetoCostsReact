import { BsFillTrashFill, BsPencil} from 'react-icons/bs' 


import styles from '../projects/ProjectCard.module.css'
import { Link } from 'react-router-dom'

function ServiceCard ({id , projectId , name , cost , description , handleRemove }) {
    
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id , cost)
    }

    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Preço :</span> R${cost}
            </p>
            <p>
                <span>Descrição :</span> {description}
            </p>
            <div className={styles.project_card_actions}>
                <Link to={`/projects/${projectId}/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
        
    )
}

export default ServiceCard ;