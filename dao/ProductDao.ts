import { IProductDto } from "../dto";
import Product from "../models/Products";
import { Validator } from "../utils";

export default class ProductDao {

    public async findAllProducts(): Promise<Array<IProductDto>> {
        return await Product.getModel().findAll();
    }

    public async findProductById(id: string): Promise<IProductDto> {
        return await Product.getModel().findByPk(id);
    }

    public async updateProduct(product: any): Promise<boolean> {
        let flag = false;
        const data: any = await this.findProductById(product.id);
        Object.keys(product).forEach((key: string) => { 
            if(Validator.isEmpty(product[key])) {
                delete product[key];
            } else {
                data[key] = product[key];
            }
        });
        try {
            console.log(data.dataValues);
            await Product.getModel().update(data.dataValues,{
                where: {
                  id: product.id
                }
              });
            flag = true;
        } catch(e) {
            console.log(e);
        }
        return flag;
    }

    public async productExists(name: string): Promise<boolean> {
        let flag = false;
        try {
            const res = await Product.getModel().findAll({
                where: {name}
            });
            flag = res.length > 0;
        } catch(e) {
            console.log(e);
        }
        return flag;
    }

    public async deleteProductById(id: string): Promise<boolean> {
        let flag = false;
        try {
            await Product.getModel().destroy({
                where: {id}
            });
            flag = true;
        } catch(e) {
            console.log(e);
        }
        return flag;
    }

    public async addProduct(product: IProductDto): Promise<boolean> {
        let flag = false;
        try {
            if(product.id !== undefined || product.id !== null) {
                delete product.id;
            }
            await Product.getModel().create(product);
            flag = true;
        } catch(e) {
            console.log(e);
        }
        return flag;
    }
}