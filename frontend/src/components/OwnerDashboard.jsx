import React from 'react'
import { useState } from 'react';
import { getOwnerStats } from './../utils/OwnerApi';
import { TableHeader } from '../utils/TableHeader';
import { Star } from 'lucide-react';
import { Card } from "../components/AdminDashboard";
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Store } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Loader from './Loader';

function OwnerDashboard() {
  const { user } = useAuth();
  // const [stats, setStats] = useState({ total_stores: 0, average_rating: 0, recent_ratings: [] });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const { data:stats, isLoading } = useQuery({
    queryKey: ["ownerStats"],
    queryFn: getOwnerStats,
    staleTime: 1000 * 60 * 1, // 1 minute caching
    refetchOnWindowFocus: false,
  });
  console.log(stats);
  

  // useEffect(() => {
  //   if(user) getOwnerStats().then(setStats);
  // }, [user]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  let sortedRatings = [...(stats?.recent_ratings || [])];
  if (sortConfig.key) {
    sortedRatings.sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">My Stores Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          title="My Stores"
          value={stats?.total_stores || 0}
          icon={Store}
          color="indigo"
        />
        <Card
          title="Avg Rating"
          value={stats?.average_rating || 0}
          icon={Star}
          color="yellow"
          subtext="Across all stores"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Ratings</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <Loader />
          ) : stats?.recent_ratings?.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No ratings yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <TableHeader
                      label="User"
                      sortKey="user_name"
                      currentSort={sortConfig}
                      onSort={requestSort}
                    />
                    <TableHeader
                      label="Store"
                      sortKey="store_name"
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
                      label="Date"
                      sortKey="date"
                      currentSort={sortConfig}
                      onSort={requestSort}
                    />
                    <th className="p-4 font-semibold text-gray-600 text-sm">
                      Review
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRatings.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50"
                    >
                      <td className="p-4 font-medium text-gray-800">
                        {r.user_name}
                      </td>
                      <td className="p-4 text-gray-600 text-sm">
                        {r.store_name}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-gray-700">
                            {r.rating}
                          </span>
                          <Star size={14} fill="#FBBF24" color="#FBBF24" />
                        </div>
                      </td>
                      <td className="p-4 text-gray-500 text-sm">{r.date}</td>
                      <td className="p-4 text-gray-600 text-sm italic max-w-xs truncate">
                        {r.review}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard