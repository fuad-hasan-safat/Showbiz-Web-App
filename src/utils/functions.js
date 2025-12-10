import { configs } from "./constant";

export const handleGetOtp = async (phone, navigate) => {
  try {
    console.log("REQUEST OTP From following server");
    console.log("URL::: ", configs.API_BASE_PATH);
    const response = await fetch(`${configs.API_BASE_PATH}/auth/request-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    });

    const data = await response.json();
    console.log("Otp response: ", data);

    return data;
    // Use the navigate function passed as an argument
  } catch (error) {
    console.error("OTP request failed:", error);
    alert(error.message || "Failed to send OTP. Please try again.");
  }
};



  // Normalize and validate Bangladeshi phone number
 export const normalizeAndValidate = (input) => {
    let num = input.replace(/\D/g, "");

    if (num.startsWith("88")) {
      num = num.slice(2);
    }

    if (num.length === 10 && num.startsWith("1")) {
      num = "0" + num;
    }

    if (/^01\d{9}$/.test(num)) {
      return num;
    }

    return null;
  };
