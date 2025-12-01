import { Button, Card, Grid, Typography } from "@mui/material";
import { useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import Cropper, { type ReactCropperElement } from 'react-cropper';
import "cropperjs/dist/cropper.css";

type Props = {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
}

export default function ImageUploadWidget({uploadPhoto, loading}: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file as Blob),
    })));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const [files, setFiles] = useState<object & { preview: string; }[]>([])
  const cropperRef = useRef<ReactCropperElement>(null);

  const onCrop = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    cropper?.getCroppedCanvas().toBlob(blob => {
      uploadPhoto(blob as Blob);
    })
  }, [uploadPhoto]);

  return (
    <Grid container spacing={3}>
      <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
        <Typography variant="overline" color="text.secondary">Step 1 - Add image</Typography>
        <Card {...getRootProps()}
          variant="outlined"
          sx={{
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'center',
            px: 3,
            flexGrow: 1,
            boxShadow: 'none',
            border: isDragActive ? '2px dashed #1976d2' : '2px dashed #ccc',
          }}
        >
          <input {...getInputProps()} />
          <FileUploadRoundedIcon sx={{ fontSize: 80 }} />
          <Typography variant="body2" color="text.secondary">
            Drag 'n' drop an image here, or click to select one
          </Typography>
        </Card>
      </Grid>
      <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
        <Typography variant="overline" color="text.secondary">Step 2 - Resize image</Typography>
        {files[0]?.preview &&
          <Cropper
            src={files[0]?.preview}
            style={{ height: 300, width: '90%' }}
            initialAspectRatio={1}
            aspectRatio={1}
            preview='.img-preview'
            guides={true}
            viewMode={1}
            background={false}
            ref={cropperRef}
          />
        }
      </Grid>
      <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
        <Typography variant="overline" color="text.secondary">Step 3 - Preview & upload</Typography>
        {files[0]?.preview && (
          <>
            <div 
              className="img-preview" 
              style={{width: 300, height:300, overflow: 'hidden'}}
            />
              <Button
                sx={{ mt: 2 }}
                onClick={onCrop}
                variant="contained"
                color="secondary"
                disabled={loading}
              >
                Salvar
              </Button>
          </>
        )}
      </Grid>
    </Grid>
  )
}
