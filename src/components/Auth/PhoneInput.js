import React, { useState } from "react";
import { handleGetOtp, normalizeAndValidate } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PhoneInput = () => {
  const [phone, setPhone] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // <-- added
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent multiple clicks

    setError(null);

    if (!isChecked) {
      setError("Please confirm you are not a robot.");
      return;
    }

    const validPhone = normalizeAndValidate(phone);

    if (!validPhone) {
      setError("Enter a valid Bangladeshi phone number.");
      return;
    }

    setLoading(true); // button disabled

    try {
      const data = await handleGetOtp(validPhone, navigate);

      if (data.status === 200) {
        toast.success(`${data.message}`);
        navigate("/verify", { state: { phone } });
      } else {
        toast.error(`${data.message}`);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }

    setLoading(false); // re-enable button
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 w-full">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`bg-[#F8FAFC] text-[14px] text-[#404B52] w-full h-[53px] p-5 rounded-[4px] 
          ${error ? "border border-red-500" : ""}`}
          placeholder="Enter phone number"
          required
        />

        {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
      </div>

      {/* Checkbox */}
      <div className="mt-3 flex items-center gap-2">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="w-4 h-4"
          id="not-robot"
        />
        <label htmlFor="not-robot" className="text-sm text-gray-700">
          I am not a robot.
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading} // <-- disabled when loading
        className={`w-full h-[55px] bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-[4px] font-semibold mt-4
        ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {loading ? "Please wait..." : "Next"}
      </button>
    </form>
  );
};

export default PhoneInput;
