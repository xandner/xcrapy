const { PrismaClient }=require("@prisma/client");
const database = new PrismaClient();

class Product{
    static async create_product(_product){
        // console.log(_product)
        try {
            await database.products.create({
              data: {
                log_id: _product.log_id,
                site_url: _product.site_url,
                product_name: _product.product_name,
                product_description: _product.product_description,
                product_link: _product.product_link,
                product_status: _product.product_status,
                product_price: _product.product_price,
                product_image: _product.product_image,
                product_category:_product.product_category,
              },
            });
        } catch (error) {
            console.log(error)
        }
    }
}
class Log {
  static async create_log(_log) {
    try {
      const log = await database.logs.create({
        data: {
          status: _log.status,
          site_url: _log.site_url,
          started: new Date(),
        },
      });
      return log;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  static async upsert_log(_log){
      try {
        const log=await database.logs.upsert({
            where:{
                id:_log.log_id
            },
            update:{
                status:"ended",
                ended:new Date(),
                products_count:_log.products_count
            },
            create:{
                site_url:_log.site_url,
                status:"ended",
                started:new Date(),
                ended: new Date()
            }
        })
        return log
    } catch (error) {
        console.log(error)
        return error
    }
  }
}

module.exports={
    Log,
    Product
}