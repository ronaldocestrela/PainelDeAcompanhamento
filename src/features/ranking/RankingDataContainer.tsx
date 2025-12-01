import { Box, CircularProgress } from "@mui/material";
import { useRanking } from "../../lib/hooks/useRanking";
import RankingTable from "./RankingTable";
import ListPageLayoutRanking from "./ListPageLayoutRanking";

export default function RankingDataContainer() {
  const { isLoadingRanking } = useRanking();

  return (
    <ListPageLayoutRanking title="Ranking de Vendas">
      {isLoadingRanking ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <RankingTable />
      )}
    </ListPageLayoutRanking>
  );
}
