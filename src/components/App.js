import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import { getReviews } from "../api";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const sortedItems = items.sort((a, b) => b[order] - a[order]); // 별점순, 시간순

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleRemove = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  const handleLoad = async (options) => {
    const { reviews } = await getReviews(options);
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems([...items, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleBestClick}>별점순</button>
        <button onClick={handleNewestClick}>최신순</button>
      </div>
      <ReviewList items={sortedItems} onRemove={handleRemove} />
      <button onClick={handleLoadMore}>더 보기</button>
    </div>
  );
}

export default App;
