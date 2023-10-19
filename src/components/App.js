import { useState } from "react";
import ReviewList from "./ReviewList";
import mockitems from "../mock.json";

function App() {
  const [items, setItems] = useState(mockitems);
  const [order, setOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[order] - a[order]); // 별점순, 시간순

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleRemove = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  return (
    <div>
      <div>
        <button onClick={handleBestClick}>별점순</button>
        <button onClick={handleNewestClick}>최신순</button>
      </div>
      <ReviewList items={sortedItems} onRemove={handleRemove} />
    </div>
  );
}

export default App;
