import { useMemo } from "react";
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

export default function MainGrid() {
  const { selectedExpertId } = useDashboard();

  const { cardData, gridRows } = useMemo<{
    cardData: StatCardProps[];
    gridRows: GridRowsProp;
  }>(() => {
    const ASTOFO_ID = "e4f0cab3-7abe-423b-ae56-ab3017b06ee8";
    const FUNNYO_ID = "ab44e883-d315-435b-bc9b-3711b4ff115e";

    let selectedRows: GridRowsProp = [];

    if (selectedExpertId === ASTOFO_ID) {
      selectedRows = allGridRows.slice(0, 8);
    } else if (selectedExpertId === FUNNYO_ID) {
      selectedRows = allGridRows.slice(8, 15);
    }

    if (selectedRows.length === 0) {
      const emptyState: Omit<StatCardProps, "title"> = {
        value: "0",
        interval: "Nenhum dado",
        trend: "neutral",
        data: [],
      };
      return {
        cardData: [
          { ...emptyState, title: "Users" },
          { ...emptyState, title: "Conversions" },
          { ...emptyState, title: "Event count" },
        ],
        gridRows: [],
      };
    }

    const totalUsers = selectedRows.reduce((sum, row) => sum + (row.users || 0), 0);
    const totalEvents = selectedRows.reduce((sum, row) => sum + (row.eventCount || 0), 0);
    const totalConversions = selectedRows.reduce((sum, row) => sum + (row.conversions?.length || 0), 0);

    const dynamicCardData: StatCardProps[] = [
      {
        title: "Users", value: totalUsers.toLocaleString(), interval: "Dados do expert", trend: "up",
        data: selectedRows.map((r) => r.users).filter(Boolean),
      },
      {
        title: "Conversions", value: totalConversions.toLocaleString(), interval: "Dados do expert", trend: "down",
        data: selectedRows.map((r) => r.conversions[0]).filter(Boolean),
      },
      {
        title: "Event count", value: totalEvents.toLocaleString(), interval: "Dados do expert", trend: "neutral",
        data: selectedRows.map((r) => r.eventCount).filter(Boolean),
      },
    ];

    return { cardData: dynamicCardData, gridRows: selectedRows };
  }, [selectedExpertId]);

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
          {selectedExpertId && (
            <Typography variant="caption" color="text.secondary">
              {selectedExpertId}
            </Typography>
          )}
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
