import mysqlQuery from'../../utils/db'



export default async function handler(req, res) {

  switch(req.method){
    case "POST":
      try{
        const { namaProduk,tipeProduk,durasi,uac,billing } = req.body

        let queryMysql = `select * from view_produk where nama_produk = '${namaProduk}'`

        if(!(tipeProduk === "ALL")){
          queryMysql += ` and tipe_produk='${tipeProduk}'`
        }
        if(!(durasi === "ALL")){
          queryMysql += ` and durasi='${durasi}'`
        }
        if(!(uac === "ALL")){
          queryMysql += ` and user='${uac}'`
        }
        if(!(billing === "ALL")){
          queryMysql += ` and billing='${billing}'`
        }
        
        
        let result = await mysqlQuery({
          query: queryMysql
        })

        res.status(200).json({
            success : "true",
            data : result
        })
      }catch(err){
        res.status(404).json({
          success:"false",
          msg: err
        })
      }
      break

    case "GET":
      try{
        let { nama } = req.query

        const result = await mysqlQuery({
            query: "select nama_produk, tipe_produk,user_per_account, durasi from jenis_produk where nama_produk=?",
            values: [nama]
        })
        res.status(200).json({
            success : "true",
            data : result
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