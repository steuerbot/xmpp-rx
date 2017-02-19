import {isNullOrUndefined} from 'util';
/**
 * Created by marcneumann on 18.02.17.
 */
export let checkField = <T>(data: any, key: string, invalid: T, message?: string) => {
    if (isNullOrUndefined(data) || isNullOrUndefined(data[key]) || data[key] == invalid) {
        throw new Error((message ? message + ' - ' : '') + key + ' is invalid');
    }
};