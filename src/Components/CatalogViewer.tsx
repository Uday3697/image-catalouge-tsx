import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

const images = [
  {
    id: 1,
    src: "image1.jpg",
    title: "Image 1",
    description: "Description Description for Image 2Description for Image 2for Image 1",
  },
  {
    id: 2,
    src: "image2.jpg",
    title: "Image 2",
    description: "Description Description for Image 2Description for Image 2for Image 2",
  },
  {
    id: 3,
    src: "image3.jpg",
    title: "Image 3",
    description: "Description for Image 2 Description for Image 2Description for Image 2",
  },
  {
    id: 4,
    src: "image4.jpg",
    title: "Image 4",
    description: "Description for Image 2",
  },
  // Add more images here
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    // width: "80%",
    display:'flex',
    width:"800px",
    flex:1,
    // border:'2px solid green',
    // padding:"10px",
    marginTop:"60px",
    justifyContent:"in-between"
  },
  cardMedia: {
    flex:1,
    height: "400px",
    // border:'2px solid blue',

  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // border:'2px solid red',

    
    
  },
  thumbnail: {
    borderRadius: "15px",
    margin: "10px",
    width: 100,
    height: 50,
    objectFit: "cover",
    cursor: "pointer",
    filter: "grayscale(100%)",
    transition: "filter 0.3s ease-in-out",
    "&:hover": {
      filter: "none",
    },
  },
  thumbnailContainer: {
    marginTop: theme.spacing(2),
  },
  activeThumbnail: {
    filter: "none",
  },
}));

const CatalogViewer: React.FC = () => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState<any>(images[0]);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const [slideshowInterval, setSlideshowInterval] =
    useState<NodeJS.Timeout | null>(null);

  const startSlideshow = () => {
    setIsSlideshowActive(true);
  };

  const stopSlideshow = () => {
    setIsSlideshowActive(false);
  };

  const goToNextImage = () => {
    const currentIndex = images.findIndex(
      (image) => image.id === currentImage.id
    );
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImage(images[nextIndex]);
  };

  const goToPreviousImage = () => {
    const currentIndex = images.findIndex(
      (image) => image.id === currentImage.id
    );
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentImage(images[previousIndex]);
  };

  const goToImage = (image: { id: number }) => {
    setCurrentImage(image);
  };

  useEffect(() => {
    if (isSlideshowActive) {
      const interval = setInterval(goToNextImage, 3000);
      setSlideshowInterval(interval);
    } else {
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
      }
    }

    return () => {
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
      }
    };
  }, [isSlideshowActive, currentImage]);

  return (
    <div className={classes.root} style={{overflow:'scroll'}}>
      <Grid item xs={12} sm={6}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            component="img"
            image={currentImage.src}
            title={currentImage.title}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" component="h2">
              {currentImage.title}
            </Typography>
            <Typography>{currentImage.description}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.thumbnailContainer}>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.title}
            className={`${classes.thumbnail} ${
              image.id === currentImage.id ? classes.activeThumbnail : ""
            }`}
            onClick={() => goToImage(image)}
          />
        ))}
      </Grid>

      {isSlideshowActive ? (
        <IconButton onClick={stopSlideshow}>
          <PauseIcon />
        </IconButton>
      ) : (
        <IconButton onClick={startSlideshow}>
          <PlayArrowIcon />
        </IconButton>
      )}
      <Button onClick={goToPreviousImage}>Previous</Button>
      <Button onClick={goToNextImage}>Next</Button>
    </div>
  );
};

export default CatalogViewer;
