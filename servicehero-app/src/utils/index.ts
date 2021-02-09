export const formatRating = num => {
  return num ? Math.round((num + Number.EPSILON) * 10) / 10 : 0;
};
