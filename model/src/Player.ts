export type Player = {
  id: string;
  displayName: string;
  rating: PlayerRating;
};

/**
 * ELO style rating
 */
export type PlayerRating = number;
