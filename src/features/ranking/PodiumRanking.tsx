// eslint-disable-next-line
import { Box, Typography } from "@mui/material";

interface PodiumRankingProps {
  rows: Array<{
    salerName: string;
    totalSales: number;
  }>;
}

export default function PodiumRanking({ rows }: PodiumRankingProps) {

  const podium = [rows[1], rows[0], rows[2]].filter(Boolean);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'end', gap: 0, mb: 2, mt: 2, p: 0, ml: 6 }}>
      {podium[0] && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0, m: 0 }}>
          <Box sx={{
            width: 80,
            height: 80,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            background: '#C0C0C0',
            color: '#222',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            boxShadow: '0 3px 12px #8884',
            fontWeight: 700,
            fontSize: 18,
            position: 'relative',
            zIndex: 1,
          }}>
            <span style={{ fontSize: 28, position: 'absolute', top: -32, left: '50%', transform: 'translateX(-50%)' }}>🥈</span>
            <Typography variant="caption" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, lineHeight: 1, mt: 3, fontSize: 18 }}>2º</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600, textAlign: 'center', px: 0.5, lineHeight: 1, fontSize: 16 }}>{podium[0].salerName}</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'Roboto, sans-serif', mb: 1, fontSize: 13 }}>
              {Number(podium[0].totalSales).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Typography>
          </Box>
        </Box>
      )}
      {podium[1] && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0, m: 0 }}>
          <Box sx={{
            width: 100,
            height: 110,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            background: '#FFD700',
            color: '#222',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            boxShadow: '0 6px 24px #FFD70088',
            fontWeight: 700,
            fontSize: 22,
            position: 'relative',
            zIndex: 2,
            marginLeft: 0,
            marginRight: 0,
          }}>
            <span style={{ fontSize: 36, position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)' }}>🥇</span>
            <Typography variant="caption" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, lineHeight: 1, mt: 4, fontSize: 22 }}>1º</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600, textAlign: 'center', px: 0.5, lineHeight: 1, fontSize: 18 }}>{podium[1].salerName}</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'Roboto, sans-serif', mb: 1, fontSize: 15 }}>
              {Number(podium[1].totalSales).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Typography>
          </Box>
        </Box>
      )}
      {podium[2] && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0, m: 0 }}>
          <Box sx={{
            width: 80,
            height: 65,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            background: '#CD7F32',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            boxShadow: '0 3px 12px #8884',
            fontWeight: 700,
            fontSize: 18,
            position: 'relative',
            zIndex: 1,
          }}>
            <span style={{ fontSize: 28, position: 'absolute', top: -32, left: '50%', transform: 'translateX(-50%)', }}>🥉</span>
            <Typography variant="caption" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, lineHeight: 1, mt: 3, fontSize: 18 }}>3º</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600, textAlign: 'center', px: 0.5, lineHeight: 1, fontSize: 13 }}>{podium[2].salerName}</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'Roboto, sans-serif', mb: 1, fontSize: 13 }}>
              {Number(podium[2].totalSales).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
