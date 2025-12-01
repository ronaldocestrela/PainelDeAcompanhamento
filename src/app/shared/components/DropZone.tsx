import * as React from 'react';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';

export default function DropZone(
  props: { icon?: React.ReactElement; sx?: any }
) {
  const { icon, sx, ...other } = props;
  return (
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
        {icon ?? <FileUploadRoundedIcon fontSize="medium" />}
      </Box>
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        <Link component="button" underline="hover">
          Click to upload
        </Link>{' '}
        or drag and drop
        <br /> SVG, PNG, JPG or GIF (max. 800x400px)
      </Typography>
    </Card>
  );
}