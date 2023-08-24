const music = document.getElementById('music');
const datalist = document.getElementById('datalist');
const input = document.getElementById('user-input');
const scoreText = document.getElementById('score');
let songsList = new Object();
let currentSong = '';
let fails = 0;
let score = 0;
music.volume = 0.5;


const Cancel = () => {
    input.value = '';
}

const TogglePause = () => {
    music.paused ? music.play() : music.pause();
}

const Submit = () => {
    (currentSong == (input.value+'.m4a')) ? Win() : Fail()
}

const GetHint = () => {
    console.log(songsList);
}

const SetSong = () => {
    id = Math.floor(Math.random() * (Object.keys(songsList).length-1));
    currentSong = songsList[id]
    music.src = `audio/${currentSong}`;
}

const ChangeVolume = () => {
    music.volume = document.getElementById('slider').value / 10;
}

const Fail = () => {
    fails += 1;
    document.getElementById(`guess-${fails}`).src = 'img/fail.png';
    (fails >= 5) ? GameOver() : {};
}

const GameOver = () => {
    location.reload();
}

const Win = () => {
    score += 1;
    scoreText.textContent = `Score ${score}`;
    SetSong();
    Cancel();
}


const GamePreparation = () => {
    SetSong();

    for (let index in songsList) {
        let songOption = document.createElement('option');
        songOption.value = songsList[index].replace('.m4a','');
        datalist.appendChild(songOption);
    }
}

const SaveSongsJson = () => {
    fetch("songs.json")
    .then(response => response.json())
    .then(json => songsList = json[0]);
}

SaveSongsJson();
setTimeout(() => GamePreparation(), 500);
