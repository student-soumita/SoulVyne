/* ================= AUDIO CONTROL ================= */

let introMusic = document.getElementById("introMusic");
let audioUnlocked = false;

function unlockAudio() {
  if (audioUnlocked) return;

  introMusic.volume = 0.5;
  introMusic.play().catch(() => {});
  audioUnlocked = true;

  document.getElementById("audioUnlock").remove();
}

window.addEventListener("click", unlockAudio);
window.addEventListener("touchstart", unlockAudio);

/* ================= SPLASH FLOW ================= */
window.addEventListener("load", () => {

  const splash = document.getElementById("splashScreen");

  // HIDE MAIN APP INITIALLY
  document.querySelector(".container").style.opacity = "0";

  // play intro music
  introMusic.play().catch(() => {});

  // KEEP SPLASH VISIBLE FIRST
  setTimeout(() => {

    splash.style.opacity = "0";

    setTimeout(() => {

      splash.style.display = "none";

      introMusic.pause();
      introMusic.currentTime = 0;

      // ❤️ NOW PLAY HEART INTRO
      playHeartIntro();

    }, 1000);

  }, 3500);

});
/*window.addEventListener("load", () => {

  const splash = document.getElementById("splashScreen");

  if (introMusic) {
    introMusic.play().catch(() => {});
  }

  setTimeout(() => {

    if (splash) {
      splash.style.opacity = "0";

      setTimeout(() => {
        splash.style.display = "none";

        // 🔥 IMPORTANT: SHOW LOGIN AFTER SPLASH
        document.getElementById("loginBox").style.display = "block";
        document.querySelector(".container").style.display = "none";

      }, 800);
    }

  }, 3500);
});*/

/* ================= LOGIN ================= */

function login() {
  let username = document.getElementById("username").value.trim().toLowerCase();
  let password = document.getElementById("password").value.trim();

  if (!username || !password) {
    document.getElementById("loginError").innerText = "Fill all fields";
    return;
  }

  // 1. Check if an account is already saved in the browser database
  let savedAccount = localStorage.getItem("masterUser");

  if (savedAccount) {
    let accountData = JSON.parse(savedAccount);

    /* 🔐 THE STRICT MATCH CHECK: Both name AND password must match perfectly */
    if (username !== accountData.username || password !== accountData.password) {
      document.getElementById("loginError").innerText = "Invalid Username or Password! ❌";
      return; // Stop right here, reject login!
    }
  } else {
    // First time login: Create and lock in the permanent username and password
    localStorage.setItem("masterUser", JSON.stringify({ username, password }));
  }

  // 2. Set active session tracking so they stay logged in on page refresh
  localStorage.setItem("sessionActive", "true");

  // ✅ STOP INTRO MUSIC IMMEDIATELY ON LOGIN (FORCE ABSOLUTE SILENCE)
  const intro = document.getElementById("introMusic");
  if (intro) {
    intro.pause();
    intro.muted = true;          // Failsafe 1: Mute completely
    intro.volume = 0;            // Failsafe 2: Drop volume to zero
    intro.currentTime = 0;       // Rewind to start
  }
  
  const sound = document.getElementById("introSound");
  if (sound) {
    sound.pause();
    sound.muted = true;          // Failsafe 1: Mute completely
    sound.volume = 0;            // Failsafe 2: Drop volume to zero
    sound.currentTime = 0;       // Rewind to start
  }
  
  startHeartRain(); 
  showApp();
}
function resetLoginCredentials() {
  // Confirm with the user so they don't accidentally wipe out their account
  if (confirm("Are you sure you want to reset the saved username and password? This will delete the permanent account memory.")) {
    
    // 1. Remove the master user account from storage
    localStorage.removeItem("masterUser");
    
    // 2. Remove the current active session state if logged in
    localStorage.removeItem("sessionActive");
    
    // 3. Clear any leftover error messages
    const loginError = document.getElementById("loginError");
    if (loginError) {
      loginError.innerText = "";
    }
    
    alert("System memory wiped! You can now register a new master account. 🔄");
    
    // 4. Reload the page to refresh the login flow state cleanly
    location.reload();
  }
}
// 🎀 A pool of cute, romantic, and beautiful love notes
const beautifulLoveNotes = [    
  "Two hearts, one perfect frequency. A match bound by pure magic. 💖",
  "Written in the stars, validated by code. The universe smiled the day you met. ✨💫",
  "Exceptional chemistry detected! You two match better than late-night music and rain. 🎵🌧️",
  "A flawless connection. Your souls speak the exact same language. 🗺️💞",
  "Like coffee and cozy mornings, some things are just meant to be together. ☕☀️",
  "You are the melody to my favorite rhythm, perfectly synchronized. 🎹❤️",
  "In a room full of art, I'd still look at you. A masterclass connection! 🎨✨",
  "A bond so pure, even gravity feels a little stronger between you two. 🌌🪐",
  "Finding you was like discovering the missing piece to a beautiful puzzle. 🧩💖"
];

