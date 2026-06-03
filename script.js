let output = "";
let info = ""; 
let btn = document.querySelector("#btn");
let loader = document.querySelector(".loader");
let circle = document.querySelector(".circle");
const sound = new Audio("img/sound.mp3");

// Global transcript variable taaki scope ka issue na ho
let transcript = ""; 

// Sahi API Endpoint URL (Aapne string ke andar backticks lagaye the, jo galat tha)
const API_KEY = window.localStorage.getItem('NEXBOT_GEMINI_KEY') || '';
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${API_KEY}`;

// API FETCH FUNCTION
async function getResponse(userInput) {
   try {
       loader.style.display = "flex"; // Gemini fetch shuru hote hi loader show hoga
       
       let response = await fetch(url, {
          method: "POST",
          headers: {
             "Content-Type": "application/json", 
          },
          body: JSON.stringify({
             "contents": [{
                 "parts": [{ text: userInput }]
             }]
          }),
       }); 

       let data = await response.json();
       console.log("API Response Data:", data);

       // Safe Extraction of Text
       if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
           output = data.candidates[0].content.parts[0].text;
       } else {
           output = error.message;
       }
   }
   catch (error) {
       console.error("API Error:", error.message);
       output = "Sorry Vikas sir, network me dikkat hai ya API key block ho gayi hai.";
   }
   finally {
       loader.style.display = "none"; // Data aate hi loader band
       speak(); // Response aane ke BAAD hi nexbot bolega
   }
}

// Web Speech Synthesis (Speaking)
function speak() {
   if (!output) return; // Agar output khali hai toh mat bolo
   let text_speak = new SpeechSynthesisUtterance(output);
   text_speak.pitch = 1;
   text_speak.volume = 1;
   text_speak.lang = "hi-IN"; // Hindi/English dono mixed support karega
   text_speak.rate = 1;
   window.speechSynthesis.speak(text_speak);
}

// Speech Recognition Setup
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
     let currentIndex = event.resultIndex;
     transcript = event.results[currentIndex][0].transcript;     
     console.log("User Said:", transcript);
     takeCommand(transcript); // Parameter paas kiya
};

recognition.onerror = (event) => {
    console.error("Speech Recognition Error:", event.error);
    loader.style.display = "none";
};

// Button Click Event
btn.addEventListener('click', () => {
   if (sound) sound.play().catch(e => console.log("Sound block issue"));
   loader.style.display = "flex"; // Mic listening start hote hi loader chalu
   output = ""; // Purana output clear karo
   recognition.start(); 
});

// Take Command Logic
async function takeCommand(message) {
      message = message.toLowerCase().trim();
      
      // In-built Commands Checking
      if (message.includes("hello")) {
         output = "hello my dear sir how can i assist you";
         loader.style.display = "none";
         speak();
      }
      else if (message.includes("what is your name")) {
         output = "my name is nexbot";
         loader.style.display = "none";
         speak();
      }
      else if (message.includes("who is vikas") || message.includes("who is my owner") || message.includes("what is my name")) {
         output = "Mr. Vikas is my developer and designer. Your name is Vikas sir.";
         loader.style.display = "none";
         speak();
      }
      else if (message.includes("how are you") || message.includes("tum kaise ho")) {
         output = "I'm fine, and you say my dear?";
         loader.style.display = "none";
         speak();
      }
      else if (message.includes("time")) {
         output = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
         loader.style.display = "none";
         speak();
      }
      else if (message.includes("date")) {
         output = new Date().toLocaleString(undefined, { day: "numeric", month: "numeric", year: "numeric" });
         loader.style.display = "none";
         speak();
      }
      else if (message.includes("open instagram")) {
         output = "opening instagram.......";
         window.open("https://www.instagram.com", "_blank");
         loader.style.display = "none";
         speak();
      }
      else if (message.includes("open whatsapp")) {
         output = "opening whatsapp.......";
         window.open("https://web.whatsapp.com", "_blank");
         loader.style.display = "none";
         speak();
      }
      else if (message.includes("open youtube")) {
         output = "opening youtube.......";
         window.open("https://www.youtube.com", "_blank");
         loader.style.display = "none";
         speak();
      }
      else if (message.includes("open google")) {
         output = "opening google.......";
         window.open("https://www.google.com", "_blank");
         loader.style.display = "none";
         speak();
      }
      else if (message.includes("open calculator")) {
         output = "opening calculator.......";
         window.open("https://www.google.com/search?q=calculator+online", "_blank");
         loader.style.display = "none";
         speak();
      }
      else if (message.includes("open snapchat")) {
         output = "opening snapchat.......";
         window.open("https://web.snapchat.com", "_blank");
         loader.style.display = "none";
         speak();
      }
      // Agar koi custom command nahi mila, toh automatic Gemini API call hogi!
      else if (message.length > 0) {
         await getResponse(message); 
      }
      else {
         output = "sorry vikas sir i am not able to hear you please try again";
         loader.style.display = "none";
         speak();
      }
}