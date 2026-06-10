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
//Deklarasi `export` digunakan untuk mengekspor nilai dari modul JavaScript. Nilai yang diekspor kemudian dapat diimpor ke program lain dengan deklarasi `import` atau impor dinamis. Nilai dari binding yang diimpor dapat berubah di modul yang mengekspornya — ketika sebuah modul memperbarui nilai binding yang diekspornya, pembaruan tersebut akan terlihat pada nilai yang diimpor.
//Untuk menggunakan deklarasi `export` dalam file sumber, file tersebut harus diinterpretasikan oleh runtime sebagai modul. Dalam HTML, ini dilakukan dengan menambahkan `type="module"` ke tag `<script>`, atau dengan diimpor oleh modul lain. Modul secara otomatis diinterpretasikan dalam mode ketat.
//sumbernya : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
export function randomPassage() {
  return PASSAGES[Math.floor(Math.random() * PASSAGES.length)];
}