// 🔄 Function to pick and display a random note from the pool
function changeLoveNote() {
  const randomIndex = Math.floor(Math.random() * beautifulLoveNotes.length);
  const selectedNote = beautifulLoveNotes[randomIndex];
  
  // Update the HTML text container dynamically
  const messageElement = document.getElementById("cardMessage");
  if (messageElement) {
    messageElement.innerText = selectedNote;
  }
}
/* ================= SHOW APP ================= */
function showApp() {

  const login = document.getElementById("loginBox");
  const app = document.querySelector(".container");

  // fade out login
  login.style.transition = "0.5s ease";
  login.style.opacity = "0";

  setTimeout(() => {

    login.style.display = "none";

    // show app with animation
    app.style.display = "block";
    app.style.opacity = "0";
    app.style.transform = "scale(0.9)";

    setTimeout(() => {
      app.style.transition = "0.6s ease";
      app.style.opacity = "1";
      app.style.transform = "scale(1)";
    }, 50);

    loadUser();/* ================= STOP INTRO MUSIC AFTER LOGIN ================= */

const intro = document.getElementById("introMusic");

if (intro) {
  intro.pause();
  intro.currentTime = 0;
}

   /* // stop intro music
    const intro = document.getElementById("introMusic");
    if (intro) {
      fadeOutAudio(intro);
    }*/

  }, 500);
  const bg = document.getElementById("bgMusic");
if (bg) {
  bg.pause();
  bg.currentTime = 0;
}
  startHeartRain(); // 💖 start floating hearts here
}

/* ================= USER ================= */

