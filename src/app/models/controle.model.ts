import { ClubeInterface } from "../interfaces/clube.interface";
import { ControleInterface } from "../interfaces/controle.interface";
import { ClubeModel } from "./clube.model";

export class ControleModel implements ControleInterface {
    interval: any;
    fullTime: number = 0;
    isStarted: boolean = false;
    clubeA: ClubeInterface;
    clubeB: ClubeInterface;

    constructor(clubeA: ClubeModel, clubeB: ClubeModel) {
        this.clubeA = clubeA;
        this.clubeB = clubeB;
    }
}