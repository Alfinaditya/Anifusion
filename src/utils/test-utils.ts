import { Anime } from '@/types/animes';

export function validateAnime(anime: Anime) {
  expect(anime).toHaveProperty('mal_id');
  expect(typeof anime.mal_id).toBe('number');

  // Validate URLs with regex
  const urlRegex = /^https:\/\/\S+/;
  expect(anime).toHaveProperty('url');
  expect(anime.url).toMatch(urlRegex);

  expect(anime).toHaveProperty('score');
  expect(anime.score).toBeOneOf([null, expect.any(Number)]);

  expect(anime).toHaveProperty('status');
  expect(typeof anime.status).toBe('string');

  expect(anime).toHaveProperty('type');
  expect(anime.type).toBeOneOf([null, expect.any(String)]);

  expect(anime).toHaveProperty('source');
  expect(typeof anime.source).toBe('string');

  expect(anime).toHaveProperty('episodes');
  expect(anime.episodes).toBeOneOf([null, expect.any(Number)]);

  expect(anime).toHaveProperty('duration');
  expect(typeof anime.duration).toBe('string');

  expect(anime).toHaveProperty('airing');
  expect(typeof anime.airing).toBe('boolean');

  expect(anime).toHaveProperty('rating');
  expect(anime.rating).toBeOneOf([null, expect.any(String)]);

  expect(anime).toHaveProperty('scored_by');
  expect(anime.scored_by).toBeOneOf([null, expect.any(Number)]);

  expect(anime).toHaveProperty('rank');
  expect(anime.rank).toBeOneOf([null, expect.any(Number)]);

  expect(anime).toHaveProperty('popularity');
  expect(typeof anime.popularity).toBe('number');

  expect(anime).toHaveProperty('members');
  expect(typeof anime.members).toBe('number');

  expect(anime).toHaveProperty('favorites');
  expect(typeof anime.favorites).toBe('number');

  expect(anime).toHaveProperty('synopsis');
  expect(anime.synopsis).toBeOneOf([null, expect.any(String)]);

  expect(anime).toHaveProperty('background');
  expect(anime.background).toBeOneOf([null, expect.any(String)]);

  expect(anime).toHaveProperty('season');
  expect(anime.season).toBeOneOf([null, expect.any(String)]);

  expect(anime).toHaveProperty('year');
  expect(anime.year).toBeOneOf([null, expect.any(Number)]);

  // Check 'images' object
  expect(anime.images).toBeDefined();
  expect(typeof anime.images).toBe('object');

  // jpg
  expect(anime.images).toHaveProperty('jpg');
  expect(anime.images.jpg).toHaveProperty('image_url');
  expect(anime.images.jpg).toHaveProperty('large_image_url');
  expect(anime.images.jpg).toHaveProperty('small_image_url');

  // webp
  expect(anime.images).toHaveProperty('webp');
  expect(anime.images.webp).toHaveProperty('image_url');
  expect(anime.images.webp).toHaveProperty('large_image_url');
  expect(anime.images.webp).toHaveProperty('small_image_url');

  // Title
  expect(anime.title).toBeDefined();
  expect(typeof anime.title).toBe('string');

  expect(anime.title_english).toBeDefined();
  expect(anime.title_english).toBeOneOf([null, expect.any(String)]);

  expect(anime.title_japanese).toBeDefined();
  expect(anime.title_japanese).toBeOneOf([null, expect.any(String)]);

  expect(anime.titles).toBeDefined();
  expect(Array.isArray(anime.titles)).toBe(true);
  anime.titles.forEach((title: { type: string; title: string }) => {
    expect(title).toBeDefined();
    expect(typeof title).toBe('object');
    expect(title).toHaveProperty('type');
    expect(typeof title.type).toBe('string');
    expect(title).toHaveProperty('title');
    expect(typeof title.title).toBe('string');
  });

  expect(anime.trailer).toBeDefined();
  expect(anime.aired).toBeDefined();
}
