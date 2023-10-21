import "../styles/ReviewList.css";
import Rating from "./Rating";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item, onRemove }) {
  const handleRemoveClick = () => onRemove(item.id);

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <Rating value={item.rating} />
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleRemoveClick}>삭제</button>
      </div>
    </div>
  );
}

function ReviewList({ items, onRemove }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <ReviewListItem item={item} onRemove={onRemove} />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;
