import style from "./Login.module.css"
import Head from "next/head"
import InputItem from "../../components/input/InputItem"
import { useState } from "react"
import { useRouter } from "next/router"

export default function Login(){
    let [check, setCheck] =useState(false)
    let router = useRouter()

    let handleLogin = (e) => {
        e.preventDefault()
        let key = e.target[0].value
        console.log(process.env.NEXT_PUBLIC_ACCES_CODE)

        if(key === process.env.NEXT_PUBLIC_ACCES_CODE){
            if(!check){
                sessionStorage.setItem("allow","true")
            }else{
                localStorage.setItem("allow", "true")
            }
            router.push('/')
            console.log("Berhasil Login")
        }else{
            alert("Kode Akses Salah")
        }


    }


    return(
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className={style.container}>
                <div className={style.wrapper}>
                    <p className={style.welcome}>Welcome to Buby Admin</p>
                    <form className={style.form} onSubmit={handleLogin}>
                        <InputItem label="Kode Akses"/>
                        <div className={style.check}>
                            <input type="checkbox" name="remember me" id="remember" value="remember" onChange={()=> setCheck(!check)}/>
                            <label className={style.label} htmlFor="remember">Remember Me</label>
                        </div>
                        <InputItem label="Submit" type="submit"/>
                    </form>
                </div>
            </div>
        </>
    )
}

