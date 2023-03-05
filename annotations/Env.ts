import { EnvironmentVariables } from "../utils";

/**
 * @author Kingsley Baah Brew <kingsleybrew@gmail.com>
 * @params key | string
 * @todo This decorator accepts an object key to read data from the app.properties.json
 */
export default function AppProps(key: string) {
    return function(target: any, propertyKey: any) {
        target[propertyKey] = EnvironmentVariables.get(key);
    };
}

