import React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { ProcessedVideo } from '../common/interfaces';

interface VideosTableProps {
  videos: ProcessedVideo[];
  searchText: string;
  onDelete: (videoId: number, authorId: number) => void;
  onEdit: (videoId: number, authorId: number) => void;
}

export const VideosTable: React.FC<VideosTableProps> = ({ videos, searchText, onDelete, onEdit }) => {

  const filterVideos = videos.filter((video) => {
    if (searchText === '') return video;
    if (video?.name?.toLocaleLowerCase()?.includes(searchText) ||
      video?.author?.toLocaleLowerCase()?.includes(searchText) ||
      video?.releaseDate?.toLocaleLowerCase()?.includes(searchText) ||
      video?.categories?.toLocaleLowerCase()?.includes(searchText)) {
      return video
    }
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Video Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Highest Quality Format</TableCell>
            <TableCell>Release Date</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterVideos.map((video) => (
            <TableRow key={video.id}>
              <TableCell component="th" scope="row">
                {video.name}
              </TableCell>
              <TableCell>{video.author}</TableCell>
              <TableCell>{video.categories}</TableCell>
              <TableCell>{video.format}</TableCell>
              <TableCell>{video.releaseDate}</TableCell>
              <TableCell>
                <Box>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => onEdit(video.id, video.authorId)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => onDelete(video.id, video.authorId)}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