function loadUser() {
  // 1. Grab the master user object string from storage
  let savedAccount = localStorage.getItem("masterUser");

  if (savedAccount) {
    // 2. Parse the string back into a JavaScript object
    let accountData = JSON.parse(savedAccount);

    // 3. Display the username securely in upper case
    const greeting = document.getElementById("userGreeting");
    if (greeting) {
      greeting.innerText = "Welcome " + accountData.username.toUpperCase() + " 💕";
    }
  }
}
function shareLoveCard() {
  // 1. Grab the current text displayed on the card
  const names = document.getElementById("cardNames").innerText;
  const score = document.getElementById("cardScore").innerText;
  const message = document.getElementById("cardMessage").innerText;
  const zodiac = document.getElementById("cardZodiac").innerText;

  // 2. Format a beautiful message for sharing
  const shareText = `💖 Soulvyn Love Match Result 💖\n\n✨ ${names}\n💫 Zodiac: ${zodiac}\n📊 Compatibility Score: ${score}\n🔮 Fate says: "${message}"\n\nCalculate yours here! 👇`;

  // 3. Use the browser's native sharing capabilities
  if (navigator.share) {
    navigator.share({
      title: 'Soulvyn Love Match',
      text: shareText,
      url: window.location.href // Automatically includes the link to your website
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing:', error));
  } else {
    // Fallback: If they are on an old desktop browser that doesn't support native sharing, copy it to clipboard instead!
    navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
    alert("Share link & results copied to clipboard! 📋 Paste it anywhere to share.");
  }
}

/* ================= LOGOUT ================= */

function logout() {

  localStorage.removeItem("user");

  introMusic.pause();
  introMusic.currentTime = 0;

  location.reload();
}

/* ================= TIMED LOVE CALCULATOR & HEART CONNECT ================= */

async function calculateLove() {
  let name1 = document.getElementById("name1").value.trim().toLowerCase();
  let name2 = document.getElementById("name2").value.trim().toLowerCase();

  if (!name1 || !name2) return;

  // ❤️ STEP 1: Start the heart animation immediately
  triggerHeartSequence();

  try {
    // 🌐 Ask your backend for the score
    const response = await fetch("/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name1, name2 })
    });

    const data = await response.json();
    let score = data.score;
    let backendMessage = data.message;

    // 🌟 GLOBAL VARIABLES: Moving these here completely fixes the crash!
    let d1 = new Date(document.getElementById("dob1").value);
    let d2 = new Date(document.getElementById("dob2").value);
    let zodiac1 = getZodiac(d1.getMonth() + 1, d1.getDate());
    let zodiac2 = getZodiac(d2.getMonth() + 1, d2.getDate());
    window.lastName1 = name1;
window.lastName2 = name2;
window.lastScore = score;
window.lastMessage = backendMessage;
window.lastZ1 = zodiac1;
window.lastZ2 = zodiac2;

    // 🎬 STEP 2: Update the main page score numbers at the 1-second mark
    setTimeout(() => {
      document.getElementById("result").innerText = score + "%";
      document.getElementById("progressBar").style.width = score + "%";

      updateEmotionUI(score);
      updateMusic(score);

      document.getElementById("zodiacResult").innerText = `${zodiac1} ❤️ ${zodiac2}`;
      setZodiacSky(zodiac1);

      let state = getEmotionState(score);
      playSceneSequence(state, name1, name2, zodiac1, zodiac2, score);
    }, 1000);

    // 💬 STEP 3: Handle the message, question, and the final card reveal
    setTimeout(() => {
      const msg = document.getElementById("message");
      msg.classList.remove("show");
      void msg.offsetHeight; // Reset the animation tracker

      msg.innerText = backendMessage;
      msg.classList.add("show");

      // ❓ STEP 4: Show the interactive question ("Would you still love them...?")
      setTimeout(() => {
        showLoveQuestion();

        // 🎬 STEP 5: THE GRAND FINALE (After the question fades out)
        setTimeout(() => {
          // ✅ Safe to play now! The variables are perfectly visible.
          playEnding(score, name1, name2, zodiac1, zodiac2);
          
          // 🚀 THE REVEAL: Your love card will now show perfectly!
          showLoveCard(name1, name2, zodiac1, zodiac2, score, backendMessage);
        }, 1500);

      }, 8000); // Wait 8 seconds during the question scene

    }, 2800); // Wait 2.8 seconds after the hearts merge

  } catch (error) {
    console.error("Error communicating with backend:", error);
  }
}
function showLoveCard(name1, name2, zodiac1, zodiac2, score, message) {
  const loveCard = document.getElementById("loveCard");
  if (!loveCard) return;

  // Populate card text safely
  document.getElementById("cardNames").innerText = name1.toUpperCase() + " 💖 " + name2.toUpperCase();
  document.getElementById("cardZodiac").innerText = (zodiac1 || "Cosmic") + " ❤️ " + (zodiac2 || "Mystic");
  document.getElementById("cardScore").innerText = score + "%";
  document.getElementById("cardMessage").innerText = message;

  // ✨ Toggle the active class to display the overlay
  loveCard.classList.add("active"); 
  changeLoveNote();

  // 3. Display the container smoothly
  document.getElementById("loveCard").style.display = "flex";
  
}

function closeLoveCard() {

  const loveCard = document.getElementById("loveCard");

  if (loveCard) {

    loveCard.classList.remove("active");

    loveCard.style.display = "none";

    setTimeout(() => {

      // OLD
      // showGameChoice();

      // NEW
      openMarriageGarden();

    }, 800);
  }
}
let heartTimer1 = null;
let heartTimer2 = null;
let heartTimer3 = null;

function triggerHeartSequence() {
  const heart = document.getElementById("heartConnect");
  if (!heart) return;

  clearTimeout(heartTimer1);
  clearTimeout(heartTimer2);
  clearTimeout(heartTimer3);

  // Bring layout into active memory hidden
  heart.style.display = "flex";
  heart.classList.remove("animate");
  heart.classList.add("hidden");

  void heart.offsetHeight; // Force reflow

  // Start the inward glide
  heartTimer1 = setTimeout(() => {
    heart.classList.remove("hidden");
    requestAnimationFrame(() => {
      heart.classList.add("animate");
    });
  }, 50);

  // Trigger particle burst at collision center point
  heartTimer2 = setTimeout(() => {
    const rect = heart.getBoundingClientRect();
    if (typeof createExplosion === "function") {
      createExplosion(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );
    }
  }, 1000);

  // 🚀 STAYS LONGER: Held open until 2500ms so users can admire the pulsating glow effect
  heartTimer3 = setTimeout(() => {
    heart.classList.remove("animate");
    heart.classList.add("hidden");
    
    // Smoothly drop display down to none after opacity hits zero
    setTimeout(() => {
      if (heart.classList.contains("hidden")) {
         heart.style.display = "none";
      }
    }, 800);
  }, 2500); // Increased from 1800ms to 2500ms
}


/* ================= MUSIC ================= */
function showLoveQuestion() {
  const q = document.getElementById("questionScene");
  const text = document.getElementById("questionText");

  text.innerText = "Would you still love them if fate said no? 💔💖";

  q.classList.remove("hidden");
  q.classList.add("show");
}
function answerLove(choice) {
  const q = document.getElementById("questionScene");

  if (choice) {
    q.innerHTML = "<h2>True Love Accepted 💖✨</h2>";
  } else {
    q.innerHTML = "<h2>Sometimes letting go is love too 💔</h2>";
  }

  window.loveAnswered = true;

  setTimeout(() => {
    q.classList.remove("show");
    q.classList.add("hidden");

    // 🚀 AFTER QUESTION → SHOW CARD
    triggerLoveCardFlow();

  }, 2000);
}
function triggerLoveCardFlow() {
  // Fall back to window memory if fields were wiped by a reset
  const name1 = document.getElementById("name1").value.trim() || window.lastName1 || "Player 1";
  const name2 = document.getElementById("name2").value.trim() || window.lastName2 || "Player 2";
  const zodiac1 = window.lastZ1 || "Cosmic";
  const zodiac2 = window.lastZ2 || "Mystic";
  const score = window.lastScore || 0;
  const message = window.lastMessage || "The universe is calculating your steps.";

  showLoveCard(name1, name2, zodiac1, zodiac2, score, message);

  setTimeout(() => {
    playEnding(score, name1, name2, zodiac1, zodiac2);
  }, 1000);
}
function toggleMusic() {
  let bg = document.getElementById("bgMusic");

  if (bg.paused) bg.play();
  else bg.pause();
}

function changeMusic() {
  let bg = document.getElementById("bgMusic");
  bg.src = document.getElementById("musicSelector").value;
  bg.play();
}

/* ================= RESET ================= */
function resetApp() {
  // Save active parameters to window memory before wiping the UI fields
  window.lastName1 = document.getElementById("name1").value.trim().toLowerCase();
  window.lastName2 = document.getElementById("name2").value.trim().toLowerCase();
  
  // Now clear the visible inputs safely
  document.getElementById("name1").value = "";
  document.getElementById("name2").value = "";
  document.getElementById("result").innerText = "0%";
  document.getElementById("progressBar").style.width = "0%";
  // RESET DOB INPUTS
document.getElementById("dob1").value = "";
document.getElementById("dob2").value = "";

// RESET ZODIAC RESULT
document.getElementById("zodiacResult").innerText = "";
  
  const msg = document.getElementById("message");
  if (msg) {
    msg.innerText = "";
    msg.classList.remove("show");
  }

  // Hide UI overlays cleanly
  const loveCard = document.getElementById("loveCard");
  if (loveCard) {
    loveCard.classList.remove("active");
    loveCard.style.display = "none";
  }

  const mergeGame = document.getElementById("mergeGame");
  if (mergeGame) {
    mergeGame.classList.add("hidden");
    mergeGame.style.display = "none";
  }

  const gameChoice = document.getElementById("gameChoice");
  if (gameChoice) {
    gameChoice.classList.add("hidden");
    gameChoice.style.display = "none";
  }

  // Restore the dynamic HTML inside the Question Screen container
  const q = document.getElementById("questionScene");
  if (q) {
    q.classList.remove("show");
    q.classList.add("hidden");
    q.innerHTML = `
      <div id="questionText">Would you still love them if fate said no? 💔💖</div>
      <div class="question-buttons" style="margin-top: 15px;">
        <button onclick="answerLove(true)" style="margin-right: 10px; padding: 8px 16px; cursor: pointer;">Yes</button>
        <button onclick="answerLove(false)" style="padding: 8px 16px; cursor: pointer;">No</button>
      </div>
    `;
  }
}
function createHeart() {

  const heart = document.createElement("div");
  heart.className = "heart";

  const hearts = ["❤️", "💖", "💕", "💗", "🫧","🩷"];
  heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];

  // FULL SCREEN RANDOM POSITION
  heart.style.left = Math.random() * 100 + "vw";

  // start anywhere vertically (optional but better effect)
  heart.style.top = (Math.random() * 100) + "vh";

  heart.style.bottom = "auto";

  // size variation
  heart.style.fontSize = (Math.random() * 18 + 12) + "px";

  // speed variation
  heart.style.animationDuration = (Math.random() * 3 + 3) + "s";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}
