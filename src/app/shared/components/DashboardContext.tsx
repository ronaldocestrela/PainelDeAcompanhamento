import {
  createContext,
  useState,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

interface DashboardContextType {
  selectedExpertId: string;
  setSelectedExpertId: (id: string) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [selectedExpertId, setSelectedExpertId] = useState<string>("");

  const initialEndDate = new Date();
  const initialStartDate = new Date(initialEndDate);
  initialStartDate.setDate(initialEndDate.getDate() - 30);

  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = useMemo(
    () => () => setSidebarOpen((prev) => !prev),
    [],
  );

  const value = useMemo(
    () => ({
      selectedExpertId,
      setSelectedExpertId,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      sidebarOpen,
      toggleSidebar,
    }),
    [selectedExpertId, startDate, endDate, sidebarOpen, toggleSidebar],
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
