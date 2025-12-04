import { Star } from 'lucide-react';
import React from 'react'
import { Modal } from '../utils/Model';
import { getUserById } from '../utils/adminApi';
import { useQuery } from '@tanstack/react-query';
import Loader from './Loader';

function UserModel({ id, setDetailsModal }) {
    const { data: detailsModal, isLoading } = useQuery({
      queryKey: ["getUserById", id],
      queryFn: () => getUserById(id),
      enabled: !!id,
    });

  return (
    <Modal
      isOpen={!!detailsModal}
      onClose={() => setDetailsModal(null)}
      title="User Details"
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : detailsModal && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
              {detailsModal.user.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{detailsModal.user.name}</h3>
              <p className="text-sm text-gray-500">{detailsModal.user.role}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Email
              </label>
              <p className="text-gray-800">{detailsModal.user.email}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Address
              </label>
              <p className="text-gray-800">{detailsModal.user.address}</p>
            </div>
            {detailsModal.user.role === "OWNER" && (
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                <label className="text-xs font-bold text-yellow-700 uppercase">
                  Owner Rating
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold text-gray-800">
                    {detailsModal.average_rating || 0}
                  </span>
                  <Star
                    size={20}
                    className="text-yellow-400"
                    fill="currentColor"
                  />
                  <span className="text-xs text-gray-500">
                    (Avg across all stores)
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4">
            <button onClick={() => setDetailsModal(null)} className="w-full">
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default UserModel