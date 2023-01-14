import styles from './Navitem.module.css'
import Image from 'next/image'
import Link from 'next/link'

import arrow from './arrow-left.png'

export default function Navitem({ logo, text, link }){
    return(
        <Link href={link} legacyBehavior>
            <a className={styles.link}>
                <div className={styles.container}>
                    <div className={styles.image}>
                        <Image alt="as" src={logo} fill={true} style={{objectFit:"contain"}}/>
                    </div>
                    <span className={styles.text}>{text}</span>
                    <div className={styles.arrow}>
                        <Image alt="as" src={arrow} fill={true}/>
                    </div> 
                </div>   
            </a>
        </Link>
    )
}