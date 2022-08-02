import { getCategories } from './categories';
import { getAuthors, getAuthorById } from './authors';
import { Author, ProcessedVideo, Video } from '../common/types';

const findFormat = (formats: Object) => {
  // TODO: Simplyfy this logic
  let bestResolution: any;
  let videoFormat: any;

  const resSizes = Object.values(formats);
  const videoSizes = resSizes.map(format => format.size) as number[];
  let maxVideoSizeOrRes = Math.max(...videoSizes);
  const maxFormats = resSizes.filter(item => item.size === maxVideoSizeOrRes);

  if (maxFormats.length === 1) {
    bestResolution = maxFormats[0];
    videoFormat = Object.entries(formats).find(([,value]) => value.res === bestResolution.res && value.size === bestResolution.size);
  }

  if (maxFormats.length > 1) { 
    const resolutions = Object.values(formats).map(value => parseInt(value.res.slice(0, -1)));
    maxVideoSizeOrRes = Math.max(...resolutions);
    videoFormat = Object.entries(formats).find(([,value]) => parseInt(value.res.slice(0, -1)) === maxVideoSizeOrRes);
  }

  // expect video format key and the value as 2 array items
  if (videoFormat.length === 2) return `${videoFormat[0]} ${videoFormat[1].res}`;
  return '';
}

export const getVideos = async (): Promise<ProcessedVideo[]> => {
  const [categories, authors] = await Promise.all([getCategories(), getAuthors()])

  let key = 0;

  const videos = authors.flatMap((author: Author) => {
    const video = author.videos.map((video: Video) => {
      key++;
      const { id, name, formats, releaseDate } = video;
      return {
        key,
        id,
        name,
        author: author.name,
        authorId: author.id,
        categories: categories.filter((category) => video.catIds.includes(category.id)).map((category) => category.name).join(', '),
        format: findFormat(formats),
        releaseDate
    }});
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