function startHeartRain() {

  setInterval(() => {
    createHeart();
  }, 250);
}
window.addEventListener("load", () => {
  const splash = document.getElementById("splashScreen");
  const intro = document.getElementById("introMusic");

  // Play intro (if allowed)
  if (intro) {
    intro.volume = 0.5;
    intro.play().catch(() => {});
  }

  // Double-check: Force game elements to remain hidden on initial boot sequence
  const gameChoice = document.getElementById("gameChoice");
  if (gameChoice) {
    gameChoice.classList.add("hidden");
    gameChoice.style.display = "none";
  }
  const mergeGame = document.getElementById("mergeGame");
  if (mergeGame) {
    mergeGame.classList.add("hidden");
    mergeGame.style.display = "none";
  }

  // Handle splash fade out sequence
  setTimeout(() => {
    if (splash) {
      splash.style.transition = "1s ease";
      splash.style.opacity = "0";
      splash.style.transform = "scale(1.1)";

      setTimeout(() => {
        splash.style.display = "none";
        
        // 🌟 FIX: Hand-off seamlessly to the heart transition animation instead of breaking!
        if (typeof playHeartIntro === "function") {
          playHeartIntro();
        } else {
          // Fallback directly to login box if heart intro function is missing
          const loginBox = document.getElementById("loginBox");
          if (loginBox) {
            loginBox.style.display = "block";
            loginBox.style.opacity = "1";
          }
        }
      }, 1000);
    }
  }, 3000);
});
document.addEventListener("mousemove", (e) => {

  const glow = document.createElement("div");
  glow.className = "cursor-glow";

  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";

  document.body.appendChild(glow);

  setTimeout(() => glow.remove(), 800);
});
window.addEventListener("load", () => {

  const intro = document.getElementById("netflixIntro");
  const sound = document.getElementById("introSound");

  // try play sound (will work after interaction in most browsers)
  sound.volume = 0.6;
  sound.play().catch(() => {});

  // cinematic duration timing (Netflix-like pacing)
  setTimeout(() => {

    intro.classList.add("hide-intro");

    setTimeout(() => {
      intro.style.display = "none";

      // 👉 now your login/app starts here
      startApp();

    }, 1000);

  }, 3500);
});

