import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import IconPicker from './IconPicker';
import './App.css';

const App = () => {
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const handleIconSelect = (icon) => {
        setSelectedIcon(icon);
        setIsPickerOpen(false);
    };

    return (
        <div className="appContainer">
            <div
                className="iconTrigger"
                onClick={() => setIsPickerOpen(!isPickerOpen)}
            >
                {selectedIcon ? React.createElement(FiIcons[selectedIcon], { size: 60, color: 'white' }) : <span className="text-white">Select Icon</span>}
            </div>
            
            {isPickerOpen && (
                <IconPicker
                    rowsInOnePage={6}
                    columnsInOnePage={6}
                    iconHeight={40}
                    iconWidth={40}
                    pickerHeight={500}
                    pickerWidth={500}
                    onSelectIcon={handleIconSelect}
                />
            )}
        </div>
    );
};

export default App;
