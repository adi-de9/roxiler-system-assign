import React from "react";
import {  Star } from "lucide-react";
import { TableHeader } from "../utils/TableHeader";
import Loader from './Loader';

function StoreTable({ stores, users, sortConfig, requestSort, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <TableHeader
              label="Store Name"
              sortKey="name"
              currentSort={sortConfig}
              onSort={requestSort}
            />
            <TableHeader
              label="Owner"
              sortKey="owner"
              currentSort={sortConfig}
              onSort={requestSort}
            />
            <TableHeader
              label="Email"
              sortKey="email"
              currentSort={sortConfig}
              onSort={requestSort}
            />
            <TableHeader
              label="Rating"
              sortKey="rating"
              currentSort={sortConfig}
              onSort={requestSort}
            />
            <TableHeader
              label="Address"
              sortKey="address"
              currentSort={sortConfig}
              onSort={requestSort}
            />
          </tr>
        </thead>

        <tbody>
          {stores.map((store) => {
            const owner = users.find((u) => u.id === store.ownerId);

            return (
              <tr
                key={store.id}
                className="border-b border-gray-50 hover:bg-gray-50/50"
              >
                <td className="p-4 font-medium text-gray-800">{store.name}</td>

                <td className="p-4 text-gray-600 text-sm">
                  {owner ? owner.name : "Unknown"}
                </td>

                <td className="p-4 text-gray-600 text-sm">{store.email}</td>

                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-gray-700">
                      {store.rating}
                    </span>
                    <Star size={14} fill="#FBBF24" color="#FBBF24" />
                    <span className="text-xs text-gray-400">
                      ({store.ratingCount})
                    </span>
                  </div>
                </td>

                <td className="p-4 text-gray-500 text-sm">{store.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StoreTable;
