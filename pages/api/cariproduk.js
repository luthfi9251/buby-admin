import mysqlQuery from'../../utils/db'



export default async function handler(req, res) {

  switch(req.method){
    case "POST":
      try{
        const { namaProduk,tipeProduk,durasi } = req.body
        
        let result
        if(tipeProduk === "ALL" && durasi === "ALL"){
            result = await mysqlQuery({
                query: "select * from view_produk where nama_produk = ?",
                values: [namaProduk]
            })
        }else if(tipeProduk === "ALL"){
            result = await mysqlQuery({
                query: "select * from view_produk where nama_produk = ? and durasi = ?",
                values: [namaProduk,durasi]
            })
        }else if(durasi === "ALL"){
            result = await mysqlQuery({
                query: "select * from view_produk where nama_produk = ? and tipe_produk = ?",
                values: [namaProduk,tipeProduk]
            })
        }else{
            result = await mysqlQuery({
                query: "select * from view_produk where nama_produk = ? and tipe_produk = ? and durasi = ?",
                values: [namaProduk,tipeProduk,durasi]
            })
        }

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