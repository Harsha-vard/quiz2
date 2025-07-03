const questions = [
  { q: "What does SOA stand for?", a: ["Secure Object Architecture", "Service-Oriented Architecture", "Server Oriented Application", "Software Oriented Access"], correct: 1 },
  { q: "Which protocol is commonly used in Web Services?", a: ["FTP", "SMTP", "HTTP", "SNMP"], correct: 2 },
  { q: "XML is used to:", a: ["Create tables", "Represent data", "Format web pages", "Design databases"], correct: 1 },
  { q: "What is the root of all XML documents?", a: ["Header", "DOCTYPE", "Root element", "Schema"], correct: 2 },
  { q: "Thick clients are also known as:", a: ["Web clients", "Lightweight clients", "Fat clients", "Mobile clients"], correct: 2 },
  { q: "Which of the following is a valid XML element?", a: ["<123name>", "<name@>", "<Name1>", "<name space>"], correct: 2 },
  { q: "The main goal of web services is to:", a: ["Create static websites", "Provide a distributed computing solution", "Design graphic UI", "Replace XML"], correct: 1 },
  { q: "What type of architecture uses both a client and a server?", a: ["Distributed", "Mainframe", "Client-Server", "Mobile"], correct: 2 },
  { q: "In which architecture did dumb terminals originate?", a: ["Internet architecture", "Mainframe architecture", "Mobile architecture", "Cloud architecture"], correct: 1 },
  { q: "What is the primary benefit of using XML in Web Services?", a: ["Better speed", "Platform independence", "Lower storage", "Improved UI"], correct: 1 },
  { q: "Thin clients primarily rely on:", a: ["Local processing", "Cloud processing", "No processing", "Server downloading"], correct: 1 },
  { q: "Which of the following is a browser-based client?", a: ["Chrome", "Windows", "Android", "Linux"], correct: 0 },
  { q: "XML syntax requires:", a: ["Unclosed tags", "Closing tags", "Tag numbers", "JSON compatibility"], correct: 1 },
  { q: "The use of mobile clients increased with the emergence of:", a: ["Distributed architecture", "World Wide Web", "Smartphones", "HTML"], correct: 2 },
  { q: "What does validation of XML refer to?", a: ["Testing style", "Checking correctness of data", "Verifying HTML", "Opening tags only"], correct: 1 },
  { q: "Which is an advanced XML feature?", a: ["Data definition", "Data validation", "Bold tags", "JSON parsing"], correct: 1 },
  { q: "Which industry supports Web Services widely?", a: ["Textile", "Finance", "Food", "Construction"], correct: 1 },
  { q: "Web Services are based on:", a: ["Static linking", "Loose coupling", "Dense coding", "Object orientation only"], correct: 1 },
  { q: "The main function of a web service is to:", a: ["Build webpages", "Send emails", "Allow communication between applications", "Compress files"], correct: 2 },
  { q: "Which language is commonly used to define the structure of XML data?", a: ["WSDL", "XSD", "SOAP", "CSS"], correct: 1 }
];

let current = 0;
let score = 0;
let totalTime = 300;

const questionBox = document.getElementById('question-box');
const timerEl = document.getElementById('timer');
const progress = document.getElementById('progress');

function renderQuestion() {
  const q = questions[current];
  let html = `<h2 class='mb-4'>Q${current + 1}: ${q.q}</h2>`;
  q.a.forEach((opt, i) => {
    html += `<div class='btn-option' onclick='selectAnswer(${i})'>${opt}</div>`;
  });
  questionBox.innerHTML = html;
}

function selectAnswer(selected) {
  const q = questions[current];
  const options = document.querySelectorAll('.btn-option');
  options.forEach((btn, i) => {
    btn.classList.add('selected');
    if (i === q.correct) btn.classList.add('correct');
    if (i === selected && i !== q.correct) btn.classList.add('wrong');
    btn.onclick = null;
  });
  if (selected === q.correct) score++;
  setTimeout(() => {
    current++;
    if (current < questions.length) renderQuestion();
    else showScore();
    updateProgress();
  }, 1000);
}

function updateProgress() {
  const percent = ((current) / questions.length) * 100;
  progress.style.width = `${percent}%`;
}

function showScore() {
  questionBox.innerHTML = `<h2 class='mb-4'>Quiz Complete!</h2>
    <p>Your Score: ${score} / ${questions.length}</p>
    <p>Performance: ${(score / questions.length * 100).toFixed(1)}%</p>`;
}

function startTimer() {
  const interval = setInterval(() => {
    totalTime--;
    timerEl.textContent = `Time: ${totalTime}`;
    if (totalTime <= 0) {
      clearInterval(interval);
      showScore();
    }
  }, 1000);
}

renderQuestion();
startTimer();
