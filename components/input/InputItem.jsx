import style from "./InputItem.module.css"
import { useState } from "react"

export default function InputItem({ref, type, label, name, defVal, callback, data = [], loading = false, selectDefault={text:"Pilih Salah Satu", value: "DEFAULT"} }) {
    let [defVal1, setDefVal] = useState(defVal)

    switch (type) {
        case "submit":
            return (
                <div className={style.submit}>
                    <input className={style.btn} type="submit" value={loading ? "Loading.." : label} />
                </div>
            )
        case "select":
            return (
                <div className={style.container}>
                    <select ref={ref} className={style.input} name={name} id={name} onChange={(e)=>callback(e.target.value, name)} defaultValue="DEFAULT" required>
                        <option value={selectDefault.value}>{selectDefault.text}</option>
                        {
                            data.map((item, key) => {
                                return (<option value={item.value} key={key}>{item.text}</option>)
                            })
                        }
                    </select>
                    <label className={style.label} htmlFor={name}>{label}</label>
                </div>
            )
            break
        case "disabled":
            return (
                <div className={style.container}>
                    <input className={style.inputDisabled} id={name} type="text" placeholder=" " name={name} value={defVal} disabled/>
                    <label className={style.label} htmlFor={name}>{label}</label>
                </div>
            )
        default:
            return (
                <div className={style.container}>
                    <input className={style.input} id={name} type="text" placeholder=" " name={name} value={defVal1}/>
                    <label className={style.label} htmlFor={name}>{label}</label>
                </div>
            )
            break
    }

}