import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

// Operator configuration with colors and images
// NOTE: I am using generic placeholder image paths. Please ensure these paths are correct in your project.
const operators = [
    { id: 'robi', name: 'Robi', colorClass: 'bg-red-600 border-red-600', textColor: 'text-red-600', img: '/robi.png' },
    { id: 'gp', name: 'Grameenphone', colorClass: 'bg-[#19a9f8] border-[#19a9f8]', textColor: 'text-green-600', img: 'images/gp-icon.png' },
    { id: 'bl', name: 'Banglalink', colorClass: 'bg-orange-500 border-orange-500', textColor: 'text-orange-500', img: 'images/bl.png' },
];

const packages = [
    {
        id: 1,
        title: "Popular",
        price: "02.00",
        duration: "Daily",
        features: ["Unlimited Views", "On Demand"],
    },
    {
        id: 2,
        title: "Daily",
        price: "05.00",
        duration: "Daily",
        features: ["Unlimited Views"],
    },
];

export default function SubscriptionPage() {
    const [selectedPack, setSelectedPack] = useState(null); 
    const [selectedOperator, setSelectedOperator] = useState(null); // Initial state: No operator selected
    const [showSuccessPage, setShowSuccessPage] = useState(false);

    const currentOperator = operators.find(op => op.id === selectedOperator);
    const currentSelectedPackage = packages.find(pkg => pkg.id === selectedPack);
    
    const isContinueDisabled = !selectedPack || !selectedOperator;

    // --- 1. RENDER CONGRATULATIONS PAGE ---
    if (showSuccessPage) {
        // ... (Congratulations Page logic remains the same as before)
        return (
            <div className="container min-h-screen bg-white p-4 flex flex-col items-center">
                {/* Back + Quiz Title - Matches Congratulations.png */}
                <div className="w-full flex justify-start items-center mb-6 mt-3 relative">
                    <div
                        className="flex items-center gap-2 text-[16px] cursor-pointer text-gray-800 absolute left-0"
                        onClick={() => setShowSuccessPage(false)} 
                    >
                        <IoIosArrowBack className="text-[22px]" />
                        <span className="font-medium">Back</span>
                    </div>
                    <h2 className="text-[20px] text-[#292626] font-semibold flex-grow text-center">Quiz</h2>
                </div>

                {/* Celebration Image */}
                <div className="my-6 mt-16">
                    <img src="/congratulations.png" alt="Celebration" className="w-[280px] h-[180px] object-contain mx-auto" /> 
                </div>

                {/* Congratulations Text */}
                <h1 className="text-center text-[28px] font-extrabold text-gray-900 mb-2 mt-4">
                    Congratulations !!
                </h1>

                {/* Subscription Success Message */}
                <p className="text-center text-[16px] text-gray-700 leading-relaxed mb-8">
                    You successfully subscribed
                    <br />
                    <span className="font-semibold">
                        {currentSelectedPackage?.duration} on demand pack for <span className="text-[18px]">৳</span>{currentSelectedPackage?.price}
                    </span>
                </p>

                {/* Selected Package Card (Color based on selectedOperator) */}
                {currentSelectedPackage && (
                    <div
                        className={`
                            w-full max-w-sm p-5 rounded-[8px] transition-all duration-300 mx-auto mb-16 shadow-lg
                            ${currentOperator?.colorClass} text-white border-2 ${currentOperator?.colorClass}
                        `}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-[14px] font-medium">{currentSelectedPackage.title}</p>
                            <div className="w-6 h-6 flex items-center justify-center text-[18px] text-white"> 
                                ✓
                            </div>
                        </div>

                        {/* Price - Replicated exactly as in the image */}
                        <p className="font-extrabold leading-none -mt-1 flex items-baseline">
                            <span className="text-[28px]">৳</span>
                            <span className="text-[40px] leading-none">{currentSelectedPackage.price}</span>
                            <span className="text-[14px] font-medium ml-1"> / {currentSelectedPackage.duration}</span>
                        </p>

                        {/* Features */}
                        <div className="mt-8 space-y-2">
                            {currentSelectedPackage.features.map((f, i) => (
                                <p key={i} className="text-[15px] flex items-center gap-2">
                                    <span className="text-[18px] leading-none">✓</span> {f} 
                                </p>
                            ))}
                        </div>
                    </div>
                )}

                {/* Ok Button */}
                <button
                    onClick={() => console.log("Navigating to home/dashboard...")} 
                    className={`w-full max-w-sm h-[55px] py-4 rounded-lg text-white text-[18px] font-semibold shadow-md ${currentOperator?.colorClass}`}
                >
                    Ok
                </button>
            </div>
        );
    }

    // --- 2. RENDER SUBSCRIPTION PAGE (DEFAULT) ---
    return (
        <div className="container min-h-screen relative bg-[#fff] p-4">

            {/* Back + Title */}
            <div 
                className="flex items-center gap-2 text-[16px] mb-4 mt-3 cursor-pointer"
                onClick={() => (window.location.href = "/")}
            >
                <IoIosArrowBack className="text-[22px]" />
                <span className="font-medium">Back</span>
            </div>

            <h2 className="text-center text-[20px] text-[#292626] absolute top-6 left-1/2 -translate-x-1/2 font-semibold">Subscription</h2>
            
            {/* Operator Selection - UPDATED DESIGN */}
            <p className="mt-10 mb-3 font-medium text-[#0B0616]">Select Operator</p>

            <div className="grid grid-cols-3 gap-3 bg-[#F8FAFC] w-full">
                {operators.map((operator) => (
                    <div
                        key={operator.id}
                        onClick={() => setSelectedOperator(operator.id)}
                        className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-200
                            ${selectedOperator === operator.id 
                                ? `bg-gray-100 border-2 ${operator.textColor} border-current` 
                                : "bg-[#F8FAFC] border-2 border-transparent"
                            }`}
                    >
                        {/* Checkbox/Selection Indicator */}
                        <div
                            className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0
                                ${selectedOperator === operator.id 
                                    ? `${currentOperator.colorClass}` // Use operator color
                                    : "border-gray-400 bg-white"}`}
                        >
                            {selectedOperator === operator.id && <FaCheck className="text-white text-[12px]" />}
                        </div>
                        {/* Logo */}
                        <img src={operator.img} alt={`${operator.name} Logo`} className="w-[40px] h-[40px] object-contain" />
                    </div>
                ))}
            </div>

            <p className="text-center text-[18px] font-semibold mb-4 text-[#FE0101] mt-6">
                Select a plan
            </p>

            {/* Package Cards - Horizontal Scroll (1st full, 2nd 30% visible) */}
            <div className="overflow-x-auto no-scrollbar snap-x snap-mandatory px-1">
                <div 
                    className="flex gap-4"
                    style={{ width: '125%' }} 
                >
                    {packages.map((pkg, index) => (
                        <div
                            key={pkg.id}
                            onClick={() => setSelectedPack(pkg.id)}
                            className={`
                                min-w-[260px] flex-shrink-0 snap-center
                                p-5
                                rounded-[8px]
                                transition-all duration-300
                                ${
                                    selectedPack === pkg.id && currentOperator // Check if operator is selected
                                    ? `${currentOperator.colorClass} text-white shadow-lg`
                                    : "bg-white text-black border-2 border-[#FE0101]"
                                }
                            `}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-[14px] font-medium">{pkg.title}</p>

                                <div
                                    className={`
                                        w-6 h-6 flex items-center justify-center 
                                        text-[18px] font-bold
                                        ${
                                            selectedPack === pkg.id && currentOperator
                                            ? "text-white"
                                            : "text-transparent"
                                        }
                                    `}
                                >
                                    ✓
                                </div>
                            </div>

                            {/* Price */}
                            <p className="font-extrabold leading-none -mt-1 flex items-baseline">
                                <span className="text-[28px]">৳</span>
                                <span className="text-[40px] leading-none">{pkg.price}</span>
                                <span className="text-[14px] font-medium ml-1"> / {pkg.duration}</span>
                            </p>

                            {/* Features */}
                            <div className="mt-8 space-y-2">
                                {pkg.features.map((f, i) => (
                                    <p key={i} className="text-[15px] flex items-center gap-2">
                                        <span className="text-[18px] leading-none">✓</span> {f}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Terms */}
            <p className="text-[12px] text-gray-600 my-20">
                By tapping Continue, you will be charged. Your subscription will
                auto-renew unless you cancel. You agree to our{" "}
                <span className="text-blue-600">Terms</span>.
            </p>

            {/* Continue Button */}
            <button
                disabled={isContinueDisabled}
                onClick={() => setShowSuccessPage(true)} 
                className={`w-full h-[55px] py-4 rounded-lg text-white text-[18px] font-semibold
                    ${
                        isContinueDisabled
                        ? "bg-gray-400 cursor-not-allowed" // Disabled color
                        : `${currentOperator?.colorClass}` // Active color based on operator
                    }`}
            >
                Continue
            </button>
        </div>
    );
}