function startApp() {
  console.log("App starts now 🚀");
}
function updateEmotionUI(percent) {

  const body = document.body;

  if (percent < 30) {
    body.style.background = "linear-gradient(-45deg,#2b2b2b,#ff4d6d)";
  }

  else if (percent < 70) {
    body.style.background = "linear-gradient(-45deg,#6a5af9,#ff8fa3)";
  }

  else {
    body.style.background = "linear-gradient(-45deg,#ffcc70,#ff4d6d,#ffd6e0)";
  }
}
function startHeartRain(percent) {

  let speed = 300;

  if (percent > 70) speed = 120;
  else if (percent > 40) speed = 200;
  else speed = 350;

  setInterval(createHeart, speed);
}
function getMessage(percent) {

  if (percent < 30) return "Broken connection… 💔";
  if (percent < 70) return "Unstable feelings… 💫";
  return "Strong cosmic bond 💖✨";
}
/*function generateStory(name1, name2, percent) {

  if (percent > 70) {
    return `${name1} and ${name2} feel like destined souls under the same sky.`;
  }

  if (percent > 40) {
    return `${name1} and ${name2} share confusion, but attraction exists.`;
  }

  return `${name1} and ${name2} are like distant stars—beautiful but far apart.`;
}*/
function getZodiac(month, day) {

  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius ♒";
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces ♓";
  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries ♈";
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus ♉";
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini ♊";
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer ♋";
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo ♌";
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo ♍";
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra ♎";
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio ♏";
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius ♐";
  if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn ♑";
}
function zodiacVibe(z1, z2) {

  const fire = ["Aries ♈","Leo ♌","Sagittarius ♐"];
  const earth = ["Taurus ♉","Virgo ♍","Capricorn ♑"];
  const air = ["Gemini ♊","Libra ♎","Aquarius ♒"];
  const water = ["Cancer ♋","Scorpio ♏","Pisces ♓"];

  function getElement(z) {
    if (fire.includes(z)) return "Fire";
    if (earth.includes(z)) return "Earth";
    if (air.includes(z)) return "Air";
    if (water.includes(z)) return "Water";
  }

  let e1 = getElement(z1);
  let e2 = getElement(z2);

  if (e1 === e2) return "Highly emotionally aligned ✨";
  if ((e1 === "Fire" && e2 === "Air") || (e1 === "Air" && e2 === "Fire"))
    return "Energetic & exciting bond 🔥";

  if ((e1 === "Water" && e2 === "Earth") || (e1 === "Earth" && e2 === "Water"))
    return "Stable emotional connection 🌿";

  return "Mysterious attraction 🌌";
  document.getElementById("zodiacResult").innerText =
`${zodiac1} ❤️ ${zodiac2} — ${zodiacVibe(zodiac1, zodiac2)}`;
}
function setZodiacSky(sign) {

  const sky = document.getElementById("sky");
  sky.innerHTML = ""; // clear previous sky

  // change background
  let bg = "";

  if (sign.includes("Aries")) bg = "#1a001f";
  if (sign.includes("Taurus")) bg = "#0f2e1d";
  if (sign.includes("Gemini")) bg = "#0a1f3d";
  if (sign.includes("Cancer")) bg = "#0b1a2f";
  if (sign.includes("Leo")) bg = "#2a0f00";
  if (sign.includes("Virgo")) bg = "#102b1f";
  if (sign.includes("Libra")) bg = "#2a0f2a";
  if (sign.includes("Scorpio")) bg = "#05010f";
  if (sign.includes("Sagittarius")) bg = "#2a1200";
  if (sign.includes("Capricorn")) bg = "#0b0b0b";
  if (sign.includes("Aquarius")) bg = "#001f2f";
  if (sign.includes("Pisces")) bg = "#001a33";

  document.body.style.background = bg;

  // create stars
  for (let i = 0; i < 80; i++) {
    let star = document.createElement("div");
    star.className = "star";

    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";

    star.style.animationDuration = (1 + Math.random() * 3) + "s";

    sky.appendChild(star);
  }

  // add clouds for air/water signs only
  if (
    sign.includes("Gemini") ||
    sign.includes("Libra") ||
    sign.includes("Aquarius") ||
    sign.includes("Cancer") ||
    sign.includes("Pisces")
  ) {
    for (let i = 0; i < 3; i++) {
      let cloud = document.createElement("div");
      cloud.className = "cloud";

      cloud.style.top = (10 + Math.random() * 60) + "vh";
      cloud.style.left = Math.random() * 100 + "vw";

      cloud.style.animationDuration = (15 + Math.random() * 10) + "s";

      sky.appendChild(cloud);
    }
  }
}
function generateStory(name1, name2, zodiac1, zodiac2, score) {

  if (score > 80) {
    return `${name1} and ${name2} feel like two souls naturally aligned under ${zodiac1} and ${zodiac2}. A strong emotional bond forms without effort.`;
  }

  if (score > 50) {
    return `${name1} and ${name2} share attraction, but emotional timing between ${zodiac1} and ${zodiac2} feels uncertain.`;
  }

  return `${name1} and ${name2} exist like distant emotional frequencies—present, but not fully connected.`;
}
function setScene(score) {

  if (score > 80) {
    document.body.style.background = "linear-gradient(#ffcc70, #ff4d6d)";
  }

  else if (score > 50) {
    document.body.style.background = "linear-gradient(#6a5af9, #ff8fa3)";
  }

  else {
    document.body.style.background = "linear-gradient(#1a1a2e, #16213e)";
  }
}
function updateMusic(score) {

  const music = document.getElementById("bgMusic");

  // stop current music properly
  music.pause();
  music.currentTime = 0;

  // change track
  if (score > 75) {
    music.src = "/static/romantic.mp3";
  }
  else if (score > 65) {
    music.src = "/static/romantic1.mp3";
  }
  else {
    music.src = "/static/romantic2.mp3";
  }

  // reload audio (IMPORTANT)
  music.load();

  // play again (must be inside user click flow)
  music.play().catch(() => {
    console.log("Autoplay blocked — user must click first");
  });
}
function getSceneSequence(state, name1, name2, zodiac1, zodiac2, score) {

  if (state === "RESONANCE") {
    return [
      `${name1} and ${name2} enter the same emotional field...`,
      `Their energies begin to align slowly ✨`,
      `A resonance stabilizes between ${zodiac1} and ${zodiac2}`,
      `Connection locked: HIGH COMPATIBILITY 💖`
    ];
  }

  if (state === "ATTRACTION") {
    return [
      `${name1} notices a pull toward ${name2}...`,
      `Emotional signals are unstable 💫`,
      `${zodiac1} and ${zodiac2} are out of sync`,
      `Connection remains uncertain`
    ];
  }

  return [
    `${name1} and ${name2} exist in separate emotional spaces...`,
    `No stable resonance detected 🌌`,
    `Zodiac mismatch creates distance`,
    `Outcome: Low connection`
  ];
}
function playSceneSequence(state, name1, name2, zodiac1, zodiac2, score) {

  const scene = document.getElementById("storyScene");
  const sequence = getSceneSequence(state, name1, name2, zodiac1, zodiac2, score);

  let i = 0;

  function showNext() {

    if (i >= sequence.length) {
      scene.classList.remove("show");
      return;
    }

    scene.innerText = sequence[i];
    scene.classList.add("show");

    i++;

    setTimeout(() => {
      scene.classList.remove("show");

      setTimeout(showNext, 400); // gap between scenes
    }, 1800);
  }

  showNext();
}
function getEmotionState(score) {
  if (score > 75) return "RESONANCE";
  if (score > 65) return "ATTRACTION";
  return "UNCERTAIN";
}
function playEnding(score, name1, name2, zodiac1, zodiac2) {

  const scene = document.getElementById("storyScene");
  const data = getEnding(score, name1, name2, zodiac1, zodiac2);

  if (!data) return; // safety guard

  scene.classList.remove("show", "glow", "pulse", "fade", "dark");

  // force reset animation
  void scene.offsetWidth;

  setTimeout(() => {

    scene.innerHTML = `
      <div style="font-size:32px; font-weight:bold;">${data.title}</div>
      <div style="margin-top:15px;">${data.text}</div>
      <div style="margin-top:10px; font-size:18px; opacity:0.8;">${data.subtext}</div>
    `;

    scene.classList.add("show");
    scene.classList.add(data.mood);

    setTimeout(() => {
      scene.classList.remove("show");
    }, 5000);

  }, 200);
}
function playHeartIntro() {

  const intro = document.getElementById("heartIntro");

  if (!intro) return;

  // SHOW HEART INTRO
  intro.style.display = "flex";

  // RESET STATES
  intro.classList.remove("animate");
  intro.classList.remove("burst");
  intro.classList.remove("fade-out");

  // FORCE REFRESH
  void intro.offsetHeight;

  // STEP 1 → hearts move together
  setTimeout(() => {
    intro.classList.add("animate");
  }, 300);

  // STEP 2 → giant emotional burst
  setTimeout(() => {
    intro.classList.add("burst");
  }, 2600);

  // STEP 3 → fade away
  setTimeout(() => {
    intro.classList.add("fade-out");
  }, 3800);

 setTimeout(() => {

  intro.style.display = "none";

  const login = document.getElementById("loginBox");

  // restore layout
  login.style.display = "block";

  // tiny render delay
  setTimeout(() => {
    login.style.opacity = "1";
    login.style.pointerEvents = "auto";
  }, 100);

}, 5200);
}
// ================= GLOBAL GAME VARIABLES =================
let activeHeart = null;
let offsetX = 0;
let offsetY = 0;
let messageInterval = null;
let gameExitTimeout = null;

