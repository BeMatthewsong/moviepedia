import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import { getReviews } from "../api";
import ReviewForm from "./ReviewForm";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const sortedItems = items.sort((a, b) => b[order] - a[order]); // 별점순, 시간순

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleRemove = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getReviews(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const { reviews, paging } = result;
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]); // 비동기 state 문제 보완
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext); // 다음 아이템이 더 있는지?
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleSubmitSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <div>
      <ReviewForm onSubmitSuccess={handleSubmitSuccess} />
      <div>
        <button onClick={handleBestClick}>별점순</button>
        <button onClick={handleNewestClick}>최신순</button>
      </div>
      <ReviewList items={sortedItems} onRemove={handleRemove} />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
