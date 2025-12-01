import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";

type CardProps = {
  title: string;
  photoUrl?: string;
  id: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};
export const CardImage = ({ title, photoUrl, id, icon, children }: CardProps) => {
  return (
    <CardActionArea href={`/projects/${id}`} >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={photoUrl || '/estadio_de_futebol.png'} // Fallback image if photoUrl is not available
          alt={title} // Assuming title is used as alt text
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {icon} {title}
          </Typography>
          {children}
        </CardContent>
      </Card>
    </CardActionArea>
  )
}
