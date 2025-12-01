import React, { useState, useRef } from "react";
import { Box, Typography, TextField, IconButton, Popover, Button } from "@mui/material";
import PodiumRanking from "./PodiumRanking";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useRanking } from "../../lib/hooks/useRanking";

export default function RankingTable() {
  const [tab, setTab] = useState<"day" | "month" | "all-time">("day");
  const [period, setPeriod] = useState({ start: "", end: "" });
  const [pendingPeriod, setPendingPeriod] = useState({ start: "", end: "" });
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const filterBtnRef = useRef<HTMLButtonElement | null>(null);
  const { ranking } = useRanking(
    period.start && period.end
      ? { type: "period", start: period.start, end: period.end }
      : { type: tab }
  );

  const rows = (ranking || [])
    .slice()
    .sort((a, b) => b.totalSales - a.totalSales)
    .map((item, idx) => ({ ...item, id: item.sellerId, position: idx + 1 }));

  const columns: GridColDef[] = [
    {
      field: "position",
      headerName: "Posição",
      minWidth: 100,
      flex: 0.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="medium" sx={{ pt: 2 }}>{params.value}º</Typography>
      ),
    },
    {
      field: "salerName",
      headerName: "Vendedor",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        const row = params.row;
        const nomeCompleto = [row.firstName, row.lastName].filter(Boolean).join(" ") || params.value;
        return (
          <Typography variant="body2" sx={{ pt: 2 }}>{nomeCompleto}</Typography>
        );
      },
    },
    {
      field: "totalSales",
      headerName: "Total de Vendas",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="body2" sx={{ pt: 2 }}>
            {Number(params.value).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Typography>
          {params.row.saleDate && (
            <Typography variant="caption" color="text.secondary" sx={{ pt: 0.5 }}>
              {new Date(params.row.saleDate).toLocaleString("pt-BR")}
            </Typography>
          )}
        </Box>
      ),
    },
  ];

  const podiumRows = rows.slice(0, 3);
  let tableRows = rows.slice(3);
  if (rows.length > 0 && tableRows.length === 0) {
    tableRows = [{
      id: 'placeholder',
      sellerId: 'placeholder',
      position: 0,
      salerName: '',
      totalSales: 0,
    }];
  }

  return (
    <>
      <Box sx={{ mb: 6, mt: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 0 }}>
        {[{ label: "Hoje", value: "day" }, { label: "Mês", value: "month" }, { label: "Geral", value: "all-time" }].map((item, idx, arr) => (
          <React.Fragment key={item.value}>
            <button
              onClick={() => setTab(item.value as any)}
              disabled={tab === item.value}
              style={{
                background: tab === item.value ? "#fff" : "#111",
                color: tab === item.value ? "#111" : "#fff",
                border: "1px solid #ccc",
                borderRadius: 4,
                padding: "6px 18px",
                fontWeight: 600,
                cursor: tab === item.value ? "default" : "pointer",
                marginRight: idx < arr.length - 1 ? 8 : 0,
                boxShadow: tab === item.value ? "0 2px 8px #1976d255" : "none",
                transition: "all 0.25s cubic-bezier(.4,2,.6,1)",
                transform: tab === item.value ? "scale(1.07)" : "scale(1)",
              }}
            >
              {item.label}
            </button>
            {idx < arr.length - 1 && (
              <span style={{ color: "#888", fontWeight: 600, fontSize: 18, margin: "0 8px", transition: "color 0.2s" }}>|</span>
            )}
          </React.Fragment>
        ))}
        <IconButton
          size="small"
          sx={{ ml: 2 }}
          ref={filterBtnRef}
          onClick={e => setFilterAnchorEl(e.currentTarget)}
          color={Boolean(filterAnchorEl) ? "primary" : "default"}
        >
          <FilterAltIcon />
        </IconButton>
      </Box>
      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={() => setFilterAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { p: 2, minWidth: 320 } }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Início"
            type="datetime-local"
            size="small"
            value={pendingPeriod.start}
            onChange={e => setPendingPeriod(p => ({ ...p, start: e.target.value }))}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Fim"
            type="datetime-local"
            size="small"
            value={pendingPeriod.end}
            onChange={e => setPendingPeriod(p => ({ ...p, end: e.target.value }))}
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setPendingPeriod({ start: '', end: '' });
                setPeriod({ start: '', end: '' });
                setFilterAnchorEl(null);
              }}
            >Limpar</Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setPeriod(pendingPeriod);
                setFilterAnchorEl(null);
              }}
              disabled={!pendingPeriod.start || !pendingPeriod.end}
            >Filtrar</Button>
          </Box>
        </Box>
      </Popover>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <PodiumRanking rows={podiumRows} />
      </Box>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={tableRows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          hideFooter
          getRowClassName={params => params.id === 'placeholder' ? 'invisible-row' : ''}
          localeText={{
            noRowsLabel: "Ainda não há ranking.",
          }}
        />
      <style>{`
        .invisible-row {
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
      </Box>
    </>
  );
}
