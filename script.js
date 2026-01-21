let container = document.querySelector(".container");
let songinfo = document.querySelector(".songinfo");
let previous = document.querySelector(".previous");
let play = document.querySelector(".play span");
let next = document.querySelector(".next");

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);

  return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
}

let audio = new Audio();
let currentSong = [];
let currentIndex = -1;
let songs = [
  "Song (1).mp3",
  "Song (2).mp3",
  "Song (3).mp3",
  "Song (4).mp3",
  "Song (5).mp3",
  "Song (6).mp3",
  "Song (7).mp3",
  "Song (8).mp3",
  "Song (9).mp3",
  "Song (10).mp3",
  "Song (11).mp3",
  "Song (12).mp3",
  "Song (8).mp3",
  "Song (9).mp3",
  "Song (10).mp3",
  "Song (11).mp3",
  "Song (12).mp3",
];

songs.forEach((e, index) => {
  let div = document.createElement("div");
  div.innerHTML = `
  <span class="material-symbols-outlined">
    audio_file
  </span>
    ${e}
    <span class="material-symbols-outlined sidebarplayicon" style="font-size: 28px;">
        play_arrow
    </span>`;

  document.querySelector(".divContainer").appendChild(div);
  div.addEventListener("click", (e) => {
    playMusic(index);
  });
});

play.addEventListener("click", () => {
  document.querySelector(".songPoster").style.display = "flex";
  if (currentIndex === -1) {
    currentIndex = 0;
    audio.src = `ncs/${songs[currentIndex]}`;
    audio.load();
    audio.play();
    play.innerText = "pause";
    songinfo.innerText = `${songs[currentIndex]}`;

    // update sidebar icon
    document.querySelectorAll(".sidebarplayicon")[currentIndex].innerText =
      "pause";
  } else {
    playMusic(currentIndex);
  }
});

previous.addEventListener("click", () => {
  if (currentIndex > 0) {
    playMusic(currentIndex - 1);
    console.log("previous button clicked Playing: ", songs[currentIndex]);

    return;
  }
});

next.addEventListener("click", () => {
  if (currentIndex < songs.length - 1) {
    playMusic(currentIndex + 1);
    console.log("next button clicked Playing: ", songs[currentIndex]);
    return;
  }
});

function playMusic(index) {
  document.querySelectorAll(".sidebarplayicon").forEach((e) => {
    e.innerText = "play_arrow";
  });
  let alldiv = document.querySelectorAll(".divContainer > div");
  let currentIcon = alldiv[index].querySelector(".sidebarplayicon");

  if (currentIndex === index) {
    if (audio.paused) {
      audio.play();
      play.innerText = "pause";
      currentIcon.innerText = "pause";
    } else {
      audio.pause();
      play.innerText = "play_arrow";
      currentIcon.innerText = "play_arrow";
    }
    return;
  }
  currentIndex = index;
  audio.src = `ncs/${songs[currentIndex]}`;
  audio.play();
  play.innerText = "pause";
  songinfo.innerText = `${songs[currentIndex]}`;
  currentIcon.innerText = "pause";
  console.log("Playing: ", songs[currentIndex]);
  document.querySelector(".songPoster").style.display = "flex";
}
audio.addEventListener("timeupdate", () => {
  document.querySelector(".time").innerHTML = `${formatTime(
    audio.currentTime
  )} / ${formatTime(audio.duration)}`;
  document.querySelector(".circle").style.left =
    (audio.currentTime / audio.duration) * 100 + "%";
});

document.querySelector(".seekbar").addEventListener("click", (e) => {
  let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
  document.querySelector(".circle").style.left = percent + "%";
  audio.currentTime = (audio.duration * percent) / 100;
});
