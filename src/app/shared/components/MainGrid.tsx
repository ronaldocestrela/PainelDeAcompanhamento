import { useMemo, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import CustomizedDataGrid from "./CustomizedDataGrid";
import StatCard, { type StatCardProps } from "./StatCard";
import DatePeriod from "./DatePeriod";
import { type GridRowsProp } from "@mui/x-data-grid";
import { useDashboard } from "./DashboardContext";
import { rows as allGridRows } from "../internals/data/GridData";
import HighlightedCard from "./HighlightedCard";
import SessionsChart from "./SessionsChart";
import PageViewsBarChart from "./PageViewsBarChart";
import CustomizedTreeView from "./CustomizedTreeView";
import ChartUserByCountry from "./ChartUserByCountry";
import agente from "../../../lib/api/agents";

export default function MainGrid() {
  const { selectedExpertId, startDate, endDate } = useDashboard();
  const [totalRevenue, setTotalRevenue] = useState({ total: 0, dailyTotals: [] as number[] });
  const [totalCpa, setTotalCpa] = useState({ total: 0, dailyTotals: [] as number[] });
  const [totalCommission, setTotalCommission] = useState({ total: 0, dailyTotals: [] as number[] });

  useEffect(() => {
    if (startDate && endDate) {
      const fromDate = startDate.toISOString().split('T')[0];
      const toDate = endDate.toISOString().split('T')[0];
      
      agente.get('Reports/total-rev', { params: { FromDate: fromDate, ToDate: toDate } })
        .then((response: any) => setTotalRevenue(response.data))
        .catch((error: any) => console.error('Error fetching total revenue:', error));
      
      agente.get('Reports/total-cpa', { params: { FromDate: fromDate, ToDate: toDate } })
        .then((response: any) => setTotalCpa(response.data))
        .catch((error: any) => console.error('Error fetching total CPA:', error));
      
      agente.get('Reports/total-commision', { params: { FromDate: fromDate, ToDate: toDate } })
        .then((response: any) => setTotalCommission(response.data))
        .catch((error: any) => console.error('Error fetching total commission:', error));
    }
  }, [startDate, endDate]);

  const { cardData, gridRows } = useMemo<{
    cardData: StatCardProps[];
    gridRows: GridRowsProp;
  }>(() => {

    let selectedRows: GridRowsProp = selectedExpertId ? allGridRows : [];

    if (selectedRows.length === 0) {
      const emptyState: Omit<StatCardProps, "title"> = {
        value: "0",
        interval: "Nenhum dado",
        trend: "neutral",
        data: [],
      };
      return {
        cardData: [
          { ...emptyState, title: "Comissão" },
          { ...emptyState, title: "CPA" },
          { ...emptyState, title: "Reavenue" },
        ],
        gridRows: [],
      };
    }

    const dynamicCardData: StatCardProps[] = [
      {
        title: "Comissão", value: totalCommission.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), interval: "Período selecionado", trend: totalCommission.total >= 0 ? "up" : "down",
        data: totalCommission.dailyTotals,
      },
      {
        title: "CPA", value: totalCpa.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), interval: "Período selecionado", trend: totalCpa.total >= 0 ? "up" : "down",
        data: totalCpa.dailyTotals,
      },
      {
        title: "Reavenue", value: totalRevenue.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), interval: "Período selecionado", trend: totalRevenue.total >= 0 ? "up" : "down",
        data: totalRevenue.dailyTotals,
      },
    ];

    return { cardData: dynamicCardData, gridRows: selectedRows };
  }, [selectedExpertId, totalCpa, totalRevenue, totalCommission]);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Stack>
          <Typography component="h2" variant="h6">
            Overview
          </Typography>
          {/* {selectedExpertId && (
            <Typography variant="caption" color="text.secondary">
              {selectedExpertId}
            </Typography>
          )} */}
        </Stack>
        <Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <DatePeriod iconOnly />
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <DatePeriod />
          </Box>
        </Box>
      </Stack>
      <Grid container spacing={2} columns={12}>
        {cardData.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mt: 2, mb: 2 }}>
        Detalhes
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid rows={gridRows} />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
