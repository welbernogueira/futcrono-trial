import React from "react";
import { ControleInterface } from "../interfaces/controle.interface";

const formatTime = (time: number) => {
    return `${("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:${(
        "0" + Math.floor((time / 60000) % 60)
    ).slice(-2)}:${("0" + Math.floor((time / 1000) % 60)).slice(-2)}`;

    /*
          <span>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span> 
         */
};

const calc = (controle: ControleInterface, possessionTime: number) => {
    const percent = ((100 * possessionTime) / controle.fullTime).toFixed(0);
    return <>{percent !== "NaN" ? percent : 0}%</>;
};

export const ComponentToPrint = React.forwardRef(
    (props: { controle: ControleInterface }, ref: any) => (
        <div
            className="z-n1 position-absolute d-flex justify-content-center align-items-center p-5"
            ref={ref}
        >
            <div className="card border-0">
                <div className="card-header w-100">
                    <h5 className="card-title text-uppercase m-0">Informações cronometradas</h5>
                    {/* <span className="">Etapa: 1°</span> */}
                </div>
                <div className="card-body">

                    <h5 className="card-title text-uppercase m-0">Tempo de jogo: {formatTime(props.controle.fullTime) }</h5>
                    <hr></hr>

                    <table className="table table-dark table-striped">
                        <thead className="text-center">
                            <tr>
                                <th scope="col"></th>
                                <th scope="col" className="text-uppercase">Tempo de posse</th>
                                <th scope="col" className="text-uppercase">% de posse</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            <tr>
                                <td>Serra Branca E. C.</td>
                                <td>{formatTime(props.controle.clubeA.possessionTime)}</td>
                                <td>
                                    {calc(props.controle, props.controle.clubeA.possessionTime)}
                                </td>
                            </tr>
                            <tr>
                                <td>Souza E. C.</td>
                                <td>{formatTime(props.controle.clubeB.possessionTime)}</td>
                                <td>
                                    {calc(props.controle, props.controle.clubeB.possessionTime)}
                                </td>
                            </tr>
                            <tr>
                                <td>Posse fora</td>
                                <td>{formatTime(props.controle.fullTime - (props.controle.clubeA.possessionTime + props.controle.clubeB.possessionTime))}</td>
                                <td>
                                    {calc(props.controle, props.controle.fullTime - (props.controle.clubeA.possessionTime + props.controle.clubeB.possessionTime))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
);
