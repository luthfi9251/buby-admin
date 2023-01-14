import Body from "../../components/body/Body"
import InputItem from "../../components/input/InputItem"
import Layout from "../../components/layout/Layout"
import style from './Index.module.css'
import Table from "../../components/table/Table"
import axios from "axios"
import Status from "../../components/status/Status"
import { useEffect, useState, useRef } from "react"
import mysqlQuery from '../../utils/db'
import ShowProduct from "../../components/show-product/ShowProduct"

export default function Produk({ data }){
    let [dataTable, setDataTable] = useState(data)
    let [filterVal, setFilterVal] = useState("")
    let [idVal, setIdVal] = useState("")
    let [idProduk, setIdProduk] = useState([])
    let [valProduk, setValProduk] = useState([])
    let [dataSupplier, setDataSupplier] = useState([])
    let [showStatus, setShowStatus] = useState(false)
    let [dataStatus, setDataStatus] = useState({})
    let [showStatusIN, setShowStatusIN] = useState(false)
    let [dataStatusIN, setDataStatusIN] = useState({})
    let [filterJenisProduk, setFilterJenisProduk] = useState(dataTable)
    let [isLoading1, setIsLoading1] = useState(false)
    let [isLoading2, setIsLoading2] = useState(false)
    
    let formRef = useRef()

    useEffect(()=>{
        let arr = data.value
        let filtered = arr.filter(item=>{
            return item[1] === filterVal 
        })
        setIdVal("")
        setValProduk([])
        setIdProduk(filtered.map(item=>{
            return {
                value : item[0],
                text : item[0]
            }
        }))
    },[filterVal])

    useEffect(()=>{    //buat ganti val produk
        console.log("idVal", idVal)
        let arr = data.value
        if(idVal !== ""){
            let filtered = arr.filter(item=>{
                return item[0] === idVal 
            })
            setValProduk(filtered.flat())
        }else{
            setValProduk(["","","","","",""])
        }

    },[idVal,idProduk,filterVal])

    useEffect(()=>{
        axios.get('/api/addsupplier')
            .then(res=>{
                setDataSupplier(res.data.data.value.map(item=>{
                    return {
                        value : item[0],
                        text : item[2]
                    }
                }))
            })
            .catch(err=>console.log(err))
    },[])

    let clear = ()=>{
        setValProduk(["","","","","",""])
    }

    let handleAddJenisProduk = (e)=>{
        e.preventDefault()
        setIsLoading1(true)
        let data = {
            jenis_produk: e.target[0].value.toLowerCase(),
            nama_produk: e.target[1].value.toLowerCase(),
            tipe_produk: e.target[2].value.toLowerCase(),
            uac: e.target[3].value.toLowerCase(),
            durasi_hari: e.target[4].value.toLowerCase(),
            billing: e.target[5].value.toLowerCase(),
        }

        let getData = () =>{
            axios.get('/api/addjenisproduk')
                .then(res => {
                    setDataTable(res.data.data)
                })
                .catch(err => console.log(err))
        }

        axios.post('./api/addjenisproduk', data)
            .then(res=>{
                setShowStatus(true)
                setDataStatus(res.data)
                setIsLoading1(false)
                getData()
            })
            .catch(err=>{
                setShowStatus(true)
                setIsLoading1(false)
                setDataStatus(err.response.data)
            })
    }

    let handleAddProdukSupplier= (e) =>{
        setIsLoading2(true)
        e.preventDefault()
        let data = {
            id_produk: e.target[1].value.toLowerCase(),
            supplier: e.target[6].value.toLowerCase(),
            renew: e.target[7].value.toLowerCase(),
            harga: e.target[8].value.toLowerCase(),
        }
        axios.post('./api/produksupplier', data)
        .then(res=>{
            setShowStatusIN(true)
            setIsLoading2(false)
            setDataStatusIN(res.data)
        })
        .catch(err=>{
            setShowStatusIN(true)
            setIsLoading2(false)
            setDataStatusIN(err.response.data)
        })
    }

    let getValue = (val,name) =>{
        if(name === "nama_produk"){
            setFilterVal(val)
            setIdProduk([])
            clear()
        }else if(name === "id_produk"){
            setIdVal(val)
        }
    }

    let handleSearchChange = (val,name) =>{
        if(val === "ALL"){
            setFilterJenisProduk({
                head : dataTable.head,
                value : dataTable.value
            })
            return
        }
        let temp =  dataTable.value.filter(item=>{
            return item[1] === val
        })
        setFilterJenisProduk({
            head : dataTable.head,
            value : temp
        })
    }

    let getFilteredData = (index,data)=>{
        let arr = data.value
        if(index === 1){
            let result =[]
            arr.forEach(item=>{
                if(!result.includes(item[index])){
                    result.push(item[index])
                }
            })
            return result.map(item=>{
                return {
                    value : item,
                    text : item
                }
            })
        }
    }

    return(
        <>
        <Body title="Produk" titleHead="Data Produk">
            <Layout title="Input Jenis Produk">
                <form className={style.formContainer} onSubmit={handleAddJenisProduk}>
                    <div className={style.form}>
                        <InputItem label="Jenis Produk" name="jenis_produk"/>
                        <InputItem label="Nama Produk" name="nama_produk"/>
                        <InputItem label="Tipe Produk" name="tipe_produk"/>
                        <InputItem label="User per Account" name="upc"/>
                        <InputItem label="Durasi (hari)" name="durasi_hari"/>
                        <InputItem label="Billing" name="jenis_billing"/>
                    </div>
                    {showStatus && <Status data={dataStatus}/>}
                    <InputItem label="Simpan" type="submit" loading={isLoading1}/>
                </form>
            </Layout>
            <Layout title="Data jenis Produk" dropable={true} defaultOpen={false}>
                <InputItem type="select" callback={handleSearchChange} data={getFilteredData(1, dataTable)} selectDefault={{text:"ALL", value:"ALL"}}/>
                <Table data={filterJenisProduk} canEdit={false}/>
            </Layout>
            <Layout title="Input Produk Supplier">
                <form action="" ref={formRef} className={style.formContainer} onSubmit={handleAddProdukSupplier}>
                    <div className={style.form}>
                        <InputItem label="Nama Produk" name="nama_produk" type="select" callback={getValue} data={getFilteredData(1, dataTable)}/>
                        <InputItem label="ID Produk" name="id_produk" type="select" callback={getValue} data={idProduk}/>
                        <InputItem label="Tipe Produk" type="disabled" defVal={valProduk[2]}/>
                        <InputItem label="User per Account" type="disabled" defVal={valProduk[3]}/>
                        <InputItem label="Durasi" type="disabled" defVal={valProduk[4]}/>
                        <InputItem label="Billing" type="disabled" defVal={valProduk[5]}/>
                        <InputItem label="Supplier" callback={getValue} type="select" data={dataSupplier}/>
                        <InputItem label="Renew" type="select" data={[
                            {value : "yes", text: "yes"},
                            {value: "no", text: "no"}
                        ]} callback={getValue} />
                        <InputItem label="Harga"/>
                    </div>
                    {showStatusIN && <Status data={dataStatusIN}/>}
                    <InputItem label="Simpan" type="submit" loading={isLoading2} />
                </form>
                <ShowProduct/>
            </Layout>
        </Body>
        </>
    )
}

const placeholder = {
    head : ["Jenis Produk", "Nama Produk", "Tipe Produk", "User per Account", "Durasi", "Billing"],
    value : [
        ["Streaming App","Netflix","Premium","1","1 Bulan","Rvisa"],
        ["Streaming App","Netflix","Premium","1","1 Bulan","Rvisa"],
        ["Streaming App","Netflix","Premium","1","1 Bulan","Rvisa"]
    ]
}

export async function getServerSideProps(context) {
    const result = await mysqlQuery({
        query: "select * from jenis_produk"
    })
    const supp = await mysqlQuery({
        query: "select * from supplier"
    })

    let data
    let dataSupp
    try{
        data = {
            head : Object.keys(result[0]),
            value : result.map(item=>Object.values(item))
        }
    }catch(err){
        data = {
            head : ["id_produk", "jenis_produk", "nama_produk", "tipe_produk", "user_per_account", "durasi", "billing"],
            value : []
        }
    }
    return {
      props: {
        data: data
      }
    }
  }