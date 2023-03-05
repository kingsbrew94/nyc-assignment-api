
export default class Validator {

    public static trimData(data: any): any {
        const keys = Object.keys(data);
        const trimmedData = Object.create({});
        keys.forEach((k: string) => {
            trimmedData[k] = typeof data[k] === "string" ? data[k].trim(): data[k];
        });
        return trimmedData;
    }

    public static isEmpty(data: any): boolean {
        let isEmptyString = data === null || data === undefined || (typeof data === 'undefined');
        if(typeof data === "string") {
            isEmptyString = isEmptyString || (data.trim() === '');
        }
        return isEmptyString;
    }

    public static stringEmpty(value: any): boolean {
        return value.toString().trim().length === 0;
    }

    public static isEmail(value: string): boolean  {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value);
    }

    public static isAlpha(value: string): boolean {
        const pattern = /^[A-Za-z\s]+$/;
        return pattern.test(value);
    }

    public static isName(value: string): boolean {
        const pattern = /^\s*[A-Za-z][a-zA-Z-.\s]+$/;
        return pattern.test(value);
    }

    public static isNumber(value: any): boolean {
        return !isNaN(value);
    }

    public static isGeneralName(value: string): boolean {
        const pattern = /^\s*[A-Za-z0-9][a-zA-Z-.\s0-9]+$/;
        return pattern.test(value);
    }

    public static isPhone(value: string): boolean {
        const pattern = /^(\+?\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/gm;
        return pattern.test(value);
    }
}