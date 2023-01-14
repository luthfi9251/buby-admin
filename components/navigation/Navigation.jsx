import style from './Navigation.module.css'
import NavigationItem from './NavigationItem'

import supplier from "../sidebar/supplier.png"
import produk from "../sidebar/produk.png"
import customer from "../sidebar/customer.png"
import keuangan from "../sidebar/keuangan.png"

const navData = [
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


export default function Navigation(){
    return(
        <div className={style.container}>
            {
                navData.map((item, index)=>{
                    return (
                        <NavigationItem key={index} logo={item.logo} text={item.text} link={item.link}/>
                    )
                })
            }
        </div>
    )
}