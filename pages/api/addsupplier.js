import mysqlQuery from'../../utils/db'


export default async function handler(req, res) {

  switch(req.method){
    case "POST":
      try{
        const { nama,grupwa,namaAdmin,noWaAdmin,idTwitter } = req.body
        const result = await mysqlQuery({
          query: "insert into supplier(nama_supplier, nama_grup, nama_admin, no_wa_admin, id_twitter) values(?,?,?,?,?)",
          values: [nama,grupwa,namaAdmin,noWaAdmin,idTwitter]
        })

        if(result.hasOwnProperty('error')){
          throw result.error.sqlMessage
        }

        res.status(200).json({
          success : "true",
          msg : `Berhasil menambahkan supplier ${nama}`,
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
          query: "select * from supplier"
        })

        if(result.hasOwnProperty('error')){
          throw result.error.sqlMessage
        }
        
        if(result.length === 0){
          res.status(200).json({
            success : "true",
            msg : "Succes get",
            data : {
              head: [],
              value : [[]]
            }
          })
          return
        }

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
        res.status(400).json({
          success:"false",
          msg: err
        })
      }break

    default:
      res.status(404)
      break
  }
}