import { useState,useEffect } from "react";
import Layout from "../layout/Layout";
import style from "./Input.module.css"
import InputItem from "../input/InputItem";


const data=[{
    value: "keita",
    text:"Ress Keita"
}]

export default function Input(){


    return(
        <Layout title={"Input Order"} dropable={true} defaultOpen={false}>
            <form action="GET" className={style.form}>
            <InputItem label="Nama Customer" name={"nama_cust"}/>
            <InputItem label="Nomor Wa" name="no_wa"/>
            <InputItem label="Pilih Produk" data={data}name="produk" type="select"/>
            <InputItem label="Tipe Produk" name="tipe_produk" type="select" data={data}/>
            <InputItem label="Durasi Produk" name="durasi" type="select" data={data}/>
            <InputItem label="Supplier" type={"select"} data={data} name={"nama_sup"}/>
            <InputItem label="Harga Jual" name="harga_jual"/>
            <InputItem label="Harga Beli" name="harga_beli"/>
            <InputItem type="submit" label="Simpan"/>
            </form>
        </Layout>
    )
}
