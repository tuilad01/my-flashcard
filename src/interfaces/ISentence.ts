import { v4 as uuid } from 'uuid';

export interface ISentence {
    [key: string]: any,
    id: string,
    en: string,
    vi: string,
    state: number
}

export default class Sentence implements ISentence {
    [key: string]: any;
    id: string;
    en: string = "";
    vi: string = "";
    state: number = 0;

    constructor(vi?: string, en?: string) {
        this.id = uuid();
        this.vi = vi || "";
        this.en = en || "";
    }

}