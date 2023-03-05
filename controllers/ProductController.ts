import express from 'express';
import { ContextResponse, DELETE, GET, POST, PUT, Path, PathParam } from "typescript-rest";
import {ApiResponse, IProductDto} from '../dto';
import { Init } from '../annotations';
import ProductService from '../services/ProductService';
import { ResponseCode } from '../enums';

@Path('/nyc/api')
export class ProductController {

    @Init
    private productService!: ProductService;

    @Path('/products')
    @GET
    public async getProducts(@ContextResponse res: express.Response): Promise<ApiResponse<Array<IProductDto>>> {
        let response: Promise<ApiResponse<Array<IProductDto>>>;
        let apiResponse: ApiResponse<Array<IProductDto>> = new ApiResponse<Array<IProductDto>>();
        try {
            const products = await this.productService.getAllProducts();
            res.status(ResponseCode.SUCCESS);
            apiResponse.setStatus(ResponseCode.SUCCESS);
            apiResponse.setMessage(ResponseCode[ResponseCode.SUCCESS]);
            apiResponse.setData(products);
            response = Promise.resolve(apiResponse);
        } catch (err) {
            console.error(err);
            res.status(ResponseCode.INTERNAL_SERVER_ERROR);
            apiResponse.setStatus(ResponseCode.INTERNAL_SERVER_ERROR);
            apiResponse.setMessage(ResponseCode[ResponseCode.INTERNAL_SERVER_ERROR]);
            response = Promise.resolve(apiResponse);
        }
        return response;
    }

    @Path('/products')
    @POST
    public async addProducts(productDto: IProductDto,@ContextResponse res: express.Response): Promise<ApiResponse<any>> {
        let response: Promise<ApiResponse<any>>;
        let apiResponse: ApiResponse<any> = new ApiResponse<any>();
        try {
            const productExist = await this.productService.productionExistsByName(productDto.name);
            if (productExist === true) {
                res.status(ResponseCode.BAD_REQUEST);
                apiResponse.setStatus(ResponseCode.BAD_REQUEST);
                apiResponse.setMessage("Product name already exists");
                return Promise.resolve(apiResponse);
            }
            const validation = await this.productService.addProduct(productDto);
            if (validation.state === false) {
                res.status(ResponseCode.BAD_REQUEST);
                apiResponse.setStatus(ResponseCode.BAD_REQUEST);
                apiResponse.setMessage(validation.message);
                response = Promise.resolve(apiResponse);
            }else  {
                res.status(ResponseCode.SUCCESS);
                apiResponse.setStatus(ResponseCode.SUCCESS);
                apiResponse.setMessage(ResponseCode[ResponseCode.SUCCESS]);
                response = Promise.resolve(apiResponse);
            }
        } catch(err) {
            console.error(err);
            res.status(ResponseCode.INTERNAL_SERVER_ERROR);
            apiResponse.setStatus(ResponseCode.INTERNAL_SERVER_ERROR);
            apiResponse.setMessage(ResponseCode[ResponseCode.INTERNAL_SERVER_ERROR]);
            response = Promise.resolve(apiResponse);
        }
        return response;
    }

    @Path('/products/:id')
    @GET
    public async getProductsById(@PathParam('id') id: string, @ContextResponse res: express.Response): Promise<any> {
        let response: Promise<ApiResponse<IProductDto>>;
        let apiResponse: ApiResponse<IProductDto> = new ApiResponse<IProductDto>();
        try {
            const product = await this.productService.getProductById(id);
            res.status(ResponseCode.SUCCESS);
            apiResponse.setStatus(ResponseCode.SUCCESS);
            apiResponse.setMessage(ResponseCode[ResponseCode.SUCCESS]);
            apiResponse.setData(product);
            response = Promise.resolve(apiResponse);
        } catch (err) {
            console.error(err);
            res.status(ResponseCode.INTERNAL_SERVER_ERROR);
            apiResponse.setStatus(ResponseCode.INTERNAL_SERVER_ERROR);
            apiResponse.setMessage(ResponseCode[ResponseCode.INTERNAL_SERVER_ERROR]);
            response = Promise.resolve(apiResponse);
        }
        return response;
    }

    @Path('/products/:id')
    @PUT
    public async updateProductsById(productDto: IProductDto,@PathParam('id') id: string,@ContextResponse res: express.Response): Promise<ApiResponse<any>> {
        let response: Promise<ApiResponse<any>>;
        let apiResponse: ApiResponse<any> = new ApiResponse<any>();
        try {
            productDto.id = id;
            const productExist = await this.productService.productionExistsByName(productDto.name);
            const product = await this.productService.getProductById(id);
        if ((productExist === true) && (product.name.toUpperCase() !== productDto.name.toUpperCase())) {
                res.status(ResponseCode.BAD_REQUEST);
                apiResponse.setStatus(ResponseCode.BAD_REQUEST);
                apiResponse.setMessage("Product name already exists");
                return Promise.resolve(apiResponse);
            }
            const validation = await this.productService.updateProductById(productDto);
            if (validation.state === false) {
                res.status(ResponseCode.BAD_REQUEST);
                apiResponse.setStatus(ResponseCode.BAD_REQUEST);
                apiResponse.setMessage(validation.message);
                response = Promise.resolve(apiResponse);
            }else  {
                res.status(ResponseCode.SUCCESS);
                apiResponse.setStatus(ResponseCode.SUCCESS);
                apiResponse.setMessage(ResponseCode[ResponseCode.SUCCESS]);
                response = Promise.resolve(apiResponse);
            }
        } catch(err) {
            console.error(err);
            res.status(ResponseCode.INTERNAL_SERVER_ERROR);
            apiResponse.setStatus(ResponseCode.INTERNAL_SERVER_ERROR);
            apiResponse.setMessage(ResponseCode[ResponseCode.INTERNAL_SERVER_ERROR]);
            response = Promise.resolve(apiResponse);
        }
        return response;
    }

    @Path('/products/:id')
    @DELETE
    public async deleteProductsById(@PathParam('id') id: string,@ContextResponse res: express.Response): Promise<any> {
        let response: Promise<ApiResponse<any>>;
        let apiResponse: ApiResponse<any> = new ApiResponse<any>();
        try {
            const productDeleted = await this.productService.deleteProductById(id);
            if (productDeleted  === false) {
                res.status(ResponseCode.BAD_REQUEST);
                apiResponse.setStatus(ResponseCode.BAD_REQUEST);
                apiResponse.setMessage("Unable to delete product");
                response = Promise.resolve(apiResponse);
            }else  {
                res.status(ResponseCode.SUCCESS);
                apiResponse.setStatus(ResponseCode.SUCCESS);
                apiResponse.setMessage(ResponseCode[ResponseCode.SUCCESS]);
                response = Promise.resolve(apiResponse);
            }
        } catch(err) {
            console.error(err);
            res.status(ResponseCode.INTERNAL_SERVER_ERROR);
            apiResponse.setStatus(ResponseCode.INTERNAL_SERVER_ERROR);
            apiResponse.setMessage(ResponseCode[ResponseCode.INTERNAL_SERVER_ERROR]);
            response = Promise.resolve(apiResponse);
        }
        return response;
    }
}