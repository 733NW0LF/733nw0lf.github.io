window.onload = () => {
  const myInput = document.getElementById("dummyKeyboard");
  myInput.onpaste = (e) => e.preventDefault();
};
const COMMANDS = {
  help: 'Supported commands: <span class="code">about</span>, <span class="code">experience</span>, <span class="code">education</span>, <span class="code">skills</span>, <span class="code">acknowledges</span>, <span class="code">contact</span>',
  about:
    "Hello 👋<br>I'm Aswin Krishna.<br>I am a cybersecurity professional specializing in penetration testing and bug bounty hunting, currently residing in the state of Kerala, India.",
  skills:
    '<span class="code">Skill:</span> Ethical Hacking, Pen-Testing, Bug Hunting, CTF Challenge Creation..<br>',
  education:
    "I hold a Bachelor of Computer Applications degree from Sree Vidhyathi Arts & Science College, located in Karunagappally, Kerala, India.",
  
  experience: "loading.......",
  acknowledges:
    "<a href='https:blackberry.com/us/en/services/blackberry-product-security-incident-response' class='success link'>Blackberry HOF on 2021</a> , <a href='https://support.apple.com/en-in/HT201536/' class='success link'>Apple HOF On April 2021</a> , <a href='https://sellfy.com/security/' class='success link'>Sellfy HOF 2021</a> , <a href='https://corp.mediatek.com/it-security-acknowledgements' class='success link'>mediatek HOF</a> , <a href='https://security.olx.com/security-hall-of-fame.html' class='success link'>OLX HOF 2021</a> , <a href='https://www.uu.nl/en/organisation/information-and-technology-services-its/hall-of-fame-responsible-disclosure' class='success link'>UU.nl HOF</a> , <a href='https://www.basf.com/global/en/legal/responsible-disclosure-statement.html' class='success link'>BASF HOF 2021</a> ",
  contact:
    "You can contact me on any of following links:<br><a href='https://t.me/arilla_ara' class='success link'>Telegram</a>, <a href='https://www.instagram.com/were_wolf_07/' class='success link'>Instagram</a>, <a href='https://www.twitter.com/733n_wolf' class='success link'>Twitter</a>",
};

const userInput = document.getElementById("userInput");
const terminalOutput = document.getElementById("terminalOutput");
const inputfield = document.getElementById("dummyKeyboard");

inputfield.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let input = e.target.value;
    input = input.toLowerCase();
    if (input.length === 0) {
      return;
    }
    let output;
    output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
    if (!COMMANDS.hasOwnProperty(input)) {
      output += `<div class="terminal-line">no such command: ${input}</div>`;
      console.log("Oops! no such command");
    } else {
      output += COMMANDS[input];
    }
    terminalOutput.innerHTML = `${terminalOutput.innerHTML}<div class="terminal-line">${output}</div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    e.target.value = "";
  }
});
