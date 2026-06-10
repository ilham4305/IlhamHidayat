import { randomPassage } from "./texts.js";

// Fungsinya adalah : Jika tidak ada elemen dengan id yang diberikan, fungsi ini akan mengembalikan null. Perhatikan bahwa parameter id peka terhadap huruf besar dan kecil, sehingga document.getElementById("Main") akan mengembalikan null alih-alih elemen <div id="main"> karena "M" dan "m" berbeda untuk tujuan metode ini.

//Elemen yang tidak ada dalam dokumen tidak akan dicari oleh getElementById(). Saat membuat elemen dan menetapkan ID padanya, Anda harus memasukkan elemen tersebut ke dalam pohon dokumen dengan Node.insertBefore() atau metode serupa sebelum Anda dapat mengaksesnya dengan getElementById().

// sumbernya : https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById

const passageEl = document.getElementById("passage");
const inputEl = document.getElementById("input");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const timerEl = document.getElementById("timer");
const restartBtn = document.getElementById("restart");
const durationSelect = document.getElementById("duration");
const resultsEl = document.getElementById("results");
const resultWpmEl = document.getElementById("result-wpm");
const resultAccuracyEl = document.getElementById("result-accuracy");

let passage = "";
let timeLeft = 60;
let totalDuration = 60;
let timerId = null;
let started = false;
let finished = false;

//  Di SugarCube, fungsi `setPageElement()` merender isi sebuah bagian ke dalam sebuah elemen berdasa/rkan id-nya.
//Event ":passagedisplay" digunakan dalam contoh ini untuk memastikan bahwa bagian tersebut telah dirender sebelum tindakan dilakukan. Memanggil fungsi `setPageElement()` di dalam event listener jQuery kemudian merender bagian lain ke dalam elemen yang sudah ada.
//sumbernya : https://twinery.org/cookbook/passagetoelement/sugarcube/sugarcube_passagetoelement.html
function renderPassage() {
  const typed = inputEl.value;
  passageEl.innerHTML = "";

  for (let i = 0; i < passage.length; i++) {
    const span = document.createElement("span");
    span.classList.add("char");
    span.textContent = passage[i];

   // Properti `classList` yang hanya dapat dibaca pada antarmuka `Element` berisi koleksi `DOMTokenList` yang mewakili atribut kelas elemen. Ini kemudian dapat digunakan untuk memanipulasi daftar kelas. Menggunakan `classList` adalah alternatif yang nyaman untuk mengakses daftar kelas elemen sebagai string yang dipisahkan spasi melalui `element.className`. 
    // sumbernya : https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
    if (i < typed.length) {
      span.classList.add(typed[i] === passage[i] ? "correct" : "incorrect");
    } else if (i === typed.length) {
      span.classList.add("current");
    } else {
      span.classList.add("pending");
    }
// Metode appendChild() dari antarmuka Node menambahkan sebuah node ke akhir daftar anak dari node induk yang ditentukan. Catatan: Jika anak yang diberikan adalah referensi ke node yang sudah ada dalam dokumen, appendChild() akan memindahkannya dari posisi saat ini ke posisi baru.
  // sumbernya : https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
    passageEl.appendChild(span);
  }
}

function countStats() {
  const typed = inputEl.value;
  let correct = 0;

  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === passage[i]) correct++;
  }
// Deklarasi `const` mendeklarasikan variabel lokal yang terlingkup dalam blok. Nilai konstanta tidak dapat diubah melalui penugasan ulang menggunakan operator penugasan, tetapi jika konstanta tersebut berupa objek, propertinya dapat ditambahkan, diperbarui, atau dihapus.
//sumberny : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
  const accuracy = typed.length === 0 ? 100 : Math.round((correct / typed.length) * 100);
  const minutes = (totalDuration - timeLeft) / 60 || 1 / 60;
  const words = correct / 5;
  const wpm = Math.round(words / minutes);

  return { wpm, accuracy, correct, typed: typed.length };
}

function updateStats() {
  const { wpm, accuracy } = countStats();
  wpmEl.textContent = String(wpm);
  accuracyEl.textContent = String(accuracy);
}

function tick() {
  timeLeft -= 1;
  timerEl.textContent = String(timeLeft);

  if (timeLeft <= 0) {
    endTest();
  }
}

function startTimer() {
  if (started || finished) return;
  started = true;
  timerId = window.setInterval(tick, 1000);
}

function endTest() {
  if (finished) return;
  finished = true;
  clearInterval(timerId);
  inputEl.disabled = true;

  const { wpm, accuracy } = countStats();
  resultWpmEl.textContent = String(wpm);
  resultAccuracyEl.textContent = String(accuracy);
  resultsEl.classList.remove("hidden");
}

function resetTest() {
  clearInterval(timerId);
  passage = randomPassage();
  totalDuration = Number(durationSelect.value);
  timeLeft = totalDuration;
  started = false;
  finished = false;

  timerEl.textContent = String(timeLeft);
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100";
  inputEl.value = "";
  inputEl.disabled = false;
  resultsEl.classList.add("hidden");

  renderPassage();
  inputEl.focus();
}

// Metode addEventListener() dari antarmuka EventTarget mengatur sebuah fungsi yang akan dipanggil setiap kali peristiwa yang ditentukan dikirimkan ke target.
//Target umum adalah Element, atau anak-anaknya, Document, dan Window, tetapi target dapat berupa objek apa pun yang mendukung peristiwa (seperti IDBRequest).
//sumbernya : https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
inputEl.addEventListener("input", () => {
  if (finished) return;
  startTimer();
  renderPassage();
  updateStats();
  
//Properti data length dari nilai String berisi panjang string dalam satuan kode UTF-16.
//sumbernya : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length
  if (inputEl.value.length >= passage.length) {
    endTest();
  }
});

inputEl.addEventListener("keydown", (event) => {
  if (event.key === "Tab") event.preventDefault();
});

restartBtn.addEventListener("click", resetTest);

durationSelect.addEventListener("change", resetTest);

resetTest();
