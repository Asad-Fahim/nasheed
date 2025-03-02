const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const nextButton = document.querySelector(".controls button.forward");
const prevButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".Nasheed-player h1");
const artistName = document.querySelector(".Nasheed-player p");

const welcomePopup = document.getElementById("welcomePopup");
const closePopupButton = document.getElementById("closePopup");

const songs = [
    { title: "The Way of Tears", name: "Glitch.Nasheed.Library", source: "The-way-of-tears.mp3" },
    { title: "Ya Quluban", name: "Glitch.Nasheed.Library", source: "yaquluba.mp3" },
    { title: "For My Lord", name: "Glitch.Nasheed.Library", source: "for my lord.mp3" },
    { title: "My Hope", name: "Glitch.Nasheed.Library", source: "my hope.mp3" },
    { title: "Ya Ummi", name: "Glitch.Nasheed.Library", source: "Ya Ummi.mp3" },
    { title: "I Rise", name: "Glitch.Nasheed.Library", source: "I Rise.mp3" },
    { title: "Hona Marro", name: "Glitch.Nasheed.Library", source: "Hona Marro.mp3" },
    { title: "Allahu Ya'lamu", name: "Glitch.Nasheed.Library", source: "الله يعلم.mp3" },
    { title: "Tabalagh Bil Qalil", name: "Glitch.Nasheed.Library", source: "qalil.mp3" },
    { title: "Ya Aseer", name: "Glitch.Nasheed.Library", source: "Ya Aseer.mp3" },
    { title: "Ana Maradun", name: "Glitch.Nasheed.Library", source: "Ana Maradun.mp3" },
    { title: "Hasn't Death Called You", name: "Glitch.Nasheed.Library", source: "Hasn't Death Called You.mp3" },
    { title: "Fataat Al Khair", name: "Glitch.Nasheed.Library", source: "Fataat Al Khair.mp3" },
    { title: "Ya Adheem", name: "Glitch.Nasheed.Library", source: "Ya Adheem.mp3" },
    { title: "Taweel Al-Shawq", name: "Glitch.Nasheed.Library", source: "Taweel Al Shawq.mp3" },
    { title: "Grieving Cry", name: "Glitch.Nasheed.Library", source: "Grieving Cry.mp3" },
    { title: "Habbat Krryh", name: "Glitch.Nasheed.Library", source: "Habbat Krryh.mp3" },
    { title: "Jaljalat", name: "Glitch.Nasheed.Library", source: "Jaljalat.mp3" },
    { title: "Salaktu Tariqi", name: "Glitch.Nasheed.Library", source: "Salaktu Tariqi.mp3" },
    { title: "Sirna", name: "Glitch.Nasheed.Library", source: "Sirna.mp3" },
    { title: "Ummat Al Islami", name: "Glitch.Nasheed.Library", source: "Ummat Al Islami.mp3" },
    { title: "Ya Shahida", name: "Glitch.Nasheed.Library", source: "Ya Shahida.mp3" }
    
];

let currentSongIndex = 3;

function closePopup() {
    welcomePopup.style.animation = "fadeOut 0.5s forwards";
    setTimeout(() => {
        welcomePopup.style.display = "none";
    }, 500); 
}

closePopupButton.addEventListener("click", closePopup);

setTimeout(closePopup, 10000);

function updateSongInfo() {
    songName.textContent = songs[currentSongIndex].title;
    artistName.textContent = songs[currentSongIndex].name;
    song.src = songs[currentSongIndex].source;
}

song.addEventListener("timeupdate", () => {
    if (!song.paused) {
        progress.value = song.currentTime;
    }
});

song.addEventListener("loadedmetadata", () => {
    progress.max = song.duration;
    progress.value = song.currentTime;
});

song.addEventListener("ended", () => {
    currentSongIndex = (swiper.activeIndex + 1) % songs.length;
    updateSongInfo();
    swiper.slideTo(currentSongIndex);
    playSong();
});

function pauseSong() {
    song.pause();
    controlIcon.classList.remove("fa-pause");
    controlIcon.classList.add("fa-play");
}

function playSong() {
    song.play();
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
}

function playPause() {
    if (song.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", () => {
    song.currentTime = progress.value;
});

progress.addEventListener("change", () => {
    playSong();
});

nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 0) % songs.length;
    updateSongInfo();
    swiper.slideTo(currentSongIndex);
    playPause();
});

prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 0 + songs.length) % songs.length;
    updateSongInfo();
    swiper.slideTo(currentSongIndex);
    playPause();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    centeredSlides: true,
    initialSlide: 3,
    slidesPerView: "auto",
    grabCursor: true,
    spaceBetween: 40,
    coverflowEffect: {
        rotate: 25,
        stretch: 0,
        depth: 50,
        modifier: 1,
        slideShadows: false,
    },
    navigation: {
        nextEl: ".forward",
        prevEl: ".backward",
    },
});

swiper.on("slideChange", () => {
    currentSongIndex = swiper.activeIndex;
    updateSongInfo();
    pauseSong();
}); 




