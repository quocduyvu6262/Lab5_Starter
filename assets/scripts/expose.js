// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO

  const jsConfetti = new JSConfetti();
  // Change image
  const selectedHorn = document.getElementById("horn-select");
  selectedHorn.addEventListener('change', (event) => {
    const image = document.querySelector("#expose img");
    const audio = document.getElementsByClassName('hidden')[0];
    image.src = `assets/images/${event.target.value}.svg`;
    audio.src = `assets/audio/${event.target.value}.mp3`;
  });

  // Change volume
  const volumeSlide = document.getElementById("volume");
  volumeSlide.addEventListener('change', (event) => {
    const image = document.querySelector("#volume-controls img");
    const audio = document.getElementsByClassName('hidden')[0];
    const value = event.target.value;
    let level = 0;
    if(value >= 1 && value < 33) level = 1;
    if(value >= 33 && value < 67) level = 2;
    if(value >= 67) level = 3;
    image.src = `assets/icons/volume-level-${level}.svg`;
    audio.volume = value/100;
  })

  // Play sound
  const button = document.querySelector("#expose button");
  button.addEventListener('click', (event) => {
    const audio = document.querySelector("#expose audio");
    const horn = document.getElementById("horn-select").value;
    if(horn != "select"){
      audio.play();
      if(horn == "party-horn"){
        jsConfetti.addConfetti();
      }
    }
  })
}