import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addStore, getStores, getUsers } from "../../utils/adminApi";
import { Validators } from "../../utils/Validatore";
import { Plus, Search, Star } from "lucide-react";
import { Modal } from "../../utils/Model";
import { Input } from "../../utils/Input";
import StoreTable from "../../components/StoreTable";

function StorePage() {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formError, setFormError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [newStore, setNewStore] = useState({
    name: "",
    address: "",
    email: "",
    ownerId: "",
  });

  const { data: usersData, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 1, // 1 minute caching
    refetchOnWindowFocus: false,
  });

  const { data: storesData, isLoading: isStoresLoading } = useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
    staleTime: 1000 * 60 * 1, // 1 minute caching
    refetchOnWindowFocus: false,
  });

  const users = usersData?.users || [];
  const stores = storesData?.stores || [];
  const isLoading = isUsersLoading || isStoresLoading;

  const addStoreMutation = useMutation({
    mutationFn: (storeData) => addStore(storeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      setShowModal(false);
      setNewStore({ name: "", address: "", email: "", ownerId: "" });
    },
    onError: (error) => {
      console.error("Error adding store:", error);
      setFormError("Failed to add store. Please try again.");
    },
  });

  const handleAddStore = (e) => {
    e.preventDefault();
    setFormError("");

    if (newStore.name.length < 3) return setFormError("Store name too short.");
    if (!Validators.email(newStore.email))
      return setFormError("Invalid email address.");
    if (!Validators.address(newStore.address))
      return setFormError("Address cannot exceed 400 characters.");

    addStoreMutation.mutate({
      ...newStore,
      ownerId: parseInt(newStore.ownerId),
    });
  };

  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const owners = useMemo(() => {
    return users.filter((u) => u.role !== "ADMIN");
  }, [users]);

  const filteredStores = useMemo(() => {
    const lower = searchTerm.toLowerCase();

    // Filter
    let result = stores.filter(
      (store) =>
        store.name.toLowerCase().includes(lower) ||
        store.address.toLowerCase().includes(lower) ||
        store.email.toLowerCase().includes(lower)
    );

    // Sort
    if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        // Owner name sorting
        if (sortConfig.key === "owner") {
          valA = users.find((u) => u.id === a.ownerId)?.name || "";
          valB = users.find((u) => u.id === b.ownerId)?.name || "";
        }

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [stores, searchTerm, sortConfig, users]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-800">Store Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-white bg-indigo-500 hover:bg-indigo-600 btn"
        >
          <Plus size={18} /> Add Store
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-indigo-500"
          placeholder="Search stores by name, address, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <StoreTable
          stores={filteredStores}
          users={users}
          sortConfig={sortConfig}
          requestSort={requestSort}
          isLoading={isLoading}
        />
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Store"
      >
        {formError && (
          <div className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">
            {formError}
          </div>
        )}
        <form onSubmit={handleAddStore} className="space-y-4">
          <Input
            label="Store Name"
            value={newStore.name}
            onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
            required
          />
          <Input
            label="Address"
            value={newStore.address}
            onChange={(e) =>
              setNewStore({ ...newStore, address: e.target.value })
            }
            required
            helpText="Max 400 characters"
          />
          <Input
            label="Email"
            type="email"
            value={newStore.email}
            onChange={(e) =>
              setNewStore({ ...newStore, email: e.target.value })
            }
            required
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Store Owner
            </label>
            <select
              name="role"
              value={newStore.ownerId}
              onChange={(e) =>
                setNewStore({ ...newStore, ownerId: e.target.value })
              }
            >
              <option value="">Select Owner</option>
              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full btn text-white bg-indigo-500 hover:bg-indigo-600 mt-4"
            disabled={addStoreMutation.isPending}
          >
            {addStoreMutation.isPending ? "Creating..." : "Create Store"}
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default StorePage;
