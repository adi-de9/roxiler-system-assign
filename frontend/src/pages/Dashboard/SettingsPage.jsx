import { useState } from "react";
import { Eye, EyeOff, Key } from "lucide-react";
import { Validators } from "../../utils/Validatore";
import { updatePassword } from "../../utils/auth";
import { useAuth } from "../../context/AuthContext";

function SettingsPage() {
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewPass, setViewPass] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!Validators.password(pass)) {
      setMessage(
        "Error: Password must be 8-16 chars, with 1 uppercase & 1 special char."
      );
      return;
    }

    setLoading(true);
    try {
      const res = await updatePassword({ newPassword: pass });

      if (res.success) {
        setMessage("Success: Password updated successfully");
        setPass("");
      }
    } catch (error) {
      setMessage("Error: Failed to update password");
    } finally {
      setLoading(false);
    }
    setPass("");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Key size={20} className="text-indigo-600" /> Update Password
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="flex flex-col gap-1 relative">
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type={viewPass ? "text" : "password"}
            placeholder="New secure password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            className=" w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
          <span className="text-gray-500 text-xs">
            8-16 chars, 1 Uppercase, 1 Special
          </span>
          <button
            type="button"
            onClick={() => setViewPass(!viewPass)}
            className="text-gray-300 hover:text-gray-400 cursor-pointer mt-1 absolute right-3 top-1/2 -translate-y-1/2 ml-2"
          >
            {viewPass ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        {message && (
          <div
            className={`text-xs p-2 rounded ${
              message.includes("Success")
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default SettingsPage;
