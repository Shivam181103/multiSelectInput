export  interface MultiInputProps {
    items: Item [];
    selectedItems:Item[];
    onSelect: (selectedItems:Item[]) => void;
    placeholder?: string;
    chipClassName?: string;
    chipRemoveClassName?: string;
    itemListClassName?: string;
    listItemClassName?: string;
  }
  
  export interface Item {
      id:string | number,
      name:string
  }