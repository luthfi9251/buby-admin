import style from './Modal.module.css'
import Layout from '../layout/Layout'
import InputItem from '../input/InputItem'

export default function Modal({ open, onClose, data }){
    const { head, value } = data
    return open ? (
        <div className={style.modal} onClick={() => onClose()}>
            <div className={style.modalBody} onClick={(e)=> e.stopPropagation()}>
                <div className={style.close} onClick={() => onClose()}>X</div>
                <Layout title="Edit Data">
                    <form action="" className={style.form}>
                        { head.map((item, i)=>{
                            console.log(value)
                            return (<InputItem label={item} defVal={value[i]}/>)
                        }) }
                    </form>
                </Layout>
            </div>
        </div>
    ) : null
}