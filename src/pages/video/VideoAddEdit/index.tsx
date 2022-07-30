import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { Container, InputLabel, OutlinedInput } from '@mui/material';

import { getCategories } from '../../../services/categories';
import { getAuthors } from '../../../services/authors';
import { Category, Author } from '../../../common/interfaces';

export const VideoAddEdit: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [authors, setAuthors] = React.useState<Author[]>([]);
  const [selectedAuthorId, setSelectedAuthorId] = React.useState<number>();
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [categories, authors] = await Promise.all([getCategories(), getAuthors()]);
      setCategories(categories);
      setAuthors(authors);
    };
    fetchData();
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onCancel = () => {
    navigate('/');
  };

  const handleAuthorChange = (event: SelectChangeEvent<typeof selectedAuthorId>) => {
    const value = event.target.value;
    setSelectedAuthorId(value as typeof selectedAuthorId);
  };

  const handleChangeCategories = (event: SelectChangeEvent<typeof selectedCategories>) => {
    const value = event.target.value;
    setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Container maxWidth={false}>
      <Box>
        <Typography variant="h4" component="h4" pb={1}>
          Add Video
        </Typography>
        <Divider />
        <Box component="form" onSubmit={onSubmit}>
          <Box>
            <TextField
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              label="Name"
              size="medium"
              sx={{ width: '80%' }}
            />
          </Box>
          <Box>
            <FormControl sx={{ width: '80%' }}>
              <InputLabel>Author *</InputLabel>
              <Select
                required
                name="author"
                placeholder="Author"
                value={selectedAuthorId}
                onChange={handleAuthorChange}
                input={<OutlinedInput label="Author" />}>
                {
                  authors.map((author) => (
                    <MenuItem key={author.id} value={author.id}>
                      {author.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl sx={{ width: '80%' }}>
              <InputLabel>Video Categories *</InputLabel>
              <Select
                required
                multiple
                value={selectedCategories}
                onChange={handleChangeCategories}
                input={<OutlinedInput label="Video Categories *" />}>
                {
                  categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Button
              variant="contained"
              size="medium"
              color="primary"
            >
              Submit
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
