import Loader from '../../img/Loading.svg'
import styles from './Loading.module.css'

function Loading () {
    return (
        <div className={styles.loader_container}>
            <img className={styles.loader} src={Loader} alt="" />
        </div>
    )
}

export default Loading ;