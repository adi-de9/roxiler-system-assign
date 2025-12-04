import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, Plus, Search, Star } from "lucide-react";
import { Validators } from "../../utils/Validatore";
import { addUser, getStores, getUsers } from "../../utils/adminApi";
import { TableHeader } from "../../utils/TableHeader";
import { Modal } from "../../utils/Model";
import { Input } from "../../utils/Input";
import Loader from "../../components/Loader";

function UsersPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
    address: "",
  });
  const [formError, setFormError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const { data: usersData, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { data: storesData, isLoading: isStoresLoading } = useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
  });

  const users = usersData?.users || [];
  const stores = storesData?.stores || [];
  const isLoading = isUsersLoading || isStoresLoading;

  const addUserMutation = useMutation({
    mutationFn: (userData) => addUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setShowModal(false);
      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "USER",
        address: "",
      });
    },
    onError: (error) => {
      console.error("Error adding user:", error);
      setFormError("Failed to add user. Please try again.");
    },
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    setFormError("");
    console.log(newUser);

    if (!Validators.name(newUser.name))
      return setFormError("Name must be between 20 and 60 characters.");
    if (!Validators.email(newUser.email))
      return setFormError("Invalid email address.");
    if (!Validators.address(newUser.address))
      return setFormError("Address cannot exceed 400 characters.");
    if (!Validators.password(newUser.password))
      return setFormError(
        "Password must be 8-16 chars, with 1 uppercase & 1 special char."
      );

    addUserMutation.mutate(newUser);
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  let filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.address.toLowerCase().includes(term);
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (sortConfig.key) {
    filteredUsers.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const getOwnerRating = (ownerId) => {
    const ownerStores = stores.filter((s) => s.ownerId === ownerId);
    if (ownerStores.length === 0) return "N/A";
    let total = 0,
      count = 0;
    ownerStores.forEach((s) => {
      total += s.rating * s.ratingCount;
      count += s.ratingCount;
    });
    return count > 0 ? (total / count).toFixed(1) : "0.0";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-800">User Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="btn bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Plus size={18} /> Add User
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-indigo-500"
            placeholder="Search by name, email, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 bg-white outline-none"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="OWNER">Store Owner</option>
          <option value="USER">User</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <TableHeader
                    label="Full Name"
                    sortKey="name"
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
                    label="Role"
                    sortKey="role"
                    currentSort={sortConfig}
                    onSort={requestSort}
                  />
                  <TableHeader
                    label="Address"
                    sortKey="address"
                    currentSort={sortConfig}
                    onSort={requestSort}
                  />
                  <th className="p-4 font-semibold text-gray-600 text-sm text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50"
                  >
                    <td className="p-4 text-gray-800 font-medium">{user.name}</td>
                    <td className="p-4 text-gray-600">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold
                        ${
                          user.role === "ADMIN"
                            ? "bg-purple-100 text-purple-700"
                            : user.role === "OWNER"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-sm">{user.address}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setDetailsModal(user)}
                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New User"
      >
        {formError && (
          <div className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">
            {formError}
          </div>
        )}
        <form onSubmit={handleAddUser} className="space-y-4">
          <Input
            label="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
            helpText="20-60 characters"
          />
          <Input
            label="Email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <Input
            label="Password"
            type="text"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            required
            helpText="8-16 chars, 1 Uppercase, 1 Special"
          />
          <Input
            label="Address"
            value={newUser.address}
            onChange={(e) =>
              setNewUser({ ...newUser, address: e.target.value })
            }
            required
            helpText="Max 400 characters"
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="USER">Normal User</option>
              <option value="OWNER">Store Owner</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="w-full btn mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={addUserMutation.isPending}
          >
            {addUserMutation.isPending ? "Creating..." : "Create User"}
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={!!detailsModal}
        onClose={() => setDetailsModal(null)}
        title="User Details"
      >
        {detailsModal && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
                {detailsModal.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{detailsModal.name}</h3>
                <p className="text-sm text-gray-500">{detailsModal.role}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Email
                </label>
                <p className="text-gray-800">{detailsModal.email}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Address
                </label>
                <p className="text-gray-800">{detailsModal.address}</p>
              </div>
              {detailsModal.role === "OWNER" && (
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <label className="text-xs font-bold text-yellow-700 uppercase">
                    Owner Rating
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-bold text-gray-800">
                      {getOwnerRating(detailsModal.id)}
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
    </div>
  );
};

export default UsersPage;
