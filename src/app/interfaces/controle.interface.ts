import { ClubeInterface } from "./clube.interface";

export interface ControleInterface {
    interval: any;
    fullTime: number;
    isStarted: boolean;
    clubeA: ClubeInterface;
    clubeB: ClubeInterface;
}
