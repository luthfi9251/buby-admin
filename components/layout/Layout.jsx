import { useEffect, useState } from 'react';
import style from './Layout.module.css'
import arrow from '../sidebar/arrow-left.png'
import Image from 'next/image'

export default function Layout({children,  title, dropable = false, defaultOpen = true}){

    let isADesktop = () =>{
        let width = window.innerWidth

        return (width > 768)
    }

    const [isOpen, setIsOpen] = useState(true)

    let handleOpen = () =>{
        if(dropable){
            setIsOpen(!isOpen)
        }
    }

    useEffect(()=>{
        if(defaultOpen || isADesktop()){
            setIsOpen(true)
        }else{
            setIsOpen(false)
        }
    },[])


    return(
        <div className={style.container}>
            <div className={style.header} onClick={handleOpen}>{title}
                <div className={style.image} style={{
                    transform : isOpen ? "rotate(90deg)" : "rotate(-90deg)",
                    display : dropable ? "block" : "none"
                }}>
                    <Image alt="as" src={arrow} fill={true} style={{objectFit:"contain"}}/>
                </div>
            </div>
            <div className={style.child} style={{
                    maxHeight : isOpen ? "2000px" : 0,
                    overflow : isOpen ? "hidden" : "hidden",
                }}>
                {children}
            </div>
        </div>
    )
}