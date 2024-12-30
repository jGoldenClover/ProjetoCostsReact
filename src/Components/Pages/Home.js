import styles from './Home.module.css'
import savings from '../../img/piggy_bank.png'
import LinkButton from '../layout/LinkButton';

function Home () {
    return (
        <section className={styles.home_container}> 

            <h1>
                Bem-Vindo ao <span>Costs</span>
            </h1>

            <p>Comece a gerenciar seus projetos agora mesmo!</p>

            <LinkButton to='/newproject' text='Criar Projeto'/>

            <img src={savings} alt='costs' /> 

        </section>
    )
}

export default Home ;