import mysqlQuery from'../../utils/db'


export default async function handler(req, res) {

  switch(req.method){
    case "POST":
      try{
        const { id_produk,supplier,renew,harga } = req.body
        let idProdukSupp = supplier.toString() + id_produk + renew.slice(0,1)

        const result = await mysqlQuery({
            query: "insert into produk_supplier values(?,?,?,?,?)",
            values: [idProdukSupp,id_produk,supplier,renew,harga]
        })

        if(result.hasOwnProperty('error')){
          throw result.error.sqlMessage
        }

        res.status(200).json({
          success : "true",
          msg : `Berhasil menambahkan produk ${id_produk} pada supplier ${supplier}`,
          result : result
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

        if(nama==="initial"){
          const result = await mysqlQuery({
            query: "select distinct(nama_produk) from jenis_produk"
          })
          console.log(result)
          res.status(200).json({
              success : "true",
              data : result
          })
          return
        }


        const result = await mysqlQuery({
            query: "select nama_produk, tipe_produk,user_per_account, durasi,billing from jenis_produk where nama_produk=?",
            values: [nama]
        })
        res.status(200).json({
            success : "true",
            data : result
        })
      }catch(err){
        res.status(400).json({
          success:"false",
          msg: err
        })
      }break

    default:
      res.status(400)
      break
  }
}