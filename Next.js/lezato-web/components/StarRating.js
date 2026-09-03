import styles from "@/styles/scss/theme/StarRating.module.css";

function StarRating({ rating }) {
  return (
    <div className="d-flex align-items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${styles.star} ${star <= rating ? styles.starFilled : styles.starEmpty}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;