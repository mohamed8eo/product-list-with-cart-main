import Deserts from "./components/Deserts"
import Cart from "./components/Cart"
import { useState } from 'react'
import Confirm from "./components/Confirm";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [cartItems, setCartItems] = useState({});
  const [resetItem, setResetItem] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = (item) => {
    const quantityChange = item.quantity || 1;
    
    // Ensure counter never goes below 0
    setCounter(prev => Math.max(0, prev + quantityChange));

    setCartItems(prev => {
      const currentItem = prev[item.name];
      const newQuantity = (currentItem?.quantity || 0) + quantityChange;

      // If quantity becomes 0 or negative, or item is being reset, remove it
      if (newQuantity <= 0 || item.reset) {
        const newItems = { ...prev };
        delete newItems[item.name];
        return newItems;
      }

      // Otherwise update quantity
      return {
        ...prev,
        [item.name]: {
          ...item,
          image: item.image,  // Include the image data
          quantity: newQuantity
        }
      };
    });
  }

  const handleRemove = (itemName) => {
    setCounter(prev => prev - cartItems[itemName].quantity);
    setCartItems(prev => {
      const newItems = { ...prev };
      delete newItems[itemName];
      return newItems;
    });
    // Set the item name to be reset
    setResetItem(itemName);
    // Clear the reset flag after a short delay
    setTimeout(() => setResetItem(null), 100);
  }

  const handleRestart = () => {
    // Reset all states to initial values
    setCounter(0);
    setCartItems({});
    setShowConfirm(false);
    // Send special 'ALL' signal to reset all counters
    setResetItem('ALL');
    // Clear reset signal after a short delay
    setTimeout(() => setResetItem(null), 100);
  };

  return (
    <div className="container mx-auto md:px-0 lg:px-4 py-8 flex md:gap-4 lg:gap-8 flex-col sm:flex-row">
      <div className="flex-1 sm:px-0 px-5">
        <Deserts handleClick={handleClick} resetItem={resetItem} />
      </div>
      <div className="w-80">
        <Cart 
          counter={counter} 
          items={Object.values(cartItems)} 
          onRemove={handleRemove}
          onConfirm={() => setShowConfirm(true)}
        />
      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <Confirm 
            items={Object.values(cartItems)} 
            onRestart={handleRestart} 
          />
        </div>
      )}
    </div>
  );
}

export default App

// style to center it in the middle of the page
// height: 1162.480px;
// width: 1248px;
// display: flex
// ;
// justify-content: center;
// align-items: center;
