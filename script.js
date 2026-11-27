
// ==========================================
// PHISHGUARD - PHISHING AWARENESS PLATFORM
// ==========================================


// 1. QUIZ QUESTIONS

const questions = [

    {
        question: "You receive an unexpected email asking you to verify your bank account immediately. What should you do?",

        options: [
            "Click the link immediately",
            "Reply with your password",
            "Verify the message through the bank's official channel",
            "Forward it to everyone"
        ],

        answer: 2,

        explanation: "Unexpected messages requesting urgent account verification may be phishing. Verify independently through an official channel."
    },

    {
        question: "Which of these is a warning sign of a suspicious URL?",

        options: [
            "A familiar and verified domain",
            "A misspelled domain name",
            "A bookmarked official website",
            "A known organisation's official address"
        ],

        answer: 1,

        explanation: "Attackers may use misspelled or lookalike domains to deceive visitors."
    },

    {
        question: "Does HTTPS guarantee that a website is legitimate?",

        options: [
            "Yes, every HTTPS website is safe",
            "Yes, it prevents all cyberattacks",
            "No, malicious websites can also use HTTPS",
            "No, HTTPS is only used for email"
        ],

        answer: 2,

        explanation: "HTTPS encrypts communication between your browser and a website, but it does not prove that the website is trustworthy."
    },

    {
        question: "What is social engineering?",

        options: [
            "Manipulating people into revealing information or taking unsafe actions",
            "Repairing a computer network",
            "Installing legitimate software",
            "Creating a secure password"
        ],

        answer: 0,

        explanation: "Social engineering exploits human behaviour and trust to manipulate people."
    },

    {
        question: "You identify a suspicious email in your inbox. What is the safest response?",

        options: [
            "Open every attachment",
            "Click the link to investigate",
            "Reply to the sender",
            "Report it through the appropriate channel"
        ],

        answer: 3,

        explanation: "Report suspicious messages through the appropriate security or reporting channel. Avoid opening suspicious attachments or links."
    }

];


// 2. QUIZ PROGRESS

let currentQuestion = 0;
let score = 0;


// 3. LOAD SAVED DASHBOARD PROGRESS

let latestQuizScore =
    localStorage.getItem("phishguardQuizScore") !== null
        ? Number(localStorage.getItem("phishguardQuizScore"))
        : null;

let emailAnalysisCompleted =
    localStorage.getItem("phishguardEmailCompleted") === "true";

let inspectedURLs = new Set(
    JSON.parse(
        localStorage.getItem("phishguardInspectedURLs") || "[]"
    )
);


// 4. START QUIZ

function startQuiz() {

    currentQuestion = 0;
    score = 0;

    showQuestion();

}


// 5. DISPLAY QUESTION

function showQuestion() {

    const container = document.getElementById("quiz-container");

    const q = questions[currentQuestion];

    let html = `

        <h3>Question ${currentQuestion + 1} of ${questions.length}</h3>

        <h2>${q.question}</h2>

        <div class="options">

    `;

    q.options.forEach((option, index) => {

        html += `

            <button class="answer-button"
                onclick="checkAnswer(${index})">

                ${option}

            </button>

        `;

    });

    html += `</div>`;

    container.innerHTML = html;

}


// 6. CHECK ANSWER

function checkAnswer(selectedAnswer) {

    const q = questions[currentQuestion];

    const container = document.getElementById("quiz-container");

    let feedback = "";

    if (selectedAnswer === q.answer) {

        score++;

        feedback = `

            <h3 class="correct">Correct Answer!</h3>

        `;

    } else {

        feedback = `

            <h3 class="wrong">Incorrect Answer!</h3>

        `;

    }

    container.innerHTML = `

        ${feedback}

        <p>${q.explanation}</p>

        <p>Current Score: ${score}</p>

        <button onclick="nextQuestion()">

            ${currentQuestion === questions.length - 1
                ? "View Results"
                : "Next Question"}

        </button>

    `;

}


// 7. NEXT QUESTION

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResults();

    }

}


// 8. DISPLAY QUIZ RESULTS

function showResults() {

    const container = document.getElementById("quiz-container");

    latestQuizScore = score;

    localStorage.setItem("phishguardQuizScore", score);

    updateDashboard();

    let message = "";

    if (score === 5) {

        message = "Excellent! You have strong phishing awareness.";

    } else if (score >= 3) {

        message = "Good effort! Continue improving your awareness.";

    } else {

        message = "Keep learning. Review the phishing awareness lessons.";

    }

    container.innerHTML = `

        <h2>Quiz Completed!</h2>

        <h1>${score} / ${questions.length}</h1>

        <p>${message}</p>

        <button onclick="startQuiz()">

            Restart Quiz

        </button>

    `;

}


// 9. EMAIL AWARENESS ANALYSIS

function revealEmailAnalysis() {

    emailAnalysisCompleted = true;

    localStorage.setItem(
        "phishguardEmailCompleted",
        "true"
    );

    updateDashboard();

    const analysis = document.getElementById("email-analysis");

    analysis.innerHTML = `

        <h3>Email Analysis Results</h3>

        <div class="analysis-item">

            <h4>1. Suspicious Sender</h4>

            <p>
                The sender address uses a fictional domain
                rather than a verified organisation's domain.
            </p>

        </div>

        <div class="analysis-item">

            <h4>2. Urgent Language</h4>

            <p>
                The message pressures the recipient to act
                immediately by threatening account suspension.
            </p>

        </div>

        <div class="analysis-item">

            <h4>3. Suspicious Link</h4>

            <p>
                The example address uses an unfamiliar,
                fictional domain.
            </p>

        </div>

        <div class="analysis-item">

            <h4>4. Generic Greeting</h4>

            <p>
                The email says "Hello User" instead of
                addressing a specific recipient.
            </p>

        </div>

        <h3 class="wrong">

            Conclusion: This is a simulated phishing email.

        </h3>

        <p>
            Never trust an email simply because it looks
            professional. Verify unexpected requests through
            an organisation's official communication channel.
        </p>

    `;

}


// 10. URL INSPECTION LAB

function inspectURL(exampleNumber) {

    if (![1, 2, 3].includes(exampleNumber)) {

        return;

    }

    inspectedURLs.add(exampleNumber);

    localStorage.setItem(
        "phishguardInspectedURLs",
        JSON.stringify([...inspectedURLs])
    );

    updateDashboard();

    const result = document.getElementById(
        "url-result-" + exampleNumber
    );

    let analysis = "";

    if (exampleNumber === 1) {

        analysis = `

            <h4 class="correct">Looks Like a Familiar Domain</h4>

            <p>
                The displayed address uses google.com,
                a familiar domain. However, always verify
                the exact address before trusting a website.
            </p>

        `;

    } else if (exampleNumber === 2) {

        analysis = `

            <h4 class="wrong">Suspicious Example</h4>

            <p>
                The actual domain is example.invalid,
                not google.com. The word "google" appears
                only as a subdomain and may mislead visitors.
            </p>

        `;

    } else if (exampleNumber === 3) {

        analysis = `

            <h4 class="wrong">Suspicious Example</h4>

            <p>
                This address uses an unfamiliar fictional
                domain and HTTP rather than HTTPS.
                Do not trust a website simply because its
                address contains words like "secure" or "login".
            </p>

        `;

    }

    result.innerHTML = analysis;

}


// 11. DASHBOARD UPDATE

function updateDashboard() {

    // Update quiz score

    document.getElementById("dashboard-score").textContent =

        latestQuizScore === null
            ? "0 / 5"
            : latestQuizScore + " / " + questions.length;


    // Update email analysis

    document.getElementById("dashboard-email").textContent =

        emailAnalysisCompleted
            ? "Completed"
            : "Not Started";


    // Update inspected URLs

    document.getElementById("dashboard-urls").textContent =

        inspectedURLs.size + " / 3";


    // Calculate learning progress

    let completedActivities = 0;

    if (latestQuizScore !== null) {

        completedActivities++;

    }

    if (emailAnalysisCompleted) {

        completedActivities++;

    }

    if (inspectedURLs.size === 3) {

        completedActivities++;

    }

    const progress = Math.round(

        (completedActivities / 3) * 100

    );

    document.getElementById("dashboard-progress").textContent =

        progress + "%";

}


// 12. INITIALIZE DASHBOARD

document.addEventListener("DOMContentLoaded", function () {

    updateDashboard();

});
// 13. RESET DASHBOARD PROGRESS

function resetProgress() {

    const confirmReset = confirm(
        "Are you sure you want to clear all your PhishGuard progress?"
    );

    if (!confirmReset) {
        return;
    }

    // Clear saved browser data
    localStorage.removeItem("phishguardQuizScore");
    localStorage.removeItem("phishguardEmailCompleted");
    localStorage.removeItem("phishguardInspectedURLs");

    // Reset JavaScript variables
    latestQuizScore = null;
    emailAnalysisCompleted = false;
    inspectedURLs.clear();

    currentQuestion = 0;
    score = 0;

    // Update dashboard
    updateDashboard();

    // Reset the activity displays
    document.getElementById("quiz-container").innerHTML = `
        <button onclick="startQuiz()">
            Start Awareness Quiz
        </button>
    `;

    document.getElementById("email-analysis").innerHTML = "";

    document.getElementById("url-result-1").innerHTML = "";
    document.getElementById("url-result-2").innerHTML = "";
    document.getElementById("url-result-3").innerHTML = "";

    alert("Your PhishGuard progress has been reset.");

}
