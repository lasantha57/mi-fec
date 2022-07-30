import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { Container } from '@mui/system';

import { ProcessedVideo } from '../../../common/interfaces';
import { getVideos } from '../../../services/videos';
import { VideosTable } from '../../../components/VideosTable';

export const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  
  useEffect(() => {
    const fetchVideos = async() => {
      try {
        const videos = await getVideos();
        setVideos(videos);
      } catch (error) {
        console.log(error);
      }
    }
    fetchVideos();
  }, []);
  
  return (
    <Container maxWidth={false}>
        <Box>
        <Typography variant="h4" my={2}>
            VManager Demo v0.0.1
        </Typography>
        <VideosTable videos={videos} />
        </Box>
    </Container>
  );
};
