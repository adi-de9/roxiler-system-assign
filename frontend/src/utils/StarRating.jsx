import { Star } from "lucide-react";
import { useState } from "react";

export const StarRating = ({ rating, interactive = false, onRate, size = 16 }) => {
  const stars = [1, 2, 3, 4, 5];
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {stars.map((star) => (
        <Star
          key={star}
          size={size}
          className={`${interactive ? "cursor-pointer" : ""} transition-colors`}
          fill={
            (interactive ? hover || rating : rating) >= star
              ? "#FBBF24"
              : "none"
          }
          color={
            (interactive ? hover || rating : rating) >= star
              ? "#FBBF24"
              : "#D1D5DB"
          }
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onRate(star)}
        />
      ))}
    </div>
  );
};
