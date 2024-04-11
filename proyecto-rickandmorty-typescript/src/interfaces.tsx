export interface CharData {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: null;
  };
  results: CharObject[];
}

export interface CharObject {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}

export interface CharListProps {
  chars: CharData;
  name: string;
  isAlive: boolean;
  isDead: boolean;
}
