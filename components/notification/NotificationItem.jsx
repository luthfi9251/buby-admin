import style from './NotificationItem.module.css'

export default function NotificationItem(){
    return(
        <div className={style.container}>
            <div className={style.title}>Renewal</div>
           <div className={style.paragraph}>
           Lakukan Renewal pada customer      <span>Luthfi-19983</span> pada akun <span>NETFLIX</span> tipe <span>1P1U</span>  pada <span>1 Januari 2023</span> 
           </div>
        </div>
    )
}