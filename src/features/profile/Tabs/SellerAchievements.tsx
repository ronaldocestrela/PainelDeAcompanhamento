import { Box, Card, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import FastForwardIcon from '@mui/icons-material/FastForward';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

export const SellerAchievements = (props: { icon?: React.ReactElement; sx?: any }) => {
  const [value, setValue] = useState(0);

  const { icon, sx, ...other } = props;

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabContent = [
    { label: 'Conquistas', icon: <EmojiEventsIcon />, content: 'Suas conquistas aparecerão aqui em breve' },
    { label: 'Ranking Mensal', icon: <MilitaryTechIcon />, content: 'Monthely Rank Content' },
    { label: 'Ranking Geral', icon: <WhatshotIcon />, content: 'General Rank Content' }
  ]

  return (
    <Card variant="outlined" sx={{ p: 3 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
      >
        {tabContent.map((tab, index) => (
          <Tab key={index} label={tab.label} icon={tab.icon} iconPosition="start" />
        ))}
      </Tabs>
      <Stack spacing={2} sx={{ my: 1 }}>
        <Card
          variant="outlined"
          {...other}
          sx={{
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'center',
            px: 3,
            flexGrow: 1,
            boxShadow: 'none',
            ...sx,
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1,
            }}
          >
            {icon ?? <FastForwardIcon fontSize="medium" />}
          </Box>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            {tabContent[value].content}
          </Typography>
        </Card>
      </Stack>
    </Card>
  )
}