// Array of rotating hints to display while they try to move the hearts
const gameplayHints = [
  "Bring them close... ✨",
  "Two halves waiting to become whole. 🌙",
  "Defy the distance between spaces. 💖",
  "In the middle of chaos, find connection. 💫"
];

// ================= GAME WINDOW HANDLERS =================
function showGameChoice() {
  const choiceBox = document.getElementById("gameChoice");
  if (choiceBox) {
    choiceBox.classList.remove("hidden");
    // 🌟 !important override karke popup show karega jab actual zarurat hogi
    choiceBox.style.setProperty("display", "flex", "important"); 
  }
}

function startMergeGame() {

  const game = document.getElementById("mergeGame");

  if (!game) return;

  game.classList.remove("hidden");

  game.style.setProperty("display", "flex", "important");

  const left = document.getElementById("leftHeart");
  const right = document.getElementById("rightHeart");

  // RESET HEARTS
  if (left) {
    left.style.display = "block";
    left.style.left = "40px";
    left.style.top = "40%";
  }

  if (right) {
    right.style.display = "block";
    right.style.left = "";
    right.style.right = "40px";
    right.style.top = "40%";
  }

  // RESET MESSAGE
  const msgElement = document.getElementById("mergeMessage");

  if (msgElement) {
    msgElement.innerHTML = "💖 Connect the hearts before time ends";
    msgElement.style.opacity = 1;
    msgElement.classList.remove("success-text");
  }

  // RESET BUTTON
  const closeBtn = document.getElementById("gameCloseBtn");

  if (closeBtn) {
    closeBtn.classList.remove("show");
    closeBtn.style.opacity = "0";
    closeBtn.style.pointerEvents = "none";
  }

  // RESET GLOW
  const glow = document.getElementById("mergeGlow");

  if (glow) {
    glow.style.boxShadow = "none";
  }

  // REMOVE OLD TIMER
  const oldTimer = document.getElementById("mergeTimer");

  if (oldTimer) {
    oldTimer.remove();
  }

  // CREATE TIMER UI
  const timer = document.createElement("div");

  timer.id = "mergeTimer";

  timer.style.position = "absolute";
  timer.style.top = "20px";
  timer.style.left = "50%";
  timer.style.transform = "translateX(-50%)";

  timer.style.padding = "10px 20px";
  timer.style.borderRadius = "20px";

  timer.style.background = "rgba(0,0,0,0.5)";
  timer.style.color = "#fff";

  timer.style.fontSize = "20px";
  timer.style.fontWeight = "bold";

  timer.style.zIndex = "99999";

  game.appendChild(timer);

  // START COUNTDOWN
  let timeLeft = 5;

  timer.innerText = `⏳ ${timeLeft}s`;

  clearInterval(window.countdownInterval);

  window.countdownInterval = setInterval(() => {

    timeLeft--;

    if (timeLeft > 0) {

      timer.innerText = `⏳ ${timeLeft}s`;
    }

  }, 1000);

  // CLEAR OLD FAIL TIMER
  clearTimeout(gameExitTimeout);

  // FAIL AFTER 5 SECONDS
  gameExitTimeout = setTimeout(() => {

    clearInterval(window.countdownInterval);

    timer.innerText = "💔 Failed";

    if (msgElement) {

      msgElement.innerHTML = `
        ❌ Connection Failed...<br>
        Try again later 💔
      `;
    }

    if (left) left.style.display = "none";

    if (right) right.style.display = "none";

    setTimeout(() => {

      timer.remove();

      forceCloseGame();

    }, 2000);

  }, 5000);
}

