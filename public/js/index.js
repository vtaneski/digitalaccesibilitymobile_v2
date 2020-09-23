$(document).ready(function () {
  const AUDIO1 = "audio/(1) Živko Marušič - Sanje.mp3";
  const AUDIO2 = "audio/(2) Petra Varl - Plavalka.mp3";
  const AUDIO3 = "audio/(3) Nataša Prosenc Stearns - Obala.mp3";
  const AUDIO4 = "audio/(4) Elsa Oeltjen Kasimir - Čoln.mp3";
  const AUDIO5 = "audio/(5) Ivan Grohar - Kapelica.mp3";
  const AUDIO6 = "audio/(6) Avgusta Šantel ml. - Cvetje v vazi.mp3";
  const AUDIO7 = "audio/(7) Ivan Kos - Deklica z oranžo.mp3";
  const AUDIO8 = "audio/(8) Tone Kralj - Moja žena.mp3";
  const AUDIO9 = "audio/(9) Jakob Savinšek - Portret H..mp3";
  const AUDIO10 = "audio/(10) Rudolf Kotnik - Razkosano polje.mp3";
  const AUDIO11 = "audio/(11) Metka Krašovec - Rastoča voda.mp3";
  const AUDIO12 = "audio/(12) Slavko Tihec - Akvamobil.mp3";
  const AUDIO13 = "audio/(13) Dragica Čadež - Različice gubanja.mp3";
  const AUDIO14 = "audio/(14) Miran Mišo Hochstätter - Nature morte No. 2.mp3";
  const AUDIO15 = "audio/(15) Janko Andrej Jelnikar - Človek brez glave.mp3";
  const AUDIO16 = "audio/(16) Metka Kavčič - Prt.mp3";
  const AUDIO17 = "audio/(17) Zdenko Huzjan - Vzglavnik zemlje in neba.mp3";
  const AUDIO18 = "audio/(18) Sandi Červek - Slika.mp3";
  const AUDIO19 = "audio/(19) Darko Golija - Lega sesanja.mp3";

  const sound1 = new Audio(AUDIO1);
  const sound2 = new Audio(AUDIO2);
  const sound3 = new Audio(AUDIO3);
  const sound4 = new Audio(AUDIO4);
  const sound5 = new Audio(AUDIO5);
  const sound6 = new Audio(AUDIO6);
  const sound7 = new Audio(AUDIO7);
  const sound8 = new Audio(AUDIO8);
  const sound9 = new Audio(AUDIO9);
  const sound10 = new Audio(AUDIO10);
  const sound11 = new Audio(AUDIO11);
  const sound12 = new Audio(AUDIO12);
  const sound13 = new Audio(AUDIO13);
  const sound14 = new Audio(AUDIO14);
  const sound15 = new Audio(AUDIO15);
  const sound16 = new Audio(AUDIO16);
  const sound17 = new Audio(AUDIO17);
  const sound18 = new Audio(AUDIO18);
  const sound19 = new Audio(AUDIO19);

  const soundTxtArray = [
    "Živko Marušič - Sanje",
    "Petra Varl - Plavalka",
    "Nataša Prosenc Stearns - Obala",
    "Elsa Oeltjen Kasimir - Čoln",
    "Ivan Grohar - Kapelica", 
    "Avgusta Šantel ml. - Cvetje v vazi", 
    "Ivan Kos - Deklica z oranžo", 
    "Tone Kralj - Moja žena",
    "Jakob Savinšek - Portret H.",
    "Rudolf Kotnik - Razkosano polje",
    "Metka Krašovec - Rastoča voda",
    "Slavko Tihec - Akvamobil / Kinetični objekt: Koncentrumi III",
    "Dragica Čadež - iz cikla Različice gubanja",
    "Miran Mišo Hochstätter - Nature morte, No. 2",
    "Janko Andrej Jelnikar - Brezglavi / Človek brez glave",
    "Metka Kavčič - Prt",
    "Zdenko Huzjan - Vzglavnik zemlje in neba",
    "Sandi Červek - Slika",
    "Darko Golija - Lega sesanja"
  ];
  const soundsArray = [
    sound1,
    sound2,
    sound3,
    sound4,
    sound5,
    sound6,
    sound7,
    sound8,
    sound9,
    sound10,
    sound11,
    sound12,
    sound13,
    sound14,
    sound15,
    sound16,
    sound17,
    sound18,
    sound19];
  let currentSoundID = 0;
  let soundPlaying = false;

  loadFirstSound();

  // basic play and stop functions
  function playSound(sound, id) {
    id++;
    let promise = sound.play();
    $("#play" + id).hide();
    $("#pause" + id).show();
    $("#text" + id).text(soundTxtArray[id-1]);

    if (promise !== undefined) {
      promise
        .then((_) => {
          // Autoplay started!
          soundPlaying = true;
        })
        .catch((error) => {
          // Autoplay was prevented.
          // Show a "Play" button so that user can start playback.
          console.log(error);
          soundPlaying = false;
          $("#play" + id).show();
          $("#pause" + id).hide();
        });
    }
  }

  function stopSound(sound, id) {
    id++;
    sound.pause();
    $("#play" + id).show();
    $("#pause" + id).hide();
    //sound.currentTime = 0;
    soundPlaying = false;
  }

  function loadFirstSound() {
    playSound(soundsArray[currentSoundID], currentSoundID);
  }

  $("#mainDiv").on("tap", function (event) {
    let sound = soundsArray[currentSoundID];
    if (soundPlaying) {
      stopSound(sound, currentSoundID);
    } else {
      playSound(sound, currentSoundID);
    }

    event.preventDefault();
  });

  $("#mainDiv").on("swipeleft", function () {
    // first hide the current tile
    const hideID = currentSoundID + 1;
    $("#" + hideID).addClass("hidden");

    // remove the current indicator at the bottom
    $("#li" + hideID).removeClass("active");

    stopSound(soundsArray[currentSoundID]);
    if (currentSoundID < soundsArray.length - 1) currentSoundID++;
    if (currentSoundID < soundsArray.length) {
      playSound(soundsArray[currentSoundID], currentSoundID);

      // show the new tile
      const showID = currentSoundID + 1;
      $("#" + showID).removeClass("hidden");

      // set the new indicator at the bottom
      $("#li" + showID).addClass("active");

      $("#text" + showID).text(soundTxtArray[currentSoundID]);
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
      playSound(soundsArray[currentSoundID], currentSoundID);

      // show the new tile
      const showID = currentSoundID + 1;
      $("#" + showID).removeClass("hidden");

      // set the new indicator at the bottom
      $("#li" + showID).addClass("active");

      $("#text" + showID).text(soundTxtArray[currentSoundID]);
    }
  });
});
