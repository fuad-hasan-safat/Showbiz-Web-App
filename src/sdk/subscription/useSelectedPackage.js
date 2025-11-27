import { useState, useEffect } from "react";

export const useSelectedPackage = (packages) => {
  const [selectedPackageId, setSelectedPackageId] = useState("");

  useEffect(() => {
    if (packages.length > 0) {
      setSelectedPackageId(packages[0].id);
    }
  }, [packages]);

  const selectedPackage = packages.find(
    (pkg) => pkg.id === selectedPackageId
  );

  return {
    selectedPackageId,
    selectedPackage,
    setSelectedPackageId,
  };
};
