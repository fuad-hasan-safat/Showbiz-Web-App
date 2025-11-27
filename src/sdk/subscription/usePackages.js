import { useMemo } from "react";
import { PACKAGES } from "./packages";

export const usePackages = (operator) => {
  return useMemo(() => PACKAGES[operator] || [], [operator]);
};
