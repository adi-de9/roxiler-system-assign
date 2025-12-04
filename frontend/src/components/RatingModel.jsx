import { Modal } from "../utils/Model";
import { StarRating } from "../utils/StarRating";

export default function RatingModal({
  isOpen,
  onClose,
  storeName,
  ratingForm,
  setRatingForm,
  onSubmit,
  isLoading,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Rate ${storeName}`}>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex flex-col items-center gap-2 py-4">
          <span className="text-sm text-gray-500">Tap stars to rate</span>

          <StarRating
            rating={ratingForm.rating}
            interactive
            onRate={(r) => setRatingForm({ ...ratingForm, rating: r })}
            size={32}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Your Review
          </label>

          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
            placeholder="Tell us about your experience..."
            value={ratingForm.review}
            onChange={(e) =>
              setRatingForm({ ...ratingForm, review: e.target.value })
            }
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg disabled:bg-gray-300"
          disabled={ratingForm.rating === 0 || isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </Modal>
  );
}
