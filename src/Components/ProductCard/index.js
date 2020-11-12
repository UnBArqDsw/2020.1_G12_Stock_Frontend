import React, { useEffect, useContext, useState  } from 'react';
import { Modal, Collapse, CardBody, Card, CardText, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './styles.css';
import { DeviceContext } from '../../Contexts/DeviceContext';
import DecreaseService from '../../Services/DecreaseService';
import CollaboratorService from '../../Services/CollaboratorService';

const ProductCard = ({ products }) => {
  const { isMobile } = useContext(DeviceContext);
  const [cardSelected, setCardSelected] = useState('');
  const [decreaseProductModalOpen, setDecreaseProductModalOpen] = useState(false);
  const [decreaseLotModalOpen, setDecreaseLotModalOpen] = useState(false);
  const [productId, setProductId] = useState('');
  const [lotId, setLotId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [product, setProduct] = useState({});
  const [lot, setLot] = useState({});
  const [collaborator, setCollaborator] = useState({});
  const [collaborators, setCollaborators] = useState({});
  const [showLotInfo, setShowLotInfo] = useState(false);
  const [confirmDecreaseLotModalOpen, setConfirmDecreaseLotModalOpen] = useState(false);
  const toggleDecreaseProductModal = () => {
    setDecreaseProductModalOpen(!decreaseProductModalOpen)
  };
  const toggleDecreaseLotModal = () => {
    setDecreaseLotModalOpen(!decreaseLotModalOpen)
    if(!decreaseLotModalOpen){
      setShowLotInfo(false);
    }
  };
  const toggleConfirmDecreaseLotModal = () =>{
    setConfirmDecreaseLotModalOpen(!confirmDecreaseLotModalOpen);
  }
  const loadCollaborators = async () => {
    const response = await CollaboratorService.getCollaborators();
    setCollaborators(response);
  }
  useEffect(() => {loadCollaborators()}, []);
  const toggle = (idCard) => {
    setCardSelected('');
    setProductId('');
    setProductSelected({});
    setLot({});
    setProduct({});
    if (cardSelected !== idCard) {
      setProductId(idCard);
      setCardSelected(idCard);
      setProductSelected(products.filter((element) => element.idProduct == idCard));
    }
    setQuantity('');
  }
  const setLotSelected = (l) => {
    if(!l.target.value){
      setShowLotInfo(false);
    }else{
      let find_lot = product.lots.filter((lot) => lot.idLot == l.target.value)[0];
      setLot(find_lot);
      setLotId(find_lot.idLot);
      setCollaborator(collaborators.filter((c) => c.idCollaborator == find_lot.idCollaborator)[0]);
      setShowLotInfo(true);
    }
  }
  const decreaseProduct = async () => {
    try {
      const { errorData, status } = await DecreaseService.decreaseProduct(productId, quantity);
      if (status === 200) {
        toggleDecreaseProductModal();
        alert('Baixa do produto concluída com sucesso!');
      } else {
        toggleDecreaseProductModal();
        alert(`Falha ao dar baixa em produto: ${errorData.data.details}`);
      }
    } catch (error) {
      alert(`Falha ao dar baixa em produto: ${error.data}`);
    }
  }
  const decreaseLot = async () => {
    try {
      const { errorData, status } = await DecreaseService.decreaseLot(lotId, quantity);
      if (status === 200) {
        toggleConfirmDecreaseLotModal();
        toggleDecreaseLotModal();
        alert('Produto removido com sucesso!');
      } else {
        toggleConfirmDecreaseLotModal();
        alert(`Falha ao remover produto: ${errorData.data.details}`);
      }
    } catch (error) {
      alert(`Falha ao remover produto: ${error.data}`);
    }
  }
  const setProductSelected = (p) => {
    if (p) {
      if (p.length > 0) {
        if (p[0] != product) {
          setProduct(p[0]);
        }
      }
    }
  }

  const renderDecreseProductModal = () => (
    <Modal toggle={toggleDecreaseProductModal} isOpen={decreaseProductModalOpen}>
      <ModalHeader toggle={toggleDecreaseProductModal}>
        Dar baixa em produto
      </ModalHeader>
      <ModalBody>
        Tem certeza que deseja dar baixa de {quantity} unidade(s) do produto {product.name + ' ' + product.unitQtd + ' ' + product.unitMeasure}(s)?
      </ModalBody>
      <ModalFooter>
        <button type="button" onClick={decreaseProduct}>
          Sim
        </button>
        <button type="button" onClick={toggleDecreaseProductModal}>
          Não
        </button>
      </ModalFooter>
    </Modal>
  );

  const renderConfirmDecreaseLotModal = () => (
    <Modal toggle={toggleConfirmDecreaseLotModal} isOpen={confirmDecreaseLotModalOpen}>
      <ModalHeader toggle={toggleConfirmDecreaseLotModal}>
        Dar baixa em produto
      </ModalHeader>
      <ModalBody>
  Tem certeza que deseja remover {quantity} unidade(s) do produto {product.name + ' ' + product.unitQtd + ' ' + product.unitMeasure}(s) do lote {lot.description} inserido pelo colaborador {collaborator.name}?
      </ModalBody>
      <ModalFooter>
        <button type="button" onClick={decreaseLot}>
          Sim
        </button>
        <button type="button" onClick={toggleConfirmDecreaseLotModal}>
          Não
        </button>
      </ModalFooter>
    </Modal>
  );

  const lotInfo = () => (
    <div className="lot-info">
      <h5>Informações sobre esse lote:</h5>
      <div><label>Data de adição:</label><span> {new Date(lot?.entryDate).toLocaleDateString()}</span></div>
      <div><label>Quantidade disponível:</label><span> {lot?.productQty}</span></div>
      <div><label>Preço de compra:</label><span> R${lot?.purchasePrice}</span></div>
      <div><label>Responsável:</label><span>{collaborator?.name}</span></div>
      <div class="div-input"><label>Quantidade a ser removida:</label><span><input className="input-quantity" type="number" defaultValue='' onChange={(e) => setQuantity(e.target.value)}></input></span></div>
    </div>
  );
  const decreaseLotButton = () => (
    <button onClick={toggleConfirmDecreaseLotModal} type="button">Remover</button>
  );
  const renderDecreaseLotModal = () => (
    <Modal toggle={toggleDecreaseLotModal} isOpen={decreaseLotModalOpen}>
      <ModalHeader toggle={toggleDecreaseLotModal}> Remover produto com defeito</ModalHeader>
      <ModalBody>
        <p>De qual lote deseja remover?</p>
        <select className="select-alone" type="select" onChange={setLotSelected}>
          <option value="" />
          {product?.lots?.filter((lot) => lot.productQty > 0).map((lot) => {
            return (
              <option key={lot.idLot} value={lot.idLot}>
                {lot.description}
              </option>
            );
          })}
        </select>
        {showLotInfo?lotInfo():null}
      </ModalBody>
      <ModalFooter>
        {showLotInfo?decreaseLotButton():null}
        <p>
          A remoção do produto não será contabilizada como venda, apenas remoção por motivo específico de indisponibilidade do produto.
        </p>
      </ModalFooter>
    </Modal>
  );
  
  return (
    <div>
      <div className="list-container">
        <Card>
          <CardBody className="product-header">
            <div>
              <span>Nome</span>
            </div>
            <div>
              <span>{isMobile ? 'Qtd' : 'Quantidade'}</span>
            </div>
            <div>
              <span>Tamanho</span>
            </div>
            <div>
              <span>Lotes</span>
            </div>
          </CardBody>
        </Card>
        <div className="cards">
          {products?.map((product) => {
            return (
              <div>
                <Card>
                  <CardBody id={product.idProduct} onClick={(e) => toggle(e.target.id)} className="product-card">
                    <div id={product.idProduct} onClick={(e) => toggle(e.target.id)}>
                      <p id={product.idProduct} onClick={(e) => toggle(e.target.id)}>{product.name}</p>
                    </div>
                    <div id={product.idProduct} onClick={(e) => toggle(e.target.id)}>
                      <p id={product.idProduct} onClick={(e) => toggle(e.target.id)}>{product.quantity}</p>
                    </div>
                    <div id={product.idProduct} onClick={(e) => toggle(e.target.id)}>
                      <p id={product.idProduct} onClick={(e) => toggle(e.target.id)}>
                        {product.unitQtd + " " + product.unitMeasure}(s)
                      </p>
                    </div>
                    <div id={product.idProduct} onClick={(e) => toggle(e.target.id)}>
                      <p id={product.idProduct} onClick={(e) => toggle(e.target.id)}>{product.lots.filter((l) => l.productQty > 0).length}</p>
                    </div>
                  </CardBody>
                  <Collapse value={product.idProduct} isOpen={product.idProduct == cardSelected}>
                    <CardText>
                      <div className="product-options-container">
                        <div className="product-options">
                          <button onClick={toggleDecreaseProductModal} className="decrease-button" type="button">Dar baixa</button>
                          <label>Quantidade</label>
                          <input className="input-quantity" type="number" defaultValue='' onChange={(e) => setQuantity(e.target.value)}></input>
                        </div>
                        <div className="decrease-link">
                          <a onClick={toggleDecreaseLotModal}>Remover produto com defeito</a>
                        </div>
                      </div>
                    </CardText>
                  </Collapse>
                </Card>

              </div>
            );
          })}
        </div>
      </div>
      {renderDecreseProductModal()}
      {renderDecreaseLotModal()}
      {renderConfirmDecreaseLotModal()}
    </div>
  );
};
export default ProductCard;
