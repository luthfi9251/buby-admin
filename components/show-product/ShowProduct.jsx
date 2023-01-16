import style from "./ShowProduct.module.css"
import Layout from "../layout/Layout"
import InputItem from "../input/InputItem"
import { useState,useEffect } from "react"
import axios from "axios"
import Table from "../table/Table"

export default function ShowProduct(){
    let [namaProd, setNamaProd] = useState("")
    let [tipeProd, setTipeProd] = useState("")
    let [billing, setBilling] = useState("")
    let [durasiProd, setDurasiProd] = useState()
    let [jumlahUser, setJumlahUser] = useState()
    let [filteredData, setFilteredData] = useState([])
    let [tempData, setTempData] = useState([])
    let [isEmpty, setIsEmpty] = useState(true)
    let [dataTable, setDataTable] =  useState({ head: [], value:[[]] })
    let [isLoading, setIsLoading] = useState(false)
    let [namaInitial, setNamaInitial] = useState([])

    useEffect(()=>{
        axios.get(`/api/produksupplier?nama=${namaProd}`)
            .then((res)=>{
                setFilteredData(res.data.data)
            })
            .catch(err=>alert(err))
    },[namaProd])

    useEffect(()=>{
        axios.get(`/api/produksupplier?nama=initial`)
            .then((res)=>{
                let y = res.data.data.map(item=>{
                    return Object.values(item)
                })
                setNamaInitial(y.flat())
            })
            .catch(err=>alert(err))
    },[])

    

    let selectFriendly = (data) =>{
        return data.map((item)=>{
            return {
                value : item,
                text : item
            }
        })
    }

    let getValue = (val,name) =>{
        switch(name){
            case "nama_produk":
                setNamaProd(val)
                break
            case "tipe_produk":
                setTipeProd(val)
                break
            case "durasi":
                setDurasiProd(parseInt(val))
                break
            case "jumlah_user":
                setJumlahUser(parseInt(val))
                break
            case "billing":
                setBilling(val)
                break
            default:
                console.log("unknown value")
        }
    }

    let getUniqueData = (data, key, compare =[]) => {
        let temp = ["ALL"]
        data = data.filter(item=>{
            let bool = true
            compare.forEach(a=>{
                if(!Object.values(item).includes(a)){
                    bool=false
                }
            })
            return bool
        })
        data.forEach(item=>{
            if(!temp.includes(item[key])){
                temp.push(item[key])
            }
        })
        return selectFriendly(temp)
    }

    let handleSubmit = (e) => {
        let data = {
            namaProduk: e.target[0].value,
            tipeProduk: e.target[1].value === "DEFAULT" ? "ALL" : e.target[1].value,
            durasi: e.target[2].value === "DEFAULT" ? "ALL" : e.target[2].value,
            uac: e.target[3].value === "DEFAULT" ? "ALL" : e.target[3].value,
            billing: e.target[4].value === "DEFAULT" ? "ALL" : e.target[4].value
        }
        setIsLoading(true)
        e.preventDefault()
        console.log(data)
        axios.post('/api/cariproduk',data)
            .then((res)=>{
                let resData
                console.log(res)
                try{
                    resData = {
                        head : Object.keys(res.data.data[0]),
                        value : res.data.data.map(item=>{
                            return Object.values(item)
                        })
                    }
                    setIsEmpty(false)
                    setIsLoading(false)
                }catch(err){
                    resData = {
                        head : [],
                        value : [[]]
                    }
                    setIsEmpty(true)
                    setIsLoading(false)
                }
                setDataTable(resData)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    return(
        <>
            <Layout title="Cari Produk">
                <form action=""  onSubmit={handleSubmit}>
                    <div className={style.form}>
                        <InputItem label="Nama Produk" name="nama_produk" callback={getValue} type="select" data={selectFriendly(namaInitial)}/>
                        <InputItem label="Tipe Produk" name="tipe_produk" data={getUniqueData(filteredData,"tipe_produk",[namaProd])} callback={getValue} type="select"/>
                        <InputItem label="Durasi (hari)" name="durasi" data={getUniqueData(filteredData,"durasi",[tipeProd, namaProd])} callback={getValue} type="select"/>
                        <InputItem label="Jumlah User" name="jumlah_user" data={getUniqueData(filteredData,"user_per_account",[durasiProd, tipeProd])} callback={getValue} type="select"/>
                        <InputItem label="Billing" name="billing" data={getUniqueData(filteredData,"billing",[durasiProd, tipeProd,jumlahUser])} callback={getValue} type="select"/>
                    </div>
                    <InputItem label="Cari" type="submit" loading={isLoading}/>
                </form>
                <Table data={dataTable} canEdit={false}/>
                <p style={{textAlign:'center'}}>{isEmpty && "Tidak Ada Produk"}</p>
            </Layout>
        </>
    )
}

const namaProduk = ["netflix", "spotify"]