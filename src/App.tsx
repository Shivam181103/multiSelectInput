import  { useEffect, useState } from 'react'; 
import './App.css';
import MultiInput from './Components/MultiInput';
import { Item } from './types';

function App() {
  const [data, setData] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState< Item []>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const jsonData = await response.json();
        const users = jsonData.users.map((user :any) => ({id:user.id , name:user.firstName+ " "+ user.lastName})) 
        setData(users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (newSelectedItems: Item []) => {
    setSelectedItems(newSelectedItems);
  };
 
  return (
    <div>
      <h1>MultiInput Example</h1>
      <MultiInput
        items={data}
        selectedItems={selectedItems}
        onSelect={handleSelect}
        placeholder="Type to search users..."
        chipClassName="custom-chip"
        chipRemoveClassName="custom-chip-remove"
        itemListClassName="custom-item-list"
        listItemClassName="custom-list-item"
      />
    </div>
  );
}

export default App;
