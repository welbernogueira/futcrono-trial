import "./Home.scss";
import { useEffect, useRef, useState } from "react";
import { TimerDisplay } from "../components/TimerDisplay";
import { ClubeModel } from "../models/clube.model";
import { ControleModel } from "../models/controle.model";
import { ControleInterface } from "../interfaces/controle.interface";
import { PercentDisplay } from "../components/PercentDisplay";
import { UseDocumentTitle } from "../hooks/UseDocumentTitleHook";
import React from "react";
import { ComponentToPrint } from "../components/ComponentToPrint";

import { toPng } from "html-to-image";

const clubeA = new ClubeModel();
const clubeB = new ClubeModel();

export const Home: React.FC<{}> = () => {
    UseDocumentTitle("FC Analytics - Posse de Bola");

    const [controle, setControle] = useState<ControleInterface>(
        new ControleModel(clubeA, clubeB)
    );

    const [canShare, setCanShare] = useState<boolean>("share" in navigator);

    const elementRef = useRef(null);

    useEffect(() => {
        if (controle.isStarted) {
            controle.interval = setInterval(() => {
                setControle((controle) => {
                    return {
                        ...controle,
                        fullTime: controle.fullTime + 1000,

                        clubeA: {
                            ...controle.clubeA,
                            possessionTime: controle.clubeA.isActive
                                ? controle.clubeA.possessionTime + 1000
                                : controle.clubeA.possessionTime,
                        },

                        clubeB: {
                            ...controle.clubeB,
                            possessionTime: controle.clubeB.isActive
                                ? controle.clubeB.possessionTime + 1000
                                : controle.clubeB.possessionTime,
                        },
                    };
                });
            }, 1000);
        } else {
            clearInterval(controle.interval);
        }
        return () => {
            clearInterval(controle.interval);
        };
    }, [controle]);

    const handleClickA = () => {
        start();
        setControle((controle) => {
            return {
                ...controle,
                clubeA: {
                    ...controle.clubeA,
                    isActive: !controle.clubeA.isActive,
                },
                clubeB: {
                    ...controle.clubeB,
                    isActive: false,
                },
            };
        });
    };

    const handleClickB = () => {
        start();
        setControle((controle) => {
            return {
                ...controle,
                clubeB: {
                    ...controle.clubeB,
                    isActive: !controle.clubeB.isActive,
                },
                clubeA: {
                    ...controle.clubeA,
                    isActive: false,
                },
            };
        });
    };

    const start = () => {
        if (!controle.isStarted) {
            setControle((controle) => {
                return {
                    ...controle,
                    isStarted: true,
                };
            });
        }
    };

    const stopAll = () => {
        if (controle.isStarted) {
            setControle((controle) => {
                return {
                    ...controle,
                    isStarted: false,
                    clubeB: {
                        ...controle.clubeB,
                        isActive: false,
                    },
                    clubeA: {
                        ...controle.clubeA,
                        isActive: false,
                    },
                };
            });
        }
    };

    const share = () => {
        if (canShare) {
            toPng(elementRef.current as any, { cacheBust: false })
                .then(async (base64url) => {
                    const filename = "FC Analytics";
                    const blob = await (await fetch(base64url)).blob();
                    const file = new File([blob], `${filename}.png`, { type: blob.type });

                    navigator
                        .share({
                            title: `Detalhes ${filename}`,
                            text: filename,
                            files: [file],
                        })
                        .then(() => {
                            console.log("Compartilhado com sucesso!");
                        })
                        .catch((erro) => {
                            console.error("Erro ao compartilhar:", erro);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });

            /*  const result: ResultInterface = {
                                         step: 1,
                                         fullTime: controle.fullTime,
                                         posseTimeA: `${(
                                             (100 * controle.clubeA.possessionTime) /
                                             controle.fullTime
                                         ).toFixed(0)}%`,
                                         posseTimeB: `${(
                                             (100 * controle.clubeB.possessionTime) /
                                             controle.fullTime
                                         ).toFixed(0)}%`,
                                         posseFora: `${(
                                             controle.fullTime -
                                             (controle.clubeA.possessionTime + controle.clubeB.possessionTime)
                                         ).toFixed(0)}%`,
                                     };
                                      */
        } else {
            alert('Ocorreu uma falha!');
        }
    };

    return (
        <>
            <React.Fragment>
                <ComponentToPrint ref={elementRef} controle={controle} />
            </React.Fragment>
            <nav
                className="navbar navbar-expand-lg bg-black fixed-top d-block"
                data-bs-theme="dark"
            >
                <div className="container-fluid px-3">
                    <a className="navbar-brand">
                        <img
                            className="d-block"
                            src={process.env.PUBLIC_URL + "/logo192.png"}
                            alt="Logo"
                            width="40"
                            height="40"
                        />
                    </a>
                    <div className="navbar-brand fs-2">
                        <button
                            className="btn btn-warning btn-controle me-2 rounded-circle"
                            disabled={!controle.isStarted}
                            onClick={stopAll}
                        >
                            <i
                                className={`fa-regular fw-semibold ${controle.isStarted ? "fa-circle-pause" : "fa-circle-play"
                                    }`}
                            ></i>
                        </button>
                        <TimerDisplay label={"G"} time={controle.fullTime} />
                        <span> - </span>
                        <TimerDisplay
                            label={"Fora"}
                            time={
                                controle.fullTime -
                                (controle.clubeA.possessionTime +
                                    controle.clubeB.possessionTime)
                            }
                        />
                        <span className="ms-2">
                            <PercentDisplay
                                possessionTime={
                                    controle.fullTime -
                                    (controle.clubeA.possessionTime +
                                        controle.clubeB.possessionTime)
                                }
                                fullTime={controle.fullTime}
                            />
                        </span>
                    </div>

                    {/* <button
                        className="navbar-toggler border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbar"
                        aria-controls="navbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button> */}

                    <div className="collapse_ navbar-collapse_" id="navbar">
                        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                            {/* <li className="nav-item mx-2">
                                <a className="nav-link text-capitalize">home</a>
                            </li> */}
                            <li className="nav-item mx-2">
                                <button
                                    className="btn btn-outline text-white text-decoration-none d-flex justify-content-center align-items-center"
                                    disabled={!(canShare && controle.fullTime > 0)}
                                    onClick={share}
                                >
                                    <i className="fa-solid fa-share ms-2 fs-3 text-warning"></i>
                                </button>
                            </li>
                        </ul>
                        <form className="d-flex" role="search"></form>
                    </div>
                </div>
            </nav>

            <div className="container-fluid vh-100 min-vh-100 -mt-h-navbar overflow-hidden p-0 m-0">
                <div className="row h-100 overflow-hidden d-flex justify-content-center align-items-center m-0 p-2">
                    <div className="col-12 col-sm-6  h-100 p-2">
                        <div className="card w-100 h-100 border-0 d-flex justify-content-center align-items-center bg-primary">
                            <button
                                type="button"
                                onClick={handleClickA}
                                className={`btn btn-link btn-action text-decoration-none text-white border-0 ${controle.clubeA.isActive ? "pulse" : ""
                                    } bg-primary`}
                                style={{
                                    background: `conic-gradient(var(--bs-primary) ${((100 * controle.clubeA.possessionTime) /
                                        controle.fullTime) *
                                        3.6
                                        }deg, var(--bs-dark) 0deg)`,
                                }}
                            >
                                <div className="position-relative">
                                    <span className="display-6 text-semibold d-block lh-1 text-primary">
                                        Serra Branca
                                    </span>
                                    <span className="text-primary fs-5">E. C.</span>
                                    <h4 className="display-4 m-0">
                                        <TimerDisplay time={controle.clubeA.possessionTime} />
                                    </h4>
                                    <span className="display-6">
                                        <PercentDisplay
                                            possessionTime={controle.clubeA.possessionTime}
                                            fullTime={controle.fullTime}
                                        />
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6  h-100 p-2">
                        <div className="card w-100 h-100 border-0 d-flex justify-content-center align-items-center bg-secondary">
                            <button
                                type="button"
                                onClick={handleClickB}
                                className={`btn btn-link btn-action text-decoration-none text-white border-0 ${controle.clubeB.isActive ? "pulse" : ""
                                    } bg-secondary`}
                                style={{
                                    background: `conic-gradient(var(--bs-secondary) ${((100 * controle.clubeB.possessionTime) /
                                        controle.fullTime) *
                                        3.6
                                        }deg, var(--bs-dark) 0deg)`,
                                }}
                            >
                                <div className="position-relative">
                                    <span className="display-6 text-semibold d-block lh-1 text-secondary">
                                        Souza
                                    </span>
                                    <span className="text-secondary fs-5">E. C.</span>
                                    <h4 className="display-4 m-0">
                                        <TimerDisplay time={controle.clubeB.possessionTime} />
                                    </h4>
                                    <span className="display-6">
                                        <PercentDisplay
                                            possessionTime={controle.clubeB.possessionTime}
                                            fullTime={controle.fullTime}
                                        />
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
