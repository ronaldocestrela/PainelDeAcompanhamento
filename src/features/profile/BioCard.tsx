import { Box, Button, Card, CardActions, Divider, FormHelperText, Stack, TextField, Typography } from "@mui/material"
import EditorToolbar from "../../app/shared/components/EditorToolbar"

export const BioCard = () => {
  return (
    <Card variant="outlined" sx={{ p: 3 }}>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6">Bio</Typography>
        <Typography variant="body2">
          Write a short introduction to be displayed on your profile
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={2} sx={{ my: 1 }}>
        <EditorToolbar />
        <TextField
          size="small"
          multiline
          minRows={4}
          sx={{ mt: 1.5 }}
          defaultValue="I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much JavaScript."
        />
        <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
          275 characters left
        </FormHelperText>
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
