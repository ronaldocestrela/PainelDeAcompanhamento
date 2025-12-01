import { useState } from 'react';

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import type { SxProps } from '@mui/material/styles';

import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';

export default function EditorToolbar(props: { sx?: SxProps }) {
  const { sx, ...other } = props;
  const [textType, setTextType] = useState('1');
  return (
    <Box
      {...other}
      sx={{
        display: 'flex',
        gap: 0.5,
        alignItems: 'center',
        ...(Array.isArray(sx) ? Object.assign({}, ...sx) : sx),
      }}
    >
      <Select
        size="small"
        value={textType}
        onChange={e => setTextType(e.target.value)}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="1">Normal text</MenuItem>
        <MenuItem value="2" sx={{ fontFamily: 'monospace' }}>
          Code text
        </MenuItem>
      </Select>
      <IconButton size="small" color="default">
        <FormatBoldRoundedIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" color="default">
        <FormatItalicRoundedIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" color="default">
        <StrikethroughSRoundedIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" color="default">
        <FormatListBulletedRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}