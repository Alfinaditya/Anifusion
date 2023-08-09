export interface Anime {
  pagination: Pagination;
  data: Daum[];
}

interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: Items;
}

interface Items {
  count: number;
  total: number;
  per_page: number;
}

interface Daum {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english?: string;
  title_japanese?: string;
  title_synonyms: string[];
  type?: string;
  source: string;
  episodes?: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating?: string;
  score: any;
  scored_by: any;
  rank: any;
  popularity: number;
  members: number;
  favorites: number;
  synopsis?: string;
  background: any;
  season: any;
  year: any;
  broadcast: Broadcast;
  producers: Producer[];
  licensors: any[];
  studios: Studio[];
  genres: Genre[];
  explicit_genres: any[];
  themes: Theme[];
  demographics: Demographic[];
}

interface Images {
  jpg: Jpg;
  webp: Webp;
}

interface Jpg {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface Webp {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface Trailer {
  youtube_id?: string;
  url?: string;
  embed_url?: string;
  images: Images2;
}

interface Images2 {
  image_url?: string;
  small_image_url?: string;
  medium_image_url?: string;
  large_image_url?: string;
  maximum_image_url?: string;
}

interface Title {
  type: string;
  title: string;
}

interface Aired {
  from?: string;
  to: any;
  prop: Prop;
  string: string;
}

interface Prop {
  from: From;
  to: To;
}

interface From {
  day?: number;
  month?: number;
  year?: number;
}

interface To {
  day: any;
  month: any;
  year: any;
}

interface Broadcast {
  day: any;
  time: any;
  timezone: any;
  string?: string;
}

interface Producer {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Studio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Theme {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Demographic {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}
