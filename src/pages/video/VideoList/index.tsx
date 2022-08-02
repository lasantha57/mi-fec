import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, TextField } from '@mui/material';
import { Container } from '@mui/system';

import { ProcessedVideo } from '../../../common/types';
import { deleteVideo, getVideos } from '../../../services/videos';
import { VideosTable } from '../../../components/VideosTable';
import { Toast } from '../../../components/Toast';

export const VideoList: React.FC = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [openToast, setOpenToast] = useState(false);

  const fetchVideos = async () => {
    try {
      const videos = await getVideos();
      setVideos(videos);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  const onDelete = async (videoId: number, authorId: number) => {
    // TODO: Replace this default confirm with material UI custom dialog alert
    const result = window.confirm('Are you sure you want to delete this?');
    if (result) {
      try {
        const deleted = await deleteVideo(authorId, videoId);
        if (deleted) {
          setOpenToast(true);
          fetchVideos();
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const onEdit = (videoId: number, authorId: number) => {
    navigate({
      pathname: '/video',
      search: `?authorId=${authorId}&videoId=${videoId}`,
    });
  }

  const onToastClose = () => {
    setOpenToast(false);
  }

  return (
    <Container maxWidth={false}>
      <Toast open={openToast} onClose={onToastClose} />
      <Box>
        <Typography variant="h4" my={2}>
          VManager Demo v0.0.1
        </Typography>
        <TextField
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          label="Search Videos"
          aria-label="Search Videos"
          type={'search'}
          fullWidth
        />
        <Box my={3}>
          <VideosTable
            videos={videos}
            searchText={searchText}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </Box>
      </Box>
    </Container>
  );
};