/* YES */
function acceptGame() {
  const choiceBox = document.getElementById("gameChoice");
  if (choiceBox) {
    choiceBox.classList.add("hidden");
    choiceBox.style.display = "none";
  }
  startMergeGame();
}

/* SKIP */
function skipGame() {
  const choiceBox = document.getElementById("gameChoice");
  if (choiceBox) {
    choiceBox.classList.add("hidden");
    choiceBox.style.display = "none";
  }
}
// ================= DRAG AND DROP ENGINE =================
document.addEventListener("mousedown", startDrag);
document.addEventListener("touchstart", startDrag, { passive: false });
document.addEventListener("mousemove", drag);
document.addEventListener("touchmove", drag, { passive: false });
document.addEventListener("mouseup", endDrag);
document.addEventListener("touchend", endDrag);

function startDrag(e) {
  const target = e.target;
  if (target.classList.contains("drag-heart")) {
    activeHeart = target;
    activeHeart.style.zIndex = "100000"; 
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    offsetX = clientX - activeHeart.getBoundingClientRect().left;
    offsetY = clientY - activeHeart.getBoundingClientRect().top;
    
    if (e.type === "touchstart") e.preventDefault();
  }
}

function drag(e) {
  if (!activeHeart) return;
  if (e.type === "touchmove") e.preventDefault();

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  const gameArea = document.querySelector(".game-area");
  if (!gameArea) return;
  const rect = gameArea.getBoundingClientRect();

  let x = clientX - rect.left - offsetX;
  let y = clientY - rect.top - offsetY;

  x = Math.max(0, Math.min(x, rect.width - activeHeart.offsetWidth));
  y = Math.max(0, Math.min(y, rect.height - activeHeart.offsetHeight));

  activeHeart.style.left = x + "px";
  activeHeart.style.top = y + "px";

  checkMerge();
}

function endDrag() {
  if (activeHeart) {
    activeHeart.style.zIndex = "";
    activeHeart = null;
  }
}

// ================= MERGE LOGIC AND MESSAGES =================
function checkMerge() {

  const left = document.getElementById("leftHeart");
  const right = document.getElementById("rightHeart");

  if (!left || !right) return;

  const r1 = left.getBoundingClientRect();
  const r2 = right.getBoundingClientRect();

  // HEART CENTERS
  const center1X = r1.left + r1.width / 2;
  const center1Y = r1.top + r1.height / 2;

  const center2X = r2.left + r2.width / 2;
  const center2Y = r2.top + r2.height / 2;

  const distance = Math.hypot(
    center1X - center2X,
    center1Y - center2Y
  );

  // 💖 SUCCESS
  if (distance < 100) {

    // STOP TIMERS
    clearTimeout(gameExitTimeout);

    clearInterval(window.countdownInterval);

    const timer = document.getElementById("mergeTimer");

    if (timer) {
      timer.innerText = "💖 Connected";
    }

    left.style.display = "none";
    right.style.display = "none";

    endDrag();

    const glow = document.getElementById("mergeGlow");

    if (glow) {
      glow.style.boxShadow = "0 0 150px 75px #ff006e";
    }

    const msg = document.getElementById("mergeMessage");

    if (!msg) return;

    msg.classList.add("success-text");

    msg.innerHTML =
      "✨ System Restored! Connection Found. 💕";

    // SHOW CLOSE BUTTON
    const closeBtn = document.getElementById("gameCloseBtn");

    if (closeBtn) {
      closeBtn.classList.add("show");
      closeBtn.style.opacity = "1";
      closeBtn.style.pointerEvents = "auto";
    }

    // SECOND MESSAGE
    setTimeout(() => {

      if (msg.classList.contains("success-text")) {

        msg.style.opacity = 0;

        setTimeout(() => {

          msg.innerHTML =
            "💝 No matter the distance, destiny aligns. 🌹";

          msg.style.opacity = 1;

        }, 500);
      }

    }, 2000);

    // FINAL MESSAGE
    setTimeout(() => {

      if (msg.classList.contains("success-text")) {

        msg.style.opacity = 0;

        setTimeout(() => {

          msg.innerHTML =
            "🔒 Closed Loops. Unbreakable Ties. Forever. ✨";

          msg.style.opacity = 1;

        }, 500);
      }

    }, 4500);

    // AUTO CLOSE
    gameExitTimeout = setTimeout(() => {

      if (timer) {
        timer.remove();
      }

      forceCloseGame();

    }, 10000);
  }
}

