import React from 'react';
import { Card, CardBody } from 'reactstrap';
import './styles.css';


const HistoryCard = ({ data }) => {

    const calcTotalValue = (quantity, value) => {
        return quantity * value;
    }

    return (
        <div className="cards">
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
    );
};
export default HistoryCard;
