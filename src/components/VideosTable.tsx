import React, { useState } from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ProcessedVideo } from '../common/interfaces';

const DEFAULT_PAGE_SIZE = 5;

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
    <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
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
                    aria-label="Edit Video"
                    onClick={() => onEdit(video.id, video.authorId)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    aria-label="Delete Vidoe"
                    onClick={() => onDelete(video.id, video.authorId)}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              count={filterVideos.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
