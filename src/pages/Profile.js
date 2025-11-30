/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import { configs } from "../utils/constant";
import { Helmet } from "react-helmet";
import { useProfileStore } from "../store/profileStore";
import { useSubscriptionStore } from "../store/subscriptionStore";

const ProfileEdit = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Zustand values
  const profile = useProfileStore((s) => s.profile);
  const loading = useProfileStore((s) => s.loading);
  const fetchProfile = useProfileStore((s) => s.fetchProfile);
  const updateProfileLocally = useProfileStore((s) => s.updateProfileLocally);

  // Toast
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const Toast = () => (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 p-4 rounded-md text-white z-[99999] ${
        toast.type === "error" ? "bg-red-500" : "bg-green-500"
      } transition-opacity duration-300 ${
        toast.show ? "opacity-100" : "opacity-0"
      }`}
    >
      {toast.message}
    </div>
  );

  const mobileNumber = useSubscriptionStore((s) => s.mobileNumber);

  useEffect(() => {
    if (!mobileNumber) {
      navigate("/singin");
    } else {
      fetchProfile(mobileNumber);
    }
  }, [mobileNumber]);

  // -----------------------------
  // Image Upload
  // -----------------------------
  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    updateProfileLocally({ image: previewUrl });

    setSelectedFile(file);
  };

  // -----------------------------
  // Submit Update
  // -----------------------------
  const handleSubmit = async () => {

    const nameChanged = profile.name !== profile.originalName;

    if (!selectedFile && !nameChanged) {
      return showToast("No change to save");
    }

    setIsUpdating(true);

    try {
      const formData = new FormData();

      if (nameChanged) formData.append("name", profile.name);
      if (selectedFile) formData.append("profileImage", selectedFile);

      const response = await fetch(
        `${configs.API_BASE_PATH}/registercms/updateprofile/${mobileNumber}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Update failed");

      const result = await response.json();

      updateProfileLocally({
        name: result.name,
        originalName: result.name,
        image: result?.image
          ? `${configs.API_BASE_PATH}${result.image}`
          : profile.image,
      });

      setSelectedFile(null);

      showToast("Profile updated successfully", "success");
    } catch (err) {
      showToast(err.message || "Failed to update profile", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading || !profile) return <div>Loading...</div>;

  return (
    <div className="container bg-white">
      <Helmet>
        <title>{profile.name}</title>
        <meta name="description" content="This is showbiz portal" />
        <meta property="og:title" content={`${profile.name}`} />
      </Helmet>

      <Toast />
      <Header />

      <div className="min-h-screen bg-white p-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 mb-10 border-b-2 border-[#ddd]">
          <Link
            to="/home"
            className="flex items-center text-[#292626] hover:text-[#FE0101]"
          >
            <IoIosArrowBack /> Back
          </Link>
          <h2 className="text-xl font-semibold text-center w-full -ml-10">
            Profile
          </h2>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center mb-8 relative">
          <div className="relative w-24 h-24">
            <img
              src={profile.image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#4e507e] shadow-md"
            />
            <div
              onClick={handleImageClick}
              className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md cursor-pointer"
            >
              <FaCamera className="text-sm text-[#4e507e]" />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => updateProfileLocally({ name: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={profile.phone}
              readOnly
              className="w-full border border-gray-200 bg-gray-100 text-gray-500 rounded-md px-3 py-3 outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <button
              onClick={handleSubmit}
              disabled={isUpdating}
              className="w-full py-3 rounded-md text-white font-semibold bg-gradient-to-r from-orange-400 to-red-500 mt-10 disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfileEdit;
