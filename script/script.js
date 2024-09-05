const messages = [
     "Thank you for being an inspiring teacher.",
     "You make learning a joy and foster a love for knowledge.",
     "Your guidance has made a huge difference in our lives.",
     "May your day be filled with the same joy and inspiration you bring to others.",
     "Your positive impact on our lives is immeasurable and deeply appreciated.",
     "Your support and encouragement have helped us reach new heights.",
     "Wishing you a Happy Teacher's Day filled with love and joy!"
   ];
   

   let i = 0;
   let j = 0;
   let currentMessage = [];
   let isDeleting = false;
   let isEnd = false;
   
   const audioPlayer = document.getElementById('audio-player');
   const playPauseBtn = document.getElementById('play-pause');
   const nextBtn = document.getElementById('next');
   const prevBtn = document.getElementById('prev');
   
   const songs = [
     'music/song1.mp3',
     'music/song2.mp3',
     'music/song3.mp3',
     'music/song4.mp3',
     'music/song5.mp3',
     'music/song6.mp3',
     'music/song7.mp3',
     'music/song8.mp3'
   ];
   
   let currentSongIndex = 0;
   
   function playSong(index) {
     audioPlayer.src = songs[index];
     audioPlayer.play();
   }
   
   function loop() {
     isEnd = false;
     document.getElementById("typed-message").innerHTML = currentMessage.join("") + (isDeleting ? '|' : '');
   
     if (i < messages.length) {
       if (!isDeleting && j <= messages[i].length) {
         currentMessage.push(messages[i][j]);
         j++;
       }
   
       if (isDeleting && j <= messages[i].length) {
         currentMessage.pop();
         j--;
       }
   
       if (j === messages[i].length) {
         isEnd = true;
         isDeleting = true;
       }
   
       if (isDeleting && j === 0) {
         currentMessage = [];
         isDeleting = false;
         i++;
         if (i === messages.length) {
           i = 0;
         }
       }
     }
   
     // Faster typing and deleting speeds
     const speedUp = Math.random() * (150 - 100) + 100; // Faster typing speed
     const normalSpeed = Math.random() * (300 - 150) + 150; // Faster deleting speed
     const time = isEnd ? 2000 : isDeleting ? speedUp : normalSpeed;
     setTimeout(loop, time);
   }
   
   function createConfetti() {
     const confettiContainer = document.querySelector('.confetti');
     const colors = ['#ff6f61', '#d4a5a5', '#ffeb3b', '#00c6ff', '#90ee90', '#ff7e79'];
     const numConfetti = 200;
   
     for (let i = 0; i < numConfetti; i++) {
       const confettiPiece = document.createElement('div');
       confettiPiece.className = 'confetti-piece';
       const size = Math.random() * 15 + 5; // Size between 5px and 20px
       confettiPiece.style.width = `${size}px`;
       confettiPiece.style.height = `${size}px`;
       confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
       confettiPiece.style.top = `${Math.random() * 100}vh`;
       confettiPiece.style.left = `${Math.random() * 100}vw`;
       confettiPiece.style.opacity = Math.random();
       confettiPiece.style.transform = `rotate(${Math.random() * 360}deg)`; // Spinning effect
       confettiContainer.appendChild(confettiPiece);
     }
   }
   
   document.addEventListener("DOMContentLoaded", () => {
     loop();
     playSong(currentSongIndex);
     createConfetti();
   
     playPauseBtn.addEventListener('click', () => {
       if (audioPlayer.paused) {
         audioPlayer.play();
         playPauseBtn.textContent = 'Pause';
       } else {
         audioPlayer.pause();
         playPauseBtn.textContent = 'Play';
       }
     });
   
     nextBtn.addEventListener('click', () => {
       currentSongIndex = (currentSongIndex + 1) % songs.length;
       playSong(currentSongIndex);
     });
   
     prevBtn.addEventListener('click', () => {
       currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
       playSong(currentSongIndex);
     });
   
     audioPlayer.addEventListener('ended', () => {
       currentSongIndex = (currentSongIndex + 1) % songs.length;
       playSong(currentSongIndex);
     });
   });
   
