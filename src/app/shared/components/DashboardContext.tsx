import { createContext, useState, useContext, useMemo, type ReactNode } from 'react';

interface DashboardContextType {
  selectedExpertId: string;
  setSelectedExpertId: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [selectedExpertId, setSelectedExpertId] = useState<string>('');

  const value = useMemo(() => ({
    selectedExpertId,
    setSelectedExpertId,
  }), [selectedExpertId]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
