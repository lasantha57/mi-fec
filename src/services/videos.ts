import { getCategories } from './categories';
import { getAuthors } from './authors';
import { Author, ProcessedVideo, Video } from '../common/interfaces';

export const getVideos = async (): Promise<ProcessedVideo[]> => {
  const [categories, authors] = await Promise.all([getCategories(), getAuthors()])

  const videos = authors.flatMap((author: Author) => {
    const video = author.videos.map((video: Video) => ({
      id: video.id,
      name: video.name,
      author: author.name,
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
