import style from './Table.module.css'

export default function Table({ data = { head: [], value: [] }, handleEdit, canEdit = true }){
    const {head, value} = data

    return(
        <div className={style.table}>
            <table className={style.tableContainer}>
                <thead className={style.thead}>
                    <tr>
                        {head.map((item, key)=>{
                            return (<th key={key}>{item}</th>)
                        })}
                        {canEdit && <th>Action</th>}
                    </tr>
                </thead>
                <tbody className={style.tbody}>
                    {value.map((item, key)=>{
                        let dataEdit = {
                            head,
                            value : item
                        }
                        
                        return (<tr key={key}>{
                            item.map((val, i)=>{
                                return(
                                    <td key={i}>{val}</td>
                                )
                            })
                        }
                        {canEdit && <td><button onClick={()=>handleEdit(dataEdit)}>Edit</button></td>}
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}