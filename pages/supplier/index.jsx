import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import Body from '../../components/body/Body'
import InputItem from '../../components/input/InputItem'
import Table from '../../components/table/Table'
import style from './Index.module.css'
import Modal from '../../components/modal/Modal'
import Status from '../../components/status/Status'
import { useState, useEffect } from 'react'
import axios from 'axios'
import mysqlQuery from '../../utils/db'

export default function Supplier({ data }){
    let [isOpen, setIsOpen] = useState(false);
    let [dataTable, setDataTable] = useState(data)
    let [editData, setEditData] = useState({});
    let [showStatus, setShowStatus] = useState(false)
    let [dataStatus, setDataStatus] = useState({})
    let [isLoading, setIsLoading] = useState(false)

    let openModal = (data) => {
        setEditData(data)
        setIsOpen(true)
    }

    let closeModal = () => {
        setEditData({})
        setIsOpen(false)
    }

    let handleAddSupplier = (e) => {
        setShowStatus(false)
        setIsLoading(true)
        let data = {
            nama : e.target[0].value.toLowerCase(),
            grupwa : e.target[1].value.toLowerCase(),
            namaAdmin : e.target[2].value.toLowerCase(),
            noWaAdmin : e.target[3].value.toLowerCase(),
            idTwitter : e.target[4].value.toLowerCase()
        }

        let temp = dataTable
        e.preventDefault()
        let getData = () =>{
            axios.get('/api/addsupplier')
                .then(res => {
                    setDataTable(res.data.data)
                })
                .catch(err => console.log(err))
        }
        axios.post('/api/addsupplier', data)
            .then(res => {
                setShowStatus(true)
                setDataStatus(res.data)
                setIsLoading(false)
                getData()
            })
            .catch(err => {
                setShowStatus(true)
                setDataStatus(err.response.data)
                setIsLoading(false)
            })
    }

    let handleFilterNama = (e)=>{
        let nama = e.target[0].values
    }

    return(
        <>
        <Body title={"Supllier"} titleHead="Data Supplier">
            <Layout title={"Input Supplier"}>
                <form className={style.formContainer} method="POST" onSubmit={handleAddSupplier}>
                    <div className={style.form}>
                        <InputItem label="Nama Supplier" name="nama-sup" />
                        <InputItem label="Nama Grup WA" name="grup-wa-sup" />
                        <InputItem label="Nama Admin" name="nama-admin" />
                        <InputItem label="No WA Admin" name="no-wa-admin" />
                        <InputItem label="Id Twitter" name="id-twitter" />
                    </div>
                    {showStatus && <Status data={dataStatus}/>}
                    <InputItem label="Simpan" type="submit" loading={isLoading}/>
                </form>
            </Layout>
            <Layout title="Data Supplier">
                <form action="" className={style.search}>
                    <InputItem name="nama_sup" label="Nama Supplier" type="disabled"/>
                    <InputItem type="submit" label="Cari"/>
                </form>
                <h5 className={style.subTitle}>Hasil Pencarian</h5>
                <Table data={dataTable} handleEdit={openModal} canEdit={false}>
                </Table>
            </Layout>
        </Body>
        <Modal open={isOpen} data={editData} onClose={closeModal}></Modal>
        </>
    )
}


export async function getServerSideProps(context) {
    const result = await mysqlQuery({
        query: "select * from supplier"
    })
    let data
    try{
        data = {
            head : Object.keys(result[0]),
            value : result.map(item=>Object.values(item))
        }
    }catch(err){
        data = {
            head : ["Id Supplier", "Nama Supp", "Nama Group", "Nama Admin", "No Admin"],
            value : []
        }
    }
    return {
      props: {
        data: data
      }
    }
  }