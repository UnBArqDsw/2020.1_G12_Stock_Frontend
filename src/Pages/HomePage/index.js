/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Step1 from '../../assets/icons/step1.svg';
import Step2 from '../../assets/icons/step2.svg';
import Step3 from '../../assets/icons/step3.svg';
import './styles.css';

export default function HomePage() {
  return (
    <body>
      <div className="cover">
        <h1 className="cover-title">O controle em sua mão</h1>
        <span className="cover-text">Com o Stock, você acompanha seu fluxo de estoque em tempo real.</span>
      </div>
      <div className="steps">
        <h1 className="steps-title">Comece já com apenas 3 passos</h1>
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <img src={Step1} alt="Step1" />
            <div>
                <span>1. Cadastre sua empresa</span>
            </div>
            </div>
            <div class="col-sm">
              <img src={Step2} alt="Step2" />
            <div>
                <span>2. Acesse sua conta e adicione estoque e colaboradores</span>
            </div>
            </div>
            <div class="col-sm">
              <img src={Step3} alt="Step3" />
              <div>
                <span>3. Agora só fazer seu gerenciamento</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="requirements">
        <h1 className="requirements-title">Saiba como funciona</h1>
      </div>
    </body>
  );
}
