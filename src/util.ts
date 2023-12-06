import { Comment } from './types/comment';

export const getRating = (rating: number) => Math.round(rating) / 5 * 100;

export const dateSorting = (a : Comment, b: Comment) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);

  return Number(dateB) - Number(dateA);
};
