import { BookOpenIcon, FilmIcon, HomeIcon } from '@/icons';

const UNVISITED_ICON_STYLE = 'w-6 h-6 text-white';
const VISITED_ICON_STYLE = 'w-6 h-6 text-main';

const UNVISITED_ICON_STYLE_MOBILE = 'w-7 h-7 text-white';
const VISITED_ICON_STYLE_MOBILE = 'w-7 h-7 text-main';

export const mobileNavLinks = [
  {
    text: 'Home',
    path: '/',
    unvisitedIcon: <HomeIcon className={UNVISITED_ICON_STYLE_MOBILE} />,
    visitedIcon: <HomeIcon className={VISITED_ICON_STYLE_MOBILE} />,
  },
  {
    text: 'Anime',
    path: '/anime',
    unvisitedIcon: <FilmIcon className={UNVISITED_ICON_STYLE_MOBILE} />,
    visitedIcon: <FilmIcon className={VISITED_ICON_STYLE_MOBILE} />,
  },
  {
    text: 'Manga',
    path: '/manga',
    unvisitedIcon: <BookOpenIcon className={UNVISITED_ICON_STYLE_MOBILE} />,
    visitedIcon: <BookOpenIcon className={VISITED_ICON_STYLE_MOBILE} />,
  },
];

export const navLinks = [
  {
    text: 'Home',
    path: '/',
    unvisitedIcon: <HomeIcon className={UNVISITED_ICON_STYLE} />,
    visitedIcon: <HomeIcon className={VISITED_ICON_STYLE} />,
  },
  {
    text: 'Anime',
    path: '/anime',
    unvisitedIcon: <FilmIcon className={UNVISITED_ICON_STYLE} />,
    visitedIcon: <FilmIcon className={VISITED_ICON_STYLE} />,
  },
  {
    text: 'Manga',
    path: '/manga',
    unvisitedIcon: <BookOpenIcon className={UNVISITED_ICON_STYLE} />,
    visitedIcon: <BookOpenIcon className={VISITED_ICON_STYLE} />,
  },
];
