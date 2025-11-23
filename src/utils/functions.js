import { configs } from "./constant";

export const handleGetOtp = async (phone, navigate) => {
  try {
    console.log("REQUEST OTP From following server")
    console.log("URL::: ",configs.API_BASE_PATH)
    const response = await fetch(`${configs.API_BASE_PATH}/auth/request-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send OTP');
    }

    // Use the navigate function passed as an argument
    navigate('/verify', { state: { phone } });
  } catch (error) {
    console.error('OTP request failed:', error);
    alert(error.message || 'Failed to send OTP. Please try again.');
  }
};