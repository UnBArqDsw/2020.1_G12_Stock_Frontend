import React, { useState, useRef, useCallback } from 'react';

import LOCALES from './requirements';

import './styles.css';

const { options } = LOCALES;

export default function Requirements() {
  const [selectedItem, setSelectedItem] = useState(options[0]);
  const [showContent, setShowContent] = useState(true);
  const ref = useRef();

  const selectItem = (option) => {
    const isSelected = option.id === selectedItem.id;

    return isSelected;
  }

  const renderMenu = () => {
    return (
      <div className="menu-requirements">
        {options.map((option, index) => {
          const isSelected = selectItem(option);
          const handleOnClick = () => {
            if (option.id !== selectedItem.id) {
              setSelectedItem(option);
              setShowContent(false);
              setTimeout(() => {
                setShowContent(true);
              }, 10);
            }
          };

          return (
            <div
              className="item-requirements"
              key={index}
              style={
                isSelected
                  ? { fontWeight: 'bold', color: '#AC1C1C', 'text-decoration': 'underline' }
                  : {}
              }
              onClick={handleOnClick}
            >
              {option.name}
            </div>
          );
        })}
      </div>
    );
  };

  const renderContent = useCallback(() => {
    return (
      <div className="content-requirements" style={{ flexDirection: 'row' }}>
        <div className="info-requirements">
          <div className="title-requirements"> {selectedItem.title} </div>
          <div className="text-requirements"> {selectedItem.text} </div>
        </div>
        <div className="header-requirements">
          <img alt={selectedItem.name} className="img-requirements" src={selectedItem.image} />
        </div>
      </div>
    );
  }, [selectedItem]);

  return (
    <div ref={ref} className="requirements" id={LOCALES.id}>
      <div className="name-requirements"> {LOCALES.name} </div>
      <div className="tabs-requirements">
        {renderMenu()}
        {showContent && renderContent()}
      </div>
    </div>
  );
}
