import { ClubeInterface } from "../interfaces/clube.interface";

export class ClubeModel implements ClubeInterface {
    isActive: boolean = false;
    possessionTime: number = 0;
    constructor() { }
}