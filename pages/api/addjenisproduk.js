import mysqlQuery from'../../utils/db'


export default async function handler(req, res) {

  switch(req.method){
    case "POST":
      try{
        const { jenis_produk,nama_produk,tipe_produk,uac,durasi_hari,billing } = req.body
        let id_produk = nama_produk.slice(0,3) + tipe_produk.slice(0,2) + durasi_hari.toString() + billing.slice(0,2) + uac.toString()
        console.log(id_produk)
        const result = await mysqlQuery({
            query: "insert into jenis_produk(id_produk,jenis_produk, nama_produk, tipe_produk, user_per_account, durasi, billing) values(?,?,?,?,?,?,?)",
            values: [id_produk,jenis_produk,nama_produk,tipe_produk,uac,durasi_hari,billing]
        })

        if(result.hasOwnProperty('error')){
          throw result.error.sqlMessage
        }

        res.status(200).json({
            success : "true",
            msg : `Berhasil menambahkan produk ${nama_produk}`,
            result : result
        })
      }catch(err){
        res.status(400).json({
          success:"false",
          msg: err
        })
      }
      break

    case "GET":
      try{
        const result = await mysqlQuery({
            query: "select * from jenis_produk"
        })
  
        let data = {
            head : Object.keys(result[0]),
            value : result.map(item=>Object.values(item))
        }
        res.status(200).json({
            success : "true",
            msg : "Succes get",
            data : data
        })
      }catch(err){
        res.status(404).json({
          success:"false",
          msg: err
        })
      }break

    default:
      res.status(404)
      break
  }
}