console.log("Welcome to spotify");


//initializing variables
let songIndex=0;
let audioElement= new Audio("songs/1.mp3");
let masterPlay=document.getElementById('masterPlay');
let ProgressBar=document.getElementById('ProgressBar');
let gif=document.getElementById("gif");
let masterSongName = document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName("songItem"));

let songs=[
    {songName:"Still with you", filePath:"songs/1.mp3", coverPath:"covers/1.jpeg"},
    {songName:"Kesariya", filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName:"manwa lage", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName:"jab tak", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName:"pehla pyar", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName:"Still", filePath:"songs/1.mp3", coverPath:"covers/1.jpeg"}
]
songItems.forEach((element, i)=>{
   
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName;
 
});

//handle paly/pause
masterPlay.addEventListener('click', ()=>{
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
       
    }
});

//listen to events
audioElement.addEventListener('timeupdate', ()=> {
    
    progess=parseInt(audioElement.currentTime/audioElement.duration*100);
    ProgressBar.value=progess;
});

ProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime=ProgressBar.value/100*audioElement.duration;

});

const makeAllPlays = ()=>{
    
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((ele)=>{
        ele.classList.remove("fa-circle-pause");
        ele.classList.add("fa-circle-play");
    })
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, i)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add("fa-circle-pause");
        audioElement.src=  `songs/${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add("fa-circle-pause");

    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if (songIndex>5){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=  `songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add("fa-circle-pause");
});
document.getElementById('previous').addEventListener('click', ()=>{
    if (songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=  `songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add("fa-circle-pause");
});