import React from "react";
import { CustomErrorBoundary } from "../components/CustomErrorBoundary.tsx";
import { OnBoarding } from "../pages/onboarding/OnBoarding.tsx";

export const RootLayout: React.FC = () => {
  return (
    <CustomErrorBoundary>
      <OnBoarding />
    </CustomErrorBoundary>
  );
};
