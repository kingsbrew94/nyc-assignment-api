import {Sequelize} from 'sequelize';
import { EnvironmentVariables } from '../utils';
/**
 * @author Kingsley Baah Brew <kingsleybrew@gmail.com>
 * @param target | any
 * @param propertyKey | any
 * @todo This decorator connects to mysql server when initiated and assigns the 
 *       property variable to the connection instance with a promise.
 */
export default function SqlConnect(target: any, propertyKey: any) {
    const conn: Sequelize = new Sequelize(
        EnvironmentVariables.get('mysql.database'),
        EnvironmentVariables.get('mysql.user'),
        EnvironmentVariables.get('mysql.password'),
        {
            host: EnvironmentVariables.get('mysql.hostname'),
            dialect: EnvironmentVariables.get('mysql.dialect')
        }
    );
    target[propertyKey] = conn;
}