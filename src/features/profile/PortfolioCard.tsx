import { Card, Box, Typography, Divider, Stack, CardActions, Button } from '@mui/material'
import DropZone from '../../app/shared/components/DropZone'
import FileUpload from '../../app/shared/components/FileUpload'

// Icon inportes
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';

export const PortfolioCard = () => {
  return (
    <Card variant="outlined" sx={{ p: 3 }}>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6">Portfolio projects</Typography>
        <Typography variant="body2">
          Share a few snippets of your work.
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={2} sx={{ my: 1 }}>
        <DropZone />
        <FileUpload
          icon={<InsertDriveFileRoundedIcon />}
          fileName="Tech design requirements.pdf"
          fileSize="200 kB"
          progress={100}
        />
        <FileUpload
          icon={<VideocamRoundedIcon />}
          fileName="Dashboard prototype recording.mp4"
          fileSize="16 MB"
          progress={40}
        />
      </Stack>
      <Divider sx={{ mt: 2 }} />
      <CardActions sx={{ justifyContent: 'flex-end', pt: 2 }}>
        <Button size="small" variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button size="small" variant="contained">
          Save
        </Button>
      </CardActions>
    </Card>
  )
}
