import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Star, Store } from "lucide-react";
import { getStoresForUser, rateStore } from "../utils/userApi";
import { StarRating } from "../utils/StarRating";
import RatingModal from "./RatingModel";
import Loader from "./Loader";

function UserDashboard() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const [ratingModal, setRatingModal] = useState({
    open: false,
    storeId: null,
    storeName: "",
  });

  const [ratingForm, setRatingForm] = useState({
    rating: 0,
    review: "",
  });

  // Load stores from backend using useQuery
  const { data: storesData, isLoading } = useQuery({
    queryKey: ["userStores"],
    queryFn: getStoresForUser,
    staleTime: 1000 * 60 * 1, // 1 minute caching
    refetchOnWindowFocus: false,
  });

  const stores = storesData?.stores || [];

  // Mutation for rating
  const rateMutation = useMutation({
    mutationFn: (data) => rateStore(data),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["userStores"] });
        setRatingModal((prev) => ({ ...prev, open: false }));
      }
    },
    onError: (error) => {
      console.error("Error rating store:", error);
    },
  });

  // OPEN MODAL
  const openRateModal = (store) => {
    setRatingForm({
      rating: store.user_rating || 0,
      review: store.user_review?.review || "",
    });

    setRatingModal({
      open: true,
      storeId: store.id,
      storeName: store.name,
    });
  };

  // SUBMIT RATING
  const submitRating = (e) => {
    e.preventDefault();
    rateMutation.mutate({
      storeId: ratingModal.storeId,
      rating: ratingForm.rating,
      review: ratingForm.review,
    });
  };

  // Search Filter
  const filteredStores = useMemo(() => {
    return stores.filter(
      (s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [stores, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Browse Stores</h1>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-indigo-500"
            placeholder="Search name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Store Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => {
          return (
            <div
              key={store.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Icon + Rating */}
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                  <Store size={24} />
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-yellow-700">
                    <span className="font-bold">
                      {store.average_rating || 0}
                    </span>
                    <Star size={12} fill="currentColor" />
                  </div>
                  <span className="text-xs text-gray-400 mt-1">
                    {store.rating_count || 0} reviews
                  </span>
                </div>
              </div>

              {/* Store Info */}
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {store.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4 grow">{store.address}</p>

              {/* USER'S RATING SECTION */}
              {store.user_rating ? (
                <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs font-semibold text-gray-600">
                      Your Rating
                    </p>
                    <button
                      className="text-xs text-indigo-600 font-semibold hover:underline"
                      onClick={() => openRateModal(store)}
                    >
                      Modify
                    </button>
                  </div>

                  <StarRating rating={store.user_rating} size={16} />

                  {store.user_review?.review ? (
                    <p className="text-xs text-gray-500 mt-1 italic">
                      "{store.user_review.review}"
                    </p>
                  ) : null}
                </div>
              ) : null}

              {/* RATE BUTTON */}
              <button
                className="w-full mt-auto btn bg-indigo-600 text-white hover:bg-indigo-700 font-semibold"
                onClick={() => openRateModal(store)}
              >
                {store.user_rating ? "Update Review" : "Rate Store"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={ratingModal.open}
        onClose={() => setRatingModal({ ...ratingModal, open: false })}
        storeName={ratingModal.storeName}
        ratingForm={ratingForm}
        setRatingForm={setRatingForm}
        onSubmit={submitRating}
        isLoading={rateMutation.isPending}
      />
    </div>
  );
}

export default UserDashboard;
