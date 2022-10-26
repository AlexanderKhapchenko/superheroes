import { Image } from './image.type';

type Superhero = {
  id: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images: Image[] | [];
};

export type { Superhero };
