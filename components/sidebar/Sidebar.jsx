import Image from 'next/image'

import styles from './Sidebar.module.css'

import Navitem from './Navitem'

import logo from "./logo-buby.jpeg"

import supplier from "./supplier.png"
import produk from "./produk.png"
import customer from "./customer.png"
import keuangan from "./keuangan.png"
import home from "./home.png"
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const navData = [
    {
        logo: home,
        text: "Home",
        link: "/"
    },
    {
        logo: supplier ,
        text: "Supplier",
        link: "/supplier" 
    },
    {
        logo: produk ,
        text: "Produk",
        link: "/produk" 
    },
    {
        logo: customer ,
        text: "Customer",
        link: "/customer" 
    },
    {
        logo: keuangan ,
        text: "Keuangan",
        link: "/keuangan" 
    }
]

export default function Sidebar(){

    let router = useRouter();

    useEffect(()=>{
        let local = localStorage.getItem("allow")
        let session = sessionStorage.getItem("allow") 

        if(!(local === "true" || session === "true")){
            router.push("/login")
        }

    },[])

    return(
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <Image alt="as" src={logo} fill={true}/>
            </div>
            {
                navData.map((item, index)=>{
                    return (
                        <Navitem key={index} logo={item.logo} text={item.text} link={item.link}/>
                    )
                })
            }
        </div>
    )
}