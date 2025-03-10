const pmResponses = [
    "What is the status?",
    "What are the blockers?",
    "Can we deliver this sooner?",
    "What is the impact of not delivering on time?",
    "Let’s take this offline.",
    "Let’s circle back on this later.",
    "Have you added this to the roadmap?",
    "Can you put this in a deck?",
    "Can you provide a high-level overview?",
    "We need to align with stakeholders first.",
    "Let's sync on this.",
    "Let's touch base next week.",
    "What’s the ETA?",
    "Have we looped in the right people?",
    "Let’s park this for now.",
    "We need to be more agile.",
    "Can we break this into smaller tasks?",
    "Let's not reinvent the wheel.",
    "Can we get a quick win here?",
    "We need to manage expectations.",
    "Let's not boil the ocean.",
    "Let's pivot if necessary.",
    "Can we get some quick alignment on this?",
    "Have we identified all dependencies?",
    "Who owns this action item?",
    "Can we do this in parallel?",
    "Have we documented this anywhere?",
    "We need to stay on top of this.",
    "Let’s keep the momentum going.",
    "We should socialize this idea first.",
    "We need to ensure cross-functional alignment.",
    "This is a high priority now.",
    "Let's keep this at a high level.",
    "Can we distill this into an action plan?",
    "We need to double down on this.",
    "Do we have data to back this up?",
    "Have we done a retro on this?",
    "Can we get a summary in bullet points?",
    "Can we timebox this discussion?",
    "Who are the key stakeholders?",
    "Can we make this a bit more strategic?",
    "We need to align with leadership on this.",
    "Can you send me a recap after the meeting?",
    "This is on our radar.",
    "What does success look like here?",
    "We need to focus on the bigger picture.",
    "Can you create a Miro board for this?",
    "How does this ladder up to our OKRs?",
    "Are we tracking this in Jira?",
    "We need a north star for this initiative.",
    "Let's reframe the problem statement.",
    "Are we tracking the KPIs?",
    "How does this impact the roadmap?",
    "What are the risks involved?",
    "Can we get a rough estimate?",
    "We need to de-risk this.",
    "Let’s sync on this offline.",
    "Can we move the needle on this?",
    "Who is the DRI (Directly Responsible Individual)?",
    "Can we get this in front of leadership?",
    "What’s the bandwidth of the team?",
    "Can we optimize this process?",
    "We should document this in Confluence.",
    "Can we leverage existing solutions?",
    "Let’s schedule a working session.",
    "What’s the go-to-market strategy?",
    "Can we make this more digestible?",
    "Do we have buy-in from leadership?",
    "We need to be more proactive.",
    "Let's keep this in the backlog for now.",
    "Is this a must-have or a nice-to-have?",
    "Let’s not over-engineer this.",
    "Have we considered alternative approaches?",
    "Let’s keep this MVP-focused.",
    "We need to stay agile.",
    "How do we measure success here?",
    "Let’s align on key takeaways.",
    "Can we revisit this next sprint?",
    "Can you summarize this in a one-pager?",
    "How does this impact our quarterly goals?",
    "What are the trade-offs here?",
    "We need to keep our eyes on the prize.",
    "What’s our level of confidence in this?",
    "Who is the primary point of contact for this?"
];

const questions = [
    `Are you 'Deadline Obsessed'? Are you always asking, "Is this on track?" and pushing for unrealistic deadlines?`, 
    `Are you a "Status Call Addict"? You truly believe that more meetings = more productivity. Ah...and..you schedule daily stand-ups that last an hour?`,
    `Are you "Tech-Illiterate"? You easily get confused when devs talk about APIs, databases, or deployment pipelines?`,
    `Are you a "Buzzword Machine"? Do you throw around terms like "synergy", "agile", "scrum" or "stakeholder buy-in"?)`, 
    `You just can’t say NO to new feature requests and you keep adding things without adjusting deadlines?`,
    `Do you live and breathe "All-Talk, No-Action"? Do you spend more time making roadmaps than ensuring execution?`,
    `Micromanager is your second name? You seek updates on every single commit?`,
    `"Are you a PowerPoint Engineer? Can you make beautiful slides with no clue how the tech actual works?"`,
];

let messageCount = 0; score = 0, currentQuestion = 0;

const init = function() {
    let response = pmResponses[Math.floor(Math.random() * pmResponses.length)];
    addMessage(response, "pm");
}

function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput) return;
    
    addMessage(userInput, "user");
    setTimeout(() => {
        let response = pmResponses[Math.floor(Math.random() * pmResponses.length)];
        addMessage(response, "pm");
    }, 500);
    
    document.getElementById("user-input").value = "";
    
    messageCount++;
    if (messageCount === 3) 
        triggerAchievement();
}

document.getElementById("user-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        sendMessage(); 
    }
});

function addMessage(text, sender) {
    const messagesContainer = document.getElementById("messages");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function triggerAchievement() {
    const chatBox = document.getElementById("chat-box");
    const achievement = document.createElement("div");

    achievement.innerHTML = `
    <div class="result-container">
        <h3 class="result-title">Congratulations!</h3>
        <p class="result-text"> You survived 3 rounds with a PM! 🏅 </p>
        <p class="result-text"> Feel free to add this to your yearly performance review 😉 and share with the world!</p>
    </div>`;

    chatBox.appendChild(achievement);
    
    launchConfetti(); // Confetti effect 🎉
    // generateBadge(); // Generate Badge Image

    // Add LinkedIn Sharing Functionality
    document.getElementById("linkedin-share").addEventListener("click", shareOnLinkedIn);
}

function launchConfetti() {
    const duration = 2 * 1000; // 3 seconds
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            spread: 60
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function startQuiz() {
    document.getElementById('chat-box').style.display = 'none';
    document.getElementById('quiz-box').style.display = 'block';
    document.getElementById('button-quiz').style.display = 'none';
    document.getElementById('chat-h1').style.display = 'none';
    document.getElementById('pm-h1').style.display = 'none';
    showQuestion();
}

function startChat() {
    document.getElementById('chat-box').style.display = 'block';
    document.getElementById('quiz-box').style.display = 'none';
    document.getElementById('button-quiz').style.display = 'block';
    document.getElementById('button-chat').style.display = 'none';
    document.getElementById('chat-h1').style.display = 'block';
    document.getElementById('pm-h1').style.display = 'block';
    score = 0, currentQuestion = 0;
    document.getElementById('quiz-box').innerHTML = `
        <div id="question" class="question"></div>
        <div id="options"></div>`;
}

function showQuestion() {
    if (currentQuestion >= questions.length) return showResults();
    
    document.getElementById('question').innerHTML = `
        <span class="question-number">Question ${currentQuestion + 1}/8</span>
        <span class="question-text">${questions[currentQuestion]}</span>
    `;

    document.getElementById('options').innerHTML = `
        <div class='option' onclick='answer(1)'>✅ Yes</div>
        <div class='option' onclick='answer(0)'>❌ No</div>
    `;
}

function answer(choice) {
    score += choice;
    currentQuestion++;
    showQuestion();
}

function showResults() {
    const totalQuestions = 8; 
    const percentage = Math.round((score / totalQuestions) * 100);
    let resultText;

    if (score === 0) resultText = "You are probably a Developer/DevOps. You would fail miserably as a PM (and that's probably a good thing).";
    else if (score === 1) resultText = "You have a Tester mindset. Stay away from PM work!";
    else if (score === 2) resultText = "You’re a Tech Enthusiast. Not a PM yet.";
    else if (score === 3) resultText = "You’re an Accidental PM. Thinks like an engineer.";
    else if (score === 4) resultText = "You’re a Balanced Hybrid. Can manage projects but still have a soul.";
    else if (score === 5) resultText = "You’re an Aspiring PM. Beware of PowerPoint addiction.";
    else if (score === 6) resultText = "You’re a Natural PM. Efficient but slightly annoying to devs.";
    else if (score === 7) resultText = "You’re a PM Jedi. Devs fear and respect you.";
    else resultText = "You are a True PM Overlord. Your calendar is your kingdom, your Gantt chart is your sword!";

    // Update the UI
    document.getElementById('quiz-box').innerHTML = `
        <div class="result-container">
            <h3 class="result-title">Your Result:</h3>
            <div class="progress-bar">
                <div class="progress" style="width: ${percentage}%;"></div>
                <span class="progress-text">${percentage}%</span>
            </div>
            <p class="result-text">${resultText}</p>
        </div>
    `;

    document.getElementById('button-chat').style.display = 'block';
}


init();

// Load confetti script dynamically
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.3.1/dist/confetti.browser.min.js";
document.body.appendChild(script);