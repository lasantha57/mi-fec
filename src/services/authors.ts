import { Author } from '../common/interfaces';

export const getAuthors = (): Promise<Author[]> => {
  return fetch(`${process.env.REACT_APP_API}/authors`).then((response) => (response.json() as unknown) as Author[]);
};

export const getAuthorById = (authorId: number): Promise<Author> => {
  return fetch(`${process.env.REACT_APP_API}/authors/${authorId}`).then((response) => (response.json() as unknown) as Author);
};