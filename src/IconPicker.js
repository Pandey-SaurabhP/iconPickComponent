import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import { IconContext } from 'react-icons';
import './IconPicker.css';

const IconPicker = ({
    rowsInOnePage = 4,
    columnsInOnePage = 5,
    iconHeight = 60,
    iconWidth = 60,
    pickerHeight = 500,
    pickerWidth = 500,
    onSelectIcon,
}) => {
    const icons = Object.keys(FiIcons);
    const iconsPerPage = rowsInOnePage * columnsInOnePage;
    const [currentPage, setCurrentPage] = useState(0);

    const changePage = (direction) => {
        setCurrentPage(prevPage => {
            const nextPage = direction === 'next' ? prevPage + 1 : prevPage - 1;
            return nextPage >= 0 && nextPage * iconsPerPage < icons.length ? nextPage : prevPage;
        });
    };

    const selectIcon = (icon) => {
        onSelectIcon(icon);
    };

    return (
        <div className="iconPickerModal" style={{ width: pickerWidth, height: pickerHeight }}>
            <div className="iconPickerHeader">
                <h4>Select an Icon</h4>
                <button onClick={() => onSelectIcon(null)}>✕</button>
            </div>
            <div className="iconPickerGrid" style={{
                gridTemplateRows: `repeat(${rowsInOnePage}, minmax(0, 1fr))`,
                gridTemplateColumns: `repeat(${columnsInOnePage}, minmax(0, 1fr))`
            }}>
                {icons.slice(currentPage * iconsPerPage, (currentPage + 1) * iconsPerPage).map((icon, index) => (
                    <div key={index} onClick={() => selectIcon(icon)}>
                        <IconContext.Provider value={{ size: iconHeight, color: 'white' }}>
                            {React.createElement(FiIcons[icon])}
                        </IconContext.Provider>
                    </div>
                ))}
            </div>
            <div className="iconPickerFooter">
                <button onClick={() => changePage('prev')} disabled={currentPage === 0}>Previous</button>
                <span>Page {currentPage + 1} of {Math.ceil(icons.length / iconsPerPage)}</span>
                <button onClick={() => changePage('next')} disabled={(currentPage + 1) * iconsPerPage >= icons.length}>Next</button>
            </div>
        </div>
    );
};

export default IconPicker;
