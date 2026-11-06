import truncate from "lodash/truncate";

export function excerpt(string) {
  // Shorten long reviews
  return truncate(string, {    
    length: 400,
    separator: /,?\.* +/,
  });
}