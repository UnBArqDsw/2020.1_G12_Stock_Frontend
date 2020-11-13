import React from 'react';
import { Card, CardBody } from 'reactstrap';
import moment from 'moment';
import './styles.css';


const HistoryCard = ({ data }) => {

    const calcTotalValue = (quantity, value) => {
        return quantity * value;
    }

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
                <p className="history-date">{moment(data.date).format('DD/MM/YYYY')}</p>
                <Card>
                    <CardBody className="history-card">
                        <div>
                            <p>{data.lot.product.name}</p>
                        </div>
                        <div>
                            <p>R$ {data.lot.product.salePrice}</p>
                        </div>
                        <div>
                            <p>
                                {data.quantity}
                            </p>
                        </div>
                        <div>
                            <p>{data.collaborator.name}</p>
                        </div>
                        <div>
                            <p>R$ {calcTotalValue(data.quantity, data.lot.product.salePrice)}</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
export default HistoryCard;