function forceCloseGame() {
  clearTimeout(gameExitTimeout);
  clearInterval(messageInterval);

  const mergeGame = document.getElementById("mergeGame");
  const msg = document.getElementById("mergeMessage");
  const closeBtn = document.getElementById("gameCloseBtn");

  if (mergeGame) {
    mergeGame.classList.add("hidden");
    mergeGame.style.display = "none";
  }

  if (msg) msg.classList.remove("success-text");
  if (closeBtn) closeBtn.classList.remove("show");

  if (typeof resetApp === "function") {
    resetApp();
  }
}
function openMarriageGarden() {

  const overlay = document.getElementById("marriageCardOverlay");

  const user = document.getElementById("name1").value || "You";
  const crush = document.getElementById("name2").value || "Crush";

  // 🌸 Random beautiful texts
  const userMessages = [
    "Deeply loyal and emotionally supportive partner. 💍",
    "A soulmate energy surrounds your future marriage. ✨",
    "You love with honesty, warmth, and pure devotion. 💖",
    "Your heart seeks peace, trust, and forever love. 🌹",
    "Emotionally mature and ready for lasting commitment. 💕",
    "A caring protector with a soft romantic soul. 🫶",
    "Your future relationship radiates comfort and loyalty. 💫"
  ];

  const crushMessages = [
    "Protective, caring, and ready for a long-term bond. ✨",
    "Someone who values emotional connection deeply. 💞",
    "A gentle heart hidden behind strong emotions. 🌙",
    "Destined to create unforgettable memories together. 💖",
    "A romantic soul waiting for true understanding. 🌸",
    "Loyal, affectionate, and emotionally attached. 💕",
    "Their energy naturally connects with yours. 🔮"
  ];

  const connectionMessages = [
    "💘 Your hearts feel naturally connected.",
    "🌹 Destiny seems to be guiding this bond.",
    "✨ A rare emotional resonance is forming.",
    "💫 Two souls slowly moving toward each other.",
    "🩷 This connection feels soft, warm, and genuine.",
    "🌙 Emotional frequencies are aligning beautifully.",
    "🔒 The bond between you feels unbreakable."
  ];

  // 🎲 Random selection
  const randomUser =
    userMessages[Math.floor(Math.random() * userMessages.length)];

  const randomCrush =
    crushMessages[Math.floor(Math.random() * crushMessages.length)];

  const randomConnection =
    connectionMessages[Math.floor(Math.random() * connectionMessages.length)];

  // 📝 Update content
  document.getElementById("userMarriageLabel").innerHTML =
    `👤 ${user}'s Marriage State`;

  document.getElementById("crushMarriageLabel").innerHTML =
    `💕 ${crush}'s Marriage State`;

  document.getElementById("userMarriageText").innerText = randomUser;

  document.getElementById("crushMarriageText").innerText = randomCrush;

  // 🌸 Optional extra connection line
  const extraText = document.getElementById("gardenConnectionText");

  if (extraText) {
    extraText.innerHTML =
      `${randomConnection}<br><br>💞 If you want to connect two hearts, press Continue.`;
  }

  overlay.style.display = "flex";
}

function closeMarriageCard() {

  const overlay = document.getElementById("marriageCardOverlay");

  overlay.style.display = "none";
}
function acceptMarriageCard() {

    const marriageOverlay = document.getElementById('marriageCardOverlay');

    if (marriageOverlay) {
        marriageOverlay.style.display = "none";
        marriageOverlay.classList.remove('active');
    }

    // Open game choice
    if (typeof showGameChoice === "function") {
        showGameChoice();
    }
}

function skipMarriageCard() {

    const marriageOverlay = document.getElementById('marriageCardOverlay');

    if (marriageOverlay) {
        marriageOverlay.style.display = "none";
        marriageOverlay.classList.remove('active');
    }

    // Completely skip game
    resetApp();
}
function shareMarriageCard() {

  const user = document.getElementById("name1").value || "You";
  const crush = document.getElementById("name2").value || "Crush";

  const userText = document.getElementById("userMarriageText").innerText;
  const crushText = document.getElementById("crushMarriageText").innerText;

  const shareText =
`💍 Marriage Garden Result 💍

👤 ${user}
${userText}

💕 ${crush}
${crushText}

✨ Created with Love App 💖`;

  if (navigator.share) {
    navigator.share({
      title: "Marriage Garden Result",
      text: shareText,
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(shareText);
    alert("Copied to clipboard 💌");
  }
}