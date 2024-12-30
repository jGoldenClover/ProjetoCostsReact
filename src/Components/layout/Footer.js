import {FaFacebook , FaGithub, FaInstagram , FaLinkedin} from 'react-icons/fa'

import styles from './Footer.module.css'


function Footer () {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}> 

                <li >
                    <a href='#'><FaFacebook/></a>
                </li>

                <li >
                    <a href='https://www.instagram.com/joaorafaelpm/' target='_'><FaInstagram/></a>
                </li>

                <li >
                    <a href='https://github.com/jGoldenClover' target='_'><FaGithub/></a>
                </li>
            </ul>

            <p className={styles.copy_right}><span>Costs</span> &copy; 2025</p>

        </footer>

    )
}

export default Footer ;