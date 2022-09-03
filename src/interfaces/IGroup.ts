import { v4 as uuid } from 'uuid';
import { ISentence } from "./ISentence";
export enum Prioprity {
    vi = "vi",
    en = "en"
}

export interface IGroup {
    id: string,
    name: string,
    description: string,
    sentences: ISentence[],
    priority: Prioprity,
    count: number,
    updatedAt: Date,
    createdAt: Date,
}

export default class Group implements  IGroup {
    id: string;
    name: string;
    description: string;
    sentences: ISentence[];
    priority: Prioprity;
    count: number;
    updatedAt: Date;
    createdAt: Date;

    constructor(name: string, description?: string) {
        this.id = uuid();
        this.name = name;
        this.description = description || "";
        this.sentences = [];
        this.priority = Prioprity.vi;
        this.count = 0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

}