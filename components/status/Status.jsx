import style from './Status.module.css'

export default function Status({ data }){
    let {success , msg} = data

    switch(success){
        case "true":
            return(
                <div className={style.statusSuccess}>
                    <p>{msg}</p>
                </div>
            )
            break
        case "false":
            return(
                <div className={style.statusErr}>
                    <p>Error ! {msg}</p>
                </div>
            )
        default:
            break
    }

}