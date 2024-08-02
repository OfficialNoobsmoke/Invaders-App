import React from "react";

export const Toolbar: React.FC = () => {
  const classes =
    "font-semibold rounded-lg hover:bg-neutral transition text-secondary py-2 px-4 h-full flex flex-row gap-3 items-center";
  const activeClasses = "bg-primary text-primary-foreground hover:bg-primary";

  return (
    <div className="border-b bg-card px-4 pr-6">
      <div className="flex h-16 w-full items-center justify-between">
        Toolbar
      </div>
    </div>
  );
};
