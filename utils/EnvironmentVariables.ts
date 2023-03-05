import fs from 'fs';
import env from 'dotenv';
import getRootDirectory from './getRootDirectory';

/**
 * @author Kingsley Baah Brew <kingsleybrew@gmail.com>
 * @class AppProperties
 * @todo It has a static get method that can read app.properties.json data
 *       It behaves the same way as the decorator named @AppProps however, it is not a decorator
 */
export default class EnvironmentVariables {
    
    /**
     * @param key | string
     */
    static get(key: string) {
        try {
            const data: any = env.config().parsed;
            if(key in data) {
                return data[key];
            } 
            throw  `property '${key}' does not exist in .env`;
        } catch (err) {
            console.error(err);
        }
    }

}