import styles from './Container.module.css'

function Container (props) {
    return (
        <div className={`${styles.container} 
        ${styles[props.customClass]}`
        // Eu defino que o container, por padrão vai ter 2 estilos, o estilo do container e o estilo personalizado de cada um dos elementos filhos, assim, se eu for precisar de 2 estilos para diferentes elementos dentro de 2 containers diferentes basta mudar o valor de customClass, e não de styles.container
        }> 

            {props.children} 


        </div>
    )
}

export default Container ;