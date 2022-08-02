export type Category = {
    id: number;
    name: string;
  }
  
  export type Video = {
    id: number;
    catIds: number[];
    name: string;
    releaseDate: string;
    formats: Object;
  }
  
  export type Author = {
    id: number;
    name: string;
    videos: Video[];
  }
  
  export type ProcessedVideo = {
    key: number;
    id: number;
    name: string;
    authorId: number;
    author: string;
    categories: string;
    format: string;
    releaseDate: string;
  }