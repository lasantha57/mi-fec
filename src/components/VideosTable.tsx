import React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ProcessedVideo } from '../common/interfaces';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  }
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  [`& th`]: {
    fontWeight: 'bold',
    border: `1px solid ${theme.palette.action.selected}`
  }
}));

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
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="A Video table">
        <StyledTableHead>
          <TableRow>
            <TableCell>Video Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Highest Quality Format</TableCell>
            <TableCell>Release Date</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {filterVideos.map((video) => (
            <StyledTableRow key={video.id} hover>
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
                    sx={{ mr: 1 }}
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
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
