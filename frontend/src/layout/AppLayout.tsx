import React from "react";
import { CustomErrorBoundary } from "../components/CustomErrorBoundary";
import { OnBoarding } from "../pages/onboarding/OnBoarding";

export const RootLayout: React.FC = () => {
  return (
    <CustomErrorBoundary>
      <OnBoarding />
    </CustomErrorBoundary>
  );
};
