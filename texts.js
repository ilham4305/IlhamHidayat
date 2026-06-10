export const PASSAGES = [
  "The quick brown fox jumps over the lazy dog. Practice makes perfect when you type every day.",
  "Programming is the art of telling another human what one wants the computer to do.",
  "GitHub Pages lets you host static websites directly from a repository for free.",
  "Speed and accuracy both matter. Focus on smooth rhythm rather than frantic key presses.",
  "A journey of a thousand miles begins with a single step, and a fast typist starts with home row.",
  "Clean code is not written by following a set of rules. It is written by someone who cares.",
  "The best time to plant a tree was twenty years ago. The second best time is now.",
  "Learning to touch type is one of the highest leverage skills for anyone who works on a computer.",
];

export function randomPassage() {
  return PASSAGES[Math.floor(Math.random() * PASSAGES.length)];
}
