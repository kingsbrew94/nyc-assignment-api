import { DataTypes, Sequelize } from "sequelize";
import { SqlConnect } from "../config";
import AppModel from "../annotations/AppModel";

@AppModel
export default class Product {

    @SqlConnect
    private sequel!: Sequelize;

    private static model: any;

    public static getModel(): any {

        return Product.model;
    }

    constructor() {
        Product.model = this.sequel.define('products', {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
              },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 0.0
            },
            description: {
                type: DataTypes.STRING,
            }
        });
        this.sequel.sync();
    }

}