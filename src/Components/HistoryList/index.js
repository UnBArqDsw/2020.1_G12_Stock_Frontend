import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
import './styles.css';


const HistoryCard = ({ historyData }) => {
    return (
        <div className="history-list-container">
            <Card>
                <CardBody className="history-header">
                    <div>
                        <span>Produto</span>
                    </div>
                    <div>
                        <span>Preço</span>
                    </div>
                    <div>
                        <span>Quantidade</span>
                    </div>
                    <div>
                        <span>Colaborador(a)</span>
                    </div>
                    <div>
                        <span>Valor total</span>
                    </div>
                </CardBody>
            </Card>
            <div className="cards">
                {historyData.map((data) => {
                    return (
                        <Card>
                            <CardBody className="history-card">
                                <div>
                                    <p>{data.idCollaborator}</p>
                                </div>
                                <div>
                                    <p>{data.idLot}</p>
                                </div>
                                <div>
                                    <p>
                                        {data.quantity}
                                    </p>
                                </div>
                                <div>
                                    <p>{data.quantity}</p>
                                </div>
                                <div>
                                    <p>{data.quantity}</p>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
export default HistoryCard;
