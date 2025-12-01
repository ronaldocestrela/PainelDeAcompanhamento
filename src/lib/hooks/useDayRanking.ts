import { useEffect, useState } from "react";
import axios from "axios";

export interface DayRank {
  sellerId: string;
  salerName: string;
  totalSales: number;
}

export default function useDayRanking() {
  const [data, setData] = useState<DayRank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get<DayRank[]>("/api/ranks/sellers/day")
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
