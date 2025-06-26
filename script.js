let  output = "";
let info  = ""; 
let btn = document.querySelector("#btn");
let loader = document.querySelector(".loader");
let circle = document.querySelector(".circle");



// API FETCH   

const API_KEY = 'AIzaSyCNSSDX4e6-NMU8hKDljhI5uSBDv4k_Hm8';
const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=`${API_KEY}`";
async function getResponse(){
   try{
       response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCNSSDX4e6-NMU8hKDljhI5uSBDv4k_Hm8",{
         method:"POST",
         headers:{
            "content-Type" :"application/json", 
         },
         body:JSON.stringify({"contents": [{
          "parts":[{text:transcript}]
          }]}),
      }) 
      let data = await response.json();
      output = await (data?.candidates[0].content.parts[0].text);
      // console.log(response);
   }
   catch(error){
      console.error(error.message);
   }
}


// speakRecognition 

function speak(){
   let text_speak = new SpeechSynthesisUtterance(output);
   text_speak.pitch = 1;
   text_speak.volume = 1;
   text_speak.lang = "hi-IN";
   text_speak.rate = 1;
   window.speechSynthesis.speak(text_speak);
}
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.onresult = (event)=> {

         let currentIndex = event.resultIndex 
         transcript = event.results[currentIndex][0].transcript     
         console.log(event);
         // cont.textContent = transcript
         takeCommand(transcript)
}

btn.addEventListener('click',()=>{
   output = "";
   loader.style.display = "flex";

   recognition.start();
})

   function takeCommand(){
      transcript = transcript.toLowerCase();
      if(transcript.includes("hello")){
            output = "helo vikas sir kaise hai aap";
         }
     else if(transcript.includes("what is your name")){
            output = "my name is nexbot";
         }

         else if(transcript.includes("who is vikas")){
            output = "mr vikas is my developer";
         }
         else if(transcript.includes("what is my name")){
            output = "your name is vikas";
         }
         else if(transcript.includes("who is your owner")){
            output = " mr vikas design me ";
         }
         else if(transcript.includes("how are you")){
            output = "I'm fine,  and you say my dear ";
      }
      else if(transcript.includes("time")){
            let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
            output = time;
      }
      else if(transcript.includes("date")){
            let date = new Date().toLocaleString(undefined,{day:"numeric",month:"numeric" , year:"numeric"})
            output= date;
      }
      else if(transcript.includes("open instagram")){
            output = "opening instagram.......";
            window.open("https://www.instagram.com","_blank");
      }else if(transcript.includes("open whatsapp")){
            output = "opening whatsapp......."
            console.log("virus");
            window.open("https://web.whatsapp.com","_blank")
      }else if(transcript.includes("open youtube")){
            output = "opening you tube.......";
            window.open("https://www.youtube.com","_blank")
      }else if(transcript.includes("open facebook")){
            output = "opening facebook......."
            window.open("https://www.facebook.com","_blank")
      }
      else if(transcript.includes("open google")){
            output = "opening google......."
            window.open("https://www.google.com","_blank")
      }
      else if(transcript.includes("open calculator")){
            output = "opening calculator......."
            window.open("https://www.google.com/search?q=calculator+online&oq=calc&gs_lcrp=EgZjaHJvbWUqDAgBECMYJxiABBiKBTIUCAAQRRg5GEMYgwEYsQMYgAQYigUyDAgBECMYJxiABBiKBTIPCAIQABhDGLEDGIAEGIoFMgwIAxAAGEMYgAQYigUyDAgEEAAYQxiABBiKBTIMCAUQABhDGIAEGIoFMgwIBhAAGEMYgAQYigUyCggHEAAYsQMYgAQyCQgIECMYJxiPAjIHCAkQABiPAtIBCTQwMDhqMGoxNagCCLACAQ&sourceid=chrome&ie=UTF-8")
      }
      else if(transcript.includes("open snapchat")){
            output = "opening snapchat......."
            window.open("https://web.snapchat.com/?ref=homepage_auto_redirect.","_blank")
      }
      else {
         getResponse();
         setTimeout(()=>{
            speak();
            console.log(output);
         },3000)
      }
            speak();
   }
 
   function wish(){
      setTimeout(()=>{
         output = "how are you mr vikas sir how can i help you";
         speak();
      },3000)
   }

      window.addEventListener("load",()=>{
         wish();
      })
      