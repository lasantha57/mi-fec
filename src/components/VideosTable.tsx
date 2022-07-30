import React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { ProcessedVideo } from '../common/interfaces';

interface VideosTableProps {
  videos: ProcessedVideo[];
}

export const VideosTable: React.FC<VideosTableProps> = ({ videos }) => {
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
          {videos.map((video) => (
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
                    color="primary">
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="error">
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
