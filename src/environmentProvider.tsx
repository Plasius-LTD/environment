// EnvironmentProvider.tsx
import React, { createContext, useContext } from "react";

const EnvironmentContext = createContext<Record<string, string> | undefined>(
  undefined
);

export function EnvironmentProvider(props: {
  env: Record<string, string>;
  children: React.ReactNode;
}) {
  const env = Object.fromEntries(
    Object.entries(props.env).filter(([key]) => key.startsWith("VITE_"))
  ) as Record<string, string>;

  return (
    <EnvironmentContext.Provider value={env}>
      {props.children}
    </EnvironmentContext.Provider>
  );
}

export function useEnvironment(): Record<string, string> {
  const context = useContext(EnvironmentContext);
  if (!context)
    throw new Error("useEnvironment must be used within EnvironmentProvider");
  return context;
}
