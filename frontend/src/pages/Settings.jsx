import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Settings = () => {

  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await api.put("/user/update", user);
      setUser(res.data.user);
      setEdit(false);
      toast.success("Profile updated");
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUser(prev => ({
      ...prev,
      profile_picture: URL.createObjectURL(file)
    }));

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.put("/user/update-profile-pic", formData);
      setUser(res.data.user);

    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveImage = async () => {
    try {
      const res = await api.delete("/user/remove-profile-pic");
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete("/user/delete-account");

      toast.success("Account deleted");

      localStorage.removeItem("token");
      localStorage.removeItem("email");

      navigate("/login");

    } catch (err) {
      toast.error("Failed to delete account");
    }
  };

  if (!user) return <div className="md:ml-56 p-4 sm:p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">

        {/* PROFILE */}
        <div className="bg-white rounded-lg sm:rounded-xl border p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold mb-4">Profile Picture</h2>

          <div className="flex flex-col sm:flex-row items-center gap-4">

            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              {user.profile_picture ? (
                <img src={user.profile_picture} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-lg font-semibold">
                  {user.first_name?.[0]}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">

              <label className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-blue-600 w-full sm:w-auto text-center">
                Change Photo
                <input type="file" onChange={handleImageChange} className="hidden" />
              </label>

              <button onClick={handleRemoveImage} className="text-sm text-gray-600 hover:text-gray-800">
                Remove
              </button>

            </div>

          </div>

          <p className="text-xs text-gray-400 mt-3">
            JPG, PNG up to 5MB
          </p>
        </div>

        {/* PERSONAL INFO */}
        <div className="bg-white rounded-lg sm:rounded-xl border p-4 sm:p-6 shadow-sm">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-6">
            <h2 className="text-base sm:text-lg font-semibold">Personal Information</h2>

            <button
              onClick={() => {
                setEdit(!edit);
                if (edit) fetchUser();
              }}
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              {edit ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="space-y-4 sm:space-y-5">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="text-xs sm:text-sm text-gray-600 block mb-2">First Name</label>
                <input
                  disabled={!edit}
                  name="first_name"
                  value={user.first_name || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-200 px-3 py-2 rounded-lg text-sm disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm text-gray-600 block mb-2">Last Name</label>
                <input
                  disabled={!edit}
                  name="last_name"
                  value={user.last_name || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-200 px-3 py-2 rounded-lg text-sm disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

            </div>

            <div>
              <label className="text-xs sm:text-sm text-gray-600 block mb-2">Email Address</label>
              <input
                disabled
                name="email_id"
                value={user.email_id || ""}
                className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-100 text-sm"
              />
            </div>

            <div>
              <label className="text-xs sm:text-sm text-gray-600 block mb-2">Phone Number</label>
              <input
                disabled={!edit}
                name="phone_number"
                value={user.phone_number || ""}
                onChange={handleChange}
                className="w-full border border-gray-200 px-3 py-2 rounded-lg text-sm disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {edit && (
              <button
                onClick={handleSave}
                className="w-full sm:w-auto bg-blue-500 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
              >
                Save Changes
              </button>
            )}

          </div>
        </div>

        {/* SECURITY */}
        <div className="bg-white rounded-lg sm:rounded-xl border p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-base sm:text-lg font-semibold">Account Security</h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Change your password securely using OTP verification
            </p>
          </div>

          <button
            onClick={() => navigate("/change-password/email")}
            className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
          >
            Change Password
          </button>
        </div>

        {/* DANGER ZONE */}
        <div className="bg-white rounded-lg sm:rounded-xl border p-4 sm:p-6">

          <h2 className="text-base sm:text-lg font-semibold text-red-600 mb-2">
            Danger Zone
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            Deleting your account will permanently remove all your data.
            This action cannot be undone.
          </p>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Delete Account
          </button>

        </div>

      </div>

      {/* 🔥 DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

          <div className="bg-white p-6 rounded-lg sm:rounded-xl w-full max-w-sm text-center">

            <h2 className="text-lg font-semibold text-red-600 mb-2">
              Delete Account?
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Do you want to delete your account permanently?
            </p>

            <div className="flex flex-col-reverse sm:flex-row justify-center gap-3">

              <button
                onClick={() => setShowDeleteModal(false)}
                className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition order-2 sm:order-1"
              >
                No
              </button>

              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition order-1 sm:order-2"
              >
                Yes, Delete
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Settings;