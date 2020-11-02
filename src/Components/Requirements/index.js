import React, {
    useState,
    useRef,
    useCallback,
} from "react";


import LOCALES from "./requirements";

import './styles.css';

const { options } = LOCALES;



export default function Requirements() {
    const [selectedItem, setSelectedItem] = useState(options[0]);
    const [showContent, setShowContent] = useState(true);
    const ref = useRef();


    const renderMenu = () => {
        return (
            <div className="menu-requirements">
                {options.map((option, index) => {
                    const isSelected = option.id === selectedItem.id;
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
                            style={isSelected ? { fontWeight: "bold" } : {}}
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
            <div
                className="content-requirements"
                style={{ flexDirection: "row" }}
            >
                <div className="title-requirements"> {selectedItem.title} </div>
                <div className="text-requirements"> {selectedItem.text} </div>
                <div className="header-requirements">
                    <div className="imgLoading-requirements">
                        <img
                            alt={selectedItem.name}
                            className="img-requirements"
                            src={selectedItem.image}
                        />
                    </div>
                </div>
            </div>
        );
    }, [selectedItem]);

    return (
        <div ref={ref} className="requirements" id={LOCALES.id}>
            <div className="title-requirements"> {LOCALES.name} </div>
            <div className="tabs-requirements">
                {renderMenu()}
                {showContent && renderContent()}
            </div>
        </div>
    );
}

