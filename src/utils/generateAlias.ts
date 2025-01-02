import { uid } from 'rand-token';
export const generateAlias =  (length: number = 8): string => {
    return uid(length);
}