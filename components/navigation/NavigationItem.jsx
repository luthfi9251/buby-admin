import styles from './NavigationItem.module.css'

import Image from 'next/image'
import Link from 'next/link'

export default function NavigationItem({ logo, text, link }){
    return(
        <Link href={link} legacyBehavior>
            <a className={styles.container}>
                <div className={styles.link}>
                    <div className={styles.image}>
                        <Image alt="as"src={logo} fill={true} style={{objectFit:"contain"}}/>
                    </div>
                    <span className={styles.text}>{text}</span>
                </div>   
            </a>
        </Link>
    )
}