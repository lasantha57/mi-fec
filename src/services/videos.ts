import { getCategories } from './categories';
import { getAuthors, getAuthorById } from './authors';
import { Author, ProcessedVideo, Video } from '../common/types';

export const getVideos = async (): Promise<ProcessedVideo[]> => {
  const [categories, authors] = await Promise.all([getCategories(), getAuthors()])

  const videos = authors.flatMap((author: Author) => {
    const video = author.videos.map((video: Video) => ({
      id: video.id,
      name: video.name,
      author: author.name,
      authorId: author.id,
      categories: categories.filter((category) => video.catIds.includes(category.id)).map((category) => category.name).join(', '),
      format: 'best 1080p',
      releaseDate: video.releaseDate,
    }));
    return video;
  });

  return new Promise((resolve) => {
    resolve(videos)
  })
};

export const addOrModifyVideo = (author: Author): Promise<Author> => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API}/authors/${author.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        videos: author.videos,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(author => resolve(author))
      .catch(error => reject(error));
  });
};

export const deleteVideo = async (authorId: number, videoId: number): Promise<Author> => {

  const author = await getAuthorById(authorId);
  const videos = author.videos.filter(video => video.id !== videoId);

  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API}/authors/${authorId}`, {
      method: 'PATCH',
      body: JSON.stringify({ videos }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(author => resolve(author))
      .catch(error => reject(error));
  });
};