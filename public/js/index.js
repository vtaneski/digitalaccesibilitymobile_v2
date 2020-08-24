$(document).ready(function () {
  const AUDIO1 = "audio/1_Živko Marušič, Sanje.mp3";
  const AUDIO2 = "audio/2_Petra Varl, Plavalka.mp3";
  const AUDIO3 = "audio/3_Ivan Grohar, Kapelica.mp3";
  const AUDIO4 = "audio/4_Avgusta Šantel ml., Cvetje v vazi.mp3";
  const AUDIO5 = "audio/5_Darko Golija, Lega sesanja.mp3";
  const AUDIO6 = "audio/6_Slavko Tihec, Akvamobil.mp3";
  const AUDIO7 = "audio/7_Zdenko Huzjan, Vzglavnik zemlje in neba.mp3";

  const sound1 = new Audio(AUDIO1);
  const sound2 = new Audio(AUDIO2);
  const sound3 = new Audio(AUDIO3);
  const sound4 = new Audio(AUDIO4);
  const sound5 = new Audio(AUDIO5);
  const sound6 = new Audio(AUDIO6);
  const sound7 = new Audio(AUDIO7);

  const soundTxtArray = [
    AUDIO1,
    AUDIO2,
    AUDIO3,
    AUDIO4,
    AUDIO5,
    AUDIO6,
    AUDIO7,
  ];
  const soundsArray = [sound1, sound2, sound3, sound4, sound5, sound6, sound7];
  let currentSoundID = 0;
  let soundPlaying = false;

  loadFirstSound();

  // basic play and stop functions
  function playSound(sound) {
    let promise = sound.play();

    if (promise !== undefined) {
      promise
        .then((_) => {
          // Autoplay started!
          soundPlaying = true;
          console.log("Sound playing: " + soundPlaying);
        })
        .catch((error) => {
          // Autoplay was prevented.
          // Show a "Play" button so that user can start playback.
          console.log(error);
          soundPlaying = false;
          console.log("Sound playing: " + soundPlaying);
        });
    }
  }

  function stopSound(sound) {
    sound.pause();
    //sound.currentTime = 0;
    soundPlaying = false;
    console.log("Sound playing: " + soundPlaying);
  }

  function loadFirstSound() {
    playSound(soundsArray[currentSoundID]);
    console.log(soundTxtArray[currentSoundID]);
  }

  $("#mainDiv").on("tap", function () {
    let sound = soundsArray[currentSoundID];
    if (soundPlaying) {
      stopSound(sound);
    } else {
      playSound(sound);
    }
  });

  $("#mainDiv").on("swipeleft", function () {
    // first hide the current tile
    const hideID = currentSoundID + 1;
    $("#" + hideID).addClass("hidden");

    // remove the current indicator at the bottom
    $("#li" + hideID).removeClass("active");

    stopSound(soundsArray[currentSoundID]);
    if (currentSoundID < 6) currentSoundID++;
    if (currentSoundID < 7) {
      playSound(soundsArray[currentSoundID]);
      console.log(soundTxtArray[currentSoundID]);

      // show the new tile
      const showID = currentSoundID + 1;
      $("#" + showID).removeClass("hidden");

      // set the new indicator at the bottom
      $("#li" + showID).addClass("active");

      console.log("HideID: " + hideID + " ShowID: " + showID);
    }
  });

  $("#mainDiv").on("swiperight", function () {
    // first hide the current tile
    const hideID = currentSoundID + 1;
    $("#" + hideID).addClass("hidden");

    // remove the current indicator at the bottom
    $("#li" + hideID).removeClass("active");

    stopSound(soundsArray[currentSoundID]);
    if (currentSoundID > 0) currentSoundID--;
    if (currentSoundID >= 0) {
      playSound(soundsArray[currentSoundID]);
      console.log(soundTxtArray[currentSoundID]);

      // show the new tile
      const showID = currentSoundID + 1;
      $("#" + showID).removeClass("hidden");

      // set the new indicator at the bottom
      $("#li" + showID).addClass("active");
    }
  });
});
