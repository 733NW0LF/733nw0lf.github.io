const terminalOutput = document.getElementById("terminalOutput");
const WELCOME_MSG =
  "Welcome to Aswin's portfolio — Type <span style=\"color: red;\">help</span> for a list of supported commands.";

window.onload = () => {
  const myInput = document.getElementById("dummyKeyboard");
  myInput.onpaste = (e) => e.preventDefault();
  terminalOutput.innerHTML = `<div class="terminal-line">${WELCOME_MSG}</div>`;
};
const COMMANDS = {
  whoami: async () => {
    const addLine = (text) => {
      terminalOutput.innerHTML += `<div class="terminal-line">${text}</div>`;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    addLine("guest");
    addLine(`<br><span style="color: #f1fa8c;">[SYSTEM]</span> User IP address logged for security purposes...`);

    try {
      const response = await fetch("https://ipapi.co/json/");
      if (!response.ok) {
        throw new Error("API response was not ok.");
      }
      const data = await response.json();

      setTimeout(() => {
        const locationInfo = `<pre class="mypre">
    IP Address : <span style="color: #fa8201ff;">${data.ip}</span>
    Location   : <span style="color: #fa8201ff;">${data.city}, ${data.region}, ${data.country_name}</span>
    ISP        : <span style="color: #fa8201ff;">${data.org}</span>
    </pre>Just kidding! I respect your privacy. 😉`;
        addLine(locationInfo);
      }, 700);
    } catch (error) {
      setTimeout(() => addLine(`<span style="color: #ff5555;">[ERROR]</span> Could not retrieve your location. But I'm still watching you...`), 700);
    }
  },
  help: 'Supported commands: <span class="code">about</span>, <span class="code">experience</span>, <span class="code">education</span>, <span class="code">skills</span>, <span class="code">acknowledges</span>, <span class="code">contact</span>, <span class="code">clear</span>',
  ls: '<span class="code">about</span>, <span class="code">experience</span>, <span class="code">education</span>, <span class="code">skills</span>, <span class="code">acknowledges</span>,<span class="code">top_secret</span><i class="fa-solid fa-lock"></i>, <span class="code">contact</span>, <span class="code">clear</span>',
  about:
    "Hello 👋<br>I'm Aswin Krishna.<br>A cybersecurity professional with expertise in web application and API penetration testing. Recognized by companies like Apple, Blackberry, Trend Micro and many more for my bug bounty contributions, I thrive on solving challenges and creating educational CTFs.  currently residing in the state of Kerala, India.",
  skills : '<span class="code">Skills:</span><br>' +
          '<span class="sk">'+
         '🔍 Web Application Security<br>' + 
         '📱 Mobile Application Security<br>' +
         '🪲 Bug Bounty<br>' +
         '🏁 CTF Development<br>' +
         '🛠️ Security Automation<br>' +
         '🧠 Digital Forensics<br>' +
         '👨‍🏫 Community & Mentorship<br>'+
         '</span>',
  education:
    "I hold a Bachelor of Computer Applications degree from Sree Vidhyathi Arts & Science College, located in Karunagappally, Kerala, India.",
  sudo:
    () => {
      const part1 =
        "<span style='color: red;'>user is not in the sudoers file. This incident will be reported.</span>";
      const part2 =
        "Just kidding! But seriously, you don't have permission to use <span style='color: red;'>sudo</span> here. Nice try, though! 😉";

      terminalOutput.innerHTML += `<div class="terminal-line">${part1}</div>`;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;

      setTimeout(() => {
        terminalOutput.innerHTML += `<div class="terminal-line">${part2}</div>`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }, 500);
    },
 experience: `INTERNSHIP EXPERIENCE<br>
CYBER SECURITY IG LEAD<br>
GTech MuLearn<br>
Apr 2022 – Mar 2025<br>
• Led the Cyber Security Interest Group (IG) at GTech MuLearn, focusing on community-driven learning and engagement.<br>
• Created and deployed CTF (Capture The Flag) challenges ranging from beginner to advanced levels in domains like web exploitation, Linux, cryptography, programming, and steganography.<br>
• Organized and mentored participants for various events, including weekly learning sessions and hands-on workshops.<br>
• Contributed as the official challenge creator for <b>IEEE Launchpad CTF 2024</b>, developing a full set of challenges to support Launchpad Kerala’s flagship tech employability program (<a class='success link' href='https://launchpadkerala.org'>launchpadkerala.org</a>).<br>
• Supported and promoted open-access cybersecurity education through self-hosted challenges and resource development, despite limited infrastructure.<br>
• Mentored students in ethical hacking practices, real-world cybersecurity threats, and career path planning.<br>
• Collaborated with fellow IG leads to ensure structured, scalable learning paths and long-term ecosystem growth.`,

acknowledges:
    "<a href='https:blackberry.com/us/en/services/blackberry-product-security-incident-response' class='success link'>Blackberry HOF on 2021</a> , <a href='https://support.apple.com/en-in/HT201536/' class='success link'>Apple HOF On April 2021</a> , <a href='https://www.oracle.com/security-alerts/cpuapr2021.html' class='success link'>Oracle HOF 2021</a> , <a href='https://sellfy.com/security/' class='success link'>Sellfy HOF 2021</a> , <a href='https://corp.mediatek.com/it-security-acknowledgements' class='success link'>mediatek HOF</a> , <a href='https://security.olx.com/security-hall-of-fame.html' class='success link'>OLX HOF 2021</a> , <a href='https://www.uu.nl/en/organisation/information-and-technology-services-its/hall-of-fame-responsible-disclosure' class='success link'>UU.nl HOF</a> , <a href='https://www.basf.com/global/en/legal/responsible-disclosure-statement.html' class='success link'>BASF HOF 2021</a> , <a href='https://success.trendmicro.com/en-US/vulnerability-response/' class='success link'>Trend Micro HOF 2021</a><a class='success link'> and many more...</a>, ",
  contact:
    "You can contact me on any of following links:<br> <a href='https://www.instagram.com/were_wolf_07/' class='success link'><i class='fa-brands fa-instagram'></i></a>, <a href='https://github.com/733nw0lf' class='success link'><i class='fa-brands fa-github'></i></a>, <a href='https://www.linkedin.com/in/aswinkrishna07/' class='success link'><i class='fa-brands fa-linkedin'></i></a>, <a href='https://x.com/733n_wolf' class='success link'><i class='fa-brands fa-x-twitter'></i></a>,<a href='https://discordapp.com/users/955130136741691503' class='success link'><i class='fa-brands fa-discord'></i></a> or you can send me an email at <a href='mailto:733nwolf@gmail.com' class='success link'><i class='fa-solid fa-inbox'></i> Mail</a>.<br>Feel free to reach out",
  cd: "Where do you think you're going?",
 "cd top_secret": "<span style='color: red;'>Access Denied</span><i class='fa-solid fa-lock'></i>. Nice try, though. <br>But if you really want to see it, you can try typing <span class='code'>sudo</span> and see what happens.",
  cat: "meow...meow...meow...🐈",
  echo: "Echo... echo... echo...",
  "rm -rf": "<span class='error'>Error: Permission denied. You can't delete my files!</span>",
  pwd: "/home/guest",
  ping: "pong!",
  grep: "You're searching for something? So am I... the meaning of it all.",
  reboot: () => {
    const addLine = (text) => {
      terminalOutput.innerHTML += `<div class="terminal-line">${text}</div>`;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    inputfield.disabled = true;

    addLine(`Broadcast message from <span style="color: #ff5555;">root@aswin</span> (pts/0):`);

    setTimeout(() => addLine("The system is going down for <span style='color: #ff0000ff;'>reboot</span> NOW!"), 500);
    setTimeout(() => addLine("Rebooting in <span style='color: #f1fa8c;'>3</span>..."), 1500);
    setTimeout(() => addLine("Rebooting in <span style='color: #f1fa8c;'>2</span>..."), 2500);
    setTimeout(() => addLine("Rebooting in <span style='color: #f1fa8c;'>1</span>..."), 3500);
    setTimeout(() => {
      addLine("<br>...<span style='color: #50fa7b;'>psych!</span> Did you really think I'd let you do that? 😉");
      inputfield.disabled = false;
      inputfield.focus();
    }, 4500);
  },
};


const userInput = document.getElementById("userInput");
const inputfield = document.getElementById("dummyKeyboard");

inputfield.addEventListener("keypress", (e) => {
  if (e.key !== "Enter") return;

  const input = e.target.value.trim().toLowerCase();
  if (input.length === 0) return;

  if (input === "clear") {
    terminalOutput.innerHTML = `<div class="terminal-line">${WELCOME_MSG}</div>`;
    e.target.value = "";
    return;
  }


  terminalOutput.innerHTML += `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;


  if (COMMANDS.hasOwnProperty(input)) {
    const commandOutput = COMMANDS[input];
    if (typeof commandOutput === "function") {
      commandOutput(); 
    } else {
      terminalOutput.innerHTML += `<div class="terminal-line">${commandOutput}</div>`;
    }
  } else if (input.startsWith("cat ")) {
    terminalOutput.innerHTML += `<div class="terminal-line">${COMMANDS.cat}</div>`;
  } else {
    terminalOutput.innerHTML += `<div class="terminal-line">no such command: ${input}</div>`;
  }

  terminalOutput.scrollTop = terminalOutput.scrollHeight;
  e.target.value = "";
});
