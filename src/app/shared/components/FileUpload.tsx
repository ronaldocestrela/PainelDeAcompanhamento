import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

export default function FileUpload(
  props: {
    icon?: React.ReactElement;
    fileName: string;
    fileSize: string;
    progress: number;
    sx?: any;
  }
) {
  const { icon, fileName, fileSize, progress, sx, ...other } = props;
  return (
    <Card
      variant="outlined"
      {...other}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1.5,
        alignItems: 'flex-start',
        p: 1.5,
        ...sx,
      }}
    >
      <Avatar
        sx={{
          bgcolor: 'grey.100',
          color: 'text.secondary',
          width: 40,
          height: 40,
          borderRadius: '50%',
          mt: 0.5,
        }}
        variant="rounded"
      >
        {icon ?? <InsertDriveFileRoundedIcon fontSize="small" />}
      </Avatar>
      <CardContent sx={{ flex: 1, p: 0, '&:last-child': { pb: 0 } }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {fileName}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {fileSize}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
          <LinearProgress
            color={progress >= 100 ? 'success' : 'primary'}
            value={progress}
            variant="determinate"
            sx={{ flex: 1, height: 6, borderRadius: 5 }}
          />
          <Typography variant="caption">{progress}%</Typography>
        </Box>
      </CardContent>
      {progress >= 100 ? (
        <Avatar
          sx={{
            bgcolor: 'success.main',
            color: 'success.contrastText',
            width: 28,
            height: 28,
            borderRadius: '50%',
            mt: 1,
          }}
        >
          <CheckRoundedIcon fontSize="small" />
        </Avatar>
      ) : (
        <IconButton color="error" size="small" sx={{ mt: 0.5 }}>
          <RemoveCircleOutlineRoundedIcon fontSize="small" />
        </IconButton>
      )}
    </Card>
  );
}