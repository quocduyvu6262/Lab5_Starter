// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  // Populate voice list
  const synth = window.speechSynthesis;
  let voices = [];
  const voiceSelect = document.querySelector("#explore select");
  function populateVoiceList(){
    voices = synth.getVoices();
    for (let i = 0; i < voices.length ; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += ' — DEFAULT';
      }

      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  // Textarea
  const input = document.getElementById("text-to-speak");
  let values = null;
  input.addEventListener('input',(event) => {
    values = event.target.value;
  })

  // Press to talk
  const button = document.querySelector("#explore button");
  const select = document.getElementById("voice-select");
  button.addEventListener('click', (event) => {
    const selectedVoice = select.selectedOptions[0].getAttribute('data-name');
    const image = document.querySelector("#explore img");
    if(values != null && selectedVoice != null){
      const utterThis = new SpeechSynthesisUtterance(values);
      for (let i = 0; i < voices.length ; i++) {
        if (voices[i].name === selectedVoice) {
          utterThis.voice = voices[i];
        }
      }
      synth.speak(utterThis);
      let whileSpeaking = setInterval(() => {
        if(synth.speaking){
          image.src = "assets/images/smiling-open.png"
        } else {
          image.src = "assets/images/smiling.png"
        }
      }, 500);
    }
  })

}