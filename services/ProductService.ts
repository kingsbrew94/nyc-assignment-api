import { Init } from "../annotations";
import ProductDao from "../dao/ProductDao";
import { IProductDto } from "../dto";
import { ValidationDto } from "../dto/ValidationDto";
import { Validator } from "../utils";

export default class ProductService {

    @Init
    private productDao!: ProductDao;

    public async getAllProducts(): Promise<Array<IProductDto>> {
        return await this.productDao.findAllProducts();
    }

    public async getProductById(id: string): Promise<IProductDto> {
        return await this.productDao.findProductById(id);
    }



    public async deleteProductById(id: string): Promise<boolean> {
        return await this.productDao.deleteProductById(id);
    }

    public async updateProductById(product: IProductDto): Promise<ValidationDto> {
        const validation:ValidationDto = Object.create({state: true})
        product = Validator.trimData(product);
        if(!Validator.isEmpty(product.name) && !Validator.isGeneralName(product.name)) {
            validation.state = false;
            validation.message= "Please enter product name";
            return validation;
        }
        if(!Validator.isEmpty(product.price) && !Validator.isNumber(product.price)) {
            validation.state = false;
            validation.message= "Please enter product price";
            return validation;
        }
        if(!(await this.productDao.updateProduct(product))) {
            validation.state = false;
            validation.message= "Unable to update product";
            return validation;
        }
        return validation;
    }

    public async productionExistsByName(name: string): Promise<boolean> {
        return this.productDao.productExists(name);
    }
    public async addProduct(product: IProductDto): Promise<ValidationDto> {
        const validation:ValidationDto = Object.create({state: true})
        product = Validator.trimData(product);
        
        if(Validator.isEmpty(product.name) || !Validator.isGeneralName(product.name)) {
            validation.state = false;
            validation.message= "Please enter product name";
            return validation;
        }
        if(Validator.isEmpty(product.price) || !Validator.isNumber(product.price)) {
            validation.state = false;
            validation.message= "Please enter product price";
            return validation;
        }
        if(Validator.isEmpty(product.description)) {
            validation.state = false;
            validation.message= "Please enter product description";
            return validation;
        }
        if(!(await this.productDao.addProduct(product))) {
            validation.state = false;
            validation.message= "Unable to add product";
            return validation;
        }
        return validation;
    }
}