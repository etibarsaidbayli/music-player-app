import "./style.css";
import { musicList } from "./list";
const audio = document.getElementById("music");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const durationSpan = document.getElementById("duration");
const currentTimeSpan = document.getElementById("current-time");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const image = document.getElementById("image");

function getMusic() {
  let isPlaying = playBtn.classList.contains("fa-play");
  if (isPlaying) {
    playMusic();
  } else {
    pauseMusic();
  }
}

function playMusic() {
  audio.play();
  playBtn.classList.replace("fa-play", "fa-pause");
}

function pauseMusic() {
  audio.pause();
  playBtn.classList.replace("fa-pause", "fa-play");
}

playBtn.addEventListener("click", getMusic);

function getDuration(time) {
  const minutes = Math.trunc(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.trunc(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

setTimeout(() => {
  durationSpan.textContent = getDuration(audio.duration);
}, 500);

audio.addEventListener("timeupdate", function () {
  const { currentTime, duration } = audio;
  currentTimeSpan.innerText = getDuration(audio.currentTime);
  const persentage = (currentTime / duration) * 100;
  progress.style.width = persentage + "%";
});

progressContainer.addEventListener("click", function (event) {
  const percent = (event.offsetX / progressContainer.clientWidth) * 100;
  const timeToGo = (audio.duration * percent) / 100;
  audio.currentTime = timeToGo;
});

// load music //
let currentIndex = 0;

function loadMusic(index) {
  const currentMusic = musicList[index];
  artist.innerText = currentMusic.artist;
  title.innerText = currentMusic.title;
  audio.src = currentMusic.audio;
  image.src = currentMusic.image;
  pauseMusic();
  progress.style.width = "0%";
}

loadMusic(currentIndex);

nextBtn.addEventListener("click", getNextMusic);
prevBtn.addEventListener("click", getPrevMusic);

function getNextMusic() {
  currentIndex++;
  if (currentIndex > musicList.length - 1) {
    currentIndex = 0;
  }
  durationSpan.innerText = getDuration(audio.duration);
  loadMusic(currentIndex);
}

function getPrevMusic() {
  if (currentIndex < 0) {
    currentIndex = musicList.length - 1;
  }
  durationSpan.innerText = getDuration(audio.duration);
  currentIndex--;
  loadMusic(currentIndex);
}
