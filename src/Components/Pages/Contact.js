import styles from './Contact.module.css'


function Contact () {
    return (
        <div className={styles.container}>
            <h1>Contato</h1>
            <div className={styles.container_info}>
                <span>Telefone de contato para suporte :</span> (+55) 19 32121-3233
            </div>
        </div>        
    )
}

export default Contact ;