import { apiUrl } from '@/lib/consts';
import Animes, { AnimeDetails } from '@/types/animes';
import { validateAnime } from '@/utils/test-utils';

describe('Anime', () => {
  it('Anime with upcoming params', async () => {
    const res = await fetch(`${apiUrl}/anime?status=upcoming&limit=15`);
    const animes: Animes = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(animes.data)).toBe(true);
    animes.data.forEach((anime) => validateAnime(anime));
  });

  it('Search Anime', async () => {
    const res = await fetch(`${apiUrl}/anime?q=one piece`);
    const animes: Animes = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(animes.data)).toBe(true);
    animes.data.forEach((anime) => validateAnime(anime));
  });

  it('Filter Anime', async () => {
    const res = await fetch(
      `${apiUrl}/anime?status=complete&type=movie&rating=g&order_by=episodes&sort=asc`
    );
    const animes: Animes = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(animes.data)).toBe(true);
    animes.data.forEach((anime) => validateAnime(anime));
  });

  it('Filter With Search Anime', async () => {
    const res = await fetch(
      `${apiUrl}/anime?status=airing&type=tv&rating=pg13&order_by=popularity&sort=asc&page=1&q=One Piece`
    );
    const animes: Animes = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(animes.data)).toBe(true);
    animes.data.forEach((anime) => validateAnime(anime));
  });

  it('Paginate Anime', async () => {
    const res = await fetch(`${apiUrl}/anime?page=2`);
    const animes: Animes = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(animes.data)).toBe(true);
    animes.data.forEach((anime) => validateAnime(anime));
  });

  it('Paginate Anime With Filter Params', async () => {
    const res = await fetch(
      `${apiUrl}/anime?status=airing&type=tv&rating=g&order_by=title&sort=desc&page=2`
    );
    const animes: Animes = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(animes.data)).toBe(true);
    animes.data.forEach((anime) => validateAnime(anime));
  });

  it('Anime Details', async () => {
    const res = await fetch(`${apiUrl}/anime/1`);
    const animes: AnimeDetails = await res.json();
    expect(res.status).toBe(200);
    expect(typeof animes.data).toBe('object');
    validateAnime(animes.data);
  });
});
