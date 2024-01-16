// MultiInput.tsx
import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react'; 
import { Item, MultiInputProps } from '../types';


const MultiInput: React.FC<MultiInputProps> = ({
  items,
  selectedItems,
  onSelect,
  placeholder = 'Type to search...',
  chipClassName = 'chip',
  chipRemoveClassName = 'chip-remove',
  itemListClassName = 'item-list',
  listItemClassName = 'list-item',
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && inputValue === '') {
      onSelect(selectedItems.slice(0, -1));
    }
  };

  const handleItemClick = (item: Item) => {
    const updatedSelectedItems = [...selectedItems, item];
    onSelect(updatedSelectedItems);
    setInputValue('');
  };

  const handleChipRemove = (index: number) => {
    const updatedSelectedItems = [...selectedItems];
    updatedSelectedItems.splice(index, 1);
    onSelect(updatedSelectedItems);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedItems]);

  return (
    <div className="chip-input">
      <div className={chipClassName}>
        <div className='selected-chips'>
            {selectedItems.map((item, index) => (
                <div key={index} onClick={() => handleChipRemove(index)}>
                {item.name} <span className={chipRemoveClassName}>×</span>
            </div>
            ))}
        </div>
        <input
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
        />
      </div>
      {inputValue && (
        <ul className={itemListClassName}>
          {items
            .filter((item) => !selectedItems.map(selectedItem => selectedItem.id).includes(item.id) && item.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((item, index) => (
              <li key={item.id} onClick={() => handleItemClick(item)} className={listItemClassName}>
                {item.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MultiInput;
