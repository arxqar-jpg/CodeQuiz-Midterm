const quizData = {
    java: {
        title: "Java Basics",
        questions: [
            {
                question: "Which keyword is used to create a class in Java?",
                answers: ["class", "new", "void", "public"],
                correct: 0,
                explanation: "The class keyword declares a new class in Java."
            },
            {
                question: "Which data type stores true or false values?",
                answers: ["String", "int", "boolean", "double"],
                correct: 2,
                explanation: "boolean is the Java type used for the two logical values true and false."
            },
            {
                question: "Which method is the usual starting point of a Java program?",
                answers: ["start()", "main()", "run()", "init()"],
                correct: 1,
                explanation: "The JVM starts a standard Java application from its main method."
            },
            {
                question: "Which operator checks equality between primitive values?",
                answers: ["=", "==", "!=", "=>"],
                correct: 1,
                explanation: "== compares primitive values, while = assigns a value."
            },
            {
                question: "Which collection can store multiple values in a fixed-size sequence?",
                answers: ["array", "if", "class", "switch"],
                correct: 0,
                explanation: "An array stores several values of the same type and has a fixed length."
            }
        ]
    },
    python: {
        title: "Python Basics",
        questions: [
            {
                question: "Which symbol starts a comment in Python?",
                answers: ["//", "#", "<!--", "**"],
                correct: 1,
                explanation: "Python uses # for a single-line comment."
            },
            {
                question: "Which keyword creates a function in Python?",
                answers: ["func", "function", "def", "method"],
                correct: 2,
                explanation: "Functions in Python are declared with the def keyword."
            },
            {
                question: "Which brackets are normally used for a Python list?",
                answers: ["()", "{}", "[]", "<>"],
                correct: 2,
                explanation: "List values are written inside square brackets, for example [1, 2, 3]."
            },
            {
                question: "Which operator is used for exponentiation in Python?",
                answers: ["^", "**", "//", "%%"],
                correct: 1,
                explanation: "Python uses ** for powers, so 2 ** 3 equals 8."
            },
            {
                question: "Which value represents no value in Python?",
                answers: ["null", "none", "None", "undefined"],
                correct: 2,
                explanation: "None is Python's special value for the absence of a value."
            }
        ]
    },
    web: {
        title: "HTML & CSS",
        questions: [
            {
                question: "Which HTML tag is used for the main page heading?",
                answers: ["<p>", "<h1>", "<head>", "<title>"],
                correct: 1,
                explanation: "<h1> is the highest-level visible heading and should describe the main page topic."
            },
            {
                question: "Which CSS property changes text color?",
                answers: ["font-color", "text-color", "color", "foreground"],
                correct: 2,
                explanation: "The CSS color property sets the foreground color of text."
            },
            {
                question: "Which layout system is one-dimensional?",
                answers: ["Flexbox", "Grid", "Table", "Float"],
                correct: 0,
                explanation: "Flexbox lays items out mainly along one axis: a row or a column."
            },
            {
                question: "Which meta tag helps a page scale correctly on mobile screens?",
                answers: ["charset", "viewport", "author", "keywords"],
                correct: 1,
                explanation: "The viewport meta tag tells mobile browsers how to size and scale the page."
            },
            {
                question: "Which Bootstrap class creates a responsive fixed-width container?",
                answers: [".wrapper", ".container", ".box", ".layout"],
                correct: 1,
                explanation: "Bootstrap's .container class centers content and changes max-width at responsive breakpoints."
            }
        ]
    }
};

let currentTopic = null;
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let secondsLeft = 60;
let timerId = null;
let startedAt = 0;
let currentStreak = 0;

const topicButtons = document.querySelectorAll(".quiz-topic-btn");
const quizIntro = document.getElementById("quizIntro");
const quizPanel = document.getElementById("quizPanel");
const resultPanel = document.getElementById("resultPanel");

function getBestScore(topic) {
    return Number(localStorage.getItem(`codequiz-best-${topic}`) || 0);
}

function refreshSavedProgress() {
    const topics = Object.keys(quizData);
    let bestOverall = 0;
    let tried = 0;

    document.querySelectorAll("[data-best-topic]").forEach(element => {
        const topic = element.dataset.bestTopic;
        const best = getBestScore(topic);
        element.textContent = `${best}/5`;
    });

    topics.forEach(topic => {
        const best = getBestScore(topic);
        if (best > 0) tried += 1;
        bestOverall = Math.max(bestOverall, best);
    });

    const totalXp = Number(localStorage.getItem("codequiz-total-xp") || 0);
    const homeTotalXp = document.getElementById("homeTotalXp");
    const homeTopicsTried = document.getElementById("homeTopicsTried");
    const homeBestScore = document.getElementById("homeBestScore");

    if (homeTotalXp) homeTotalXp.textContent = String(totalXp);
    if (homeTopicsTried) homeTopicsTried.textContent = `${tried}/3`;
    if (homeBestScore) homeBestScore.textContent = `${bestOverall}/5`;
}

function startQuiz(topic) {
    if (!quizData[topic] || !quizPanel || !resultPanel || !quizIntro) return;

    currentTopic = topic;
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    secondsLeft = 60;
    currentStreak = 0;
    startedAt = Date.now();

    clearInterval(timerId);
    quizIntro.classList.add("d-none");
    resultPanel.classList.add("d-none");
    quizPanel.classList.remove("d-none");

    topicButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.topic === topic);
    });

    document.getElementById("quizTitle").textContent = quizData[topic].title;
    document.getElementById("timer").textContent = String(secondsLeft);
    document.getElementById("streakValue").textContent = "0";

    renderQuestion();
    updateTimerStyle();

    timerId = setInterval(() => {
        secondsLeft -= 1;
        const timer = document.getElementById("timer");
        if (timer) timer.textContent = String(Math.max(0, secondsLeft));
        updateTimerStyle();

        if (secondsLeft <= 0) {
            clearInterval(timerId);
            finishQuiz(true);
        }
    }, 1000);
}

function updateTimerStyle() {
    const timerBox = document.querySelector(".timer-box");
    if (!timerBox) return;

    timerBox.classList.toggle("warning", secondsLeft <= 20 && secondsLeft > 10);
    timerBox.classList.toggle("danger", secondsLeft <= 10);
}

function renderQuestion() {
    const item = quizData[currentTopic].questions[currentQuestion];
    const total = quizData[currentTopic].questions.length;
    const percent = Math.round(((currentQuestion + 1) / total) * 100);

    selectedAnswer = null;
    document.getElementById("questionText").textContent = item.question;
    document.getElementById("questionCounter").textContent = `Question ${currentQuestion + 1} of ${total}`;
    document.getElementById("progressPercent").textContent = `${percent}%`;
    document.getElementById("progressBar").style.width = `${percent}%`;
    document.getElementById("answerHint").textContent = "Choose one answer or press 1–4.";

    const explanationBox = document.getElementById("explanationBox");
    explanationBox.classList.add("d-none");

    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    item.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer-btn";
        button.dataset.answerIndex = String(index);

        const letter = document.createElement("span");
        letter.className = "choice-letter";
        letter.textContent = String.fromCharCode(65 + index);

        const answerText = document.createElement("span");
        answerText.textContent = answer;

        button.append(letter, answerText);
        button.addEventListener("click", () => chooseAnswer(index));
        answers.appendChild(button);
    });

    const nextButton = document.getElementById("nextButton");
    nextButton.disabled = true;
    nextButton.textContent = currentQuestion === total - 1 ? "See Result" : "Next Question";
}

function chooseAnswer(index) {
    if (selectedAnswer !== null || currentTopic === null) return;

    selectedAnswer = index;
    const item = quizData[currentTopic].questions[currentQuestion];
    const answerButtons = document.querySelectorAll(".answer-btn");

    answerButtons.forEach((button, buttonIndex) => {
        button.disabled = true;
        if (buttonIndex === item.correct) button.classList.add("correct");
        if (buttonIndex === index && index !== item.correct) button.classList.add("wrong");
    });

    if (index === item.correct) {
        score += 1;
        currentStreak += 1;
        document.getElementById("answerHint").textContent = "Correct! +20 XP";
    } else {
        currentStreak = 0;
        document.getElementById("answerHint").textContent = `Correct answer: ${item.answers[item.correct]}`;
    }

    document.getElementById("streakValue").textContent = String(currentStreak);
    document.getElementById("explanationTitle").textContent = index === item.correct ? "Nice! Why it works:" : "Explanation:";
    document.getElementById("explanationText").textContent = item.explanation;
    document.getElementById("explanationBox").classList.remove("d-none");
    document.getElementById("nextButton").disabled = false;
}

function nextQuestion() {
    if (selectedAnswer === null || currentTopic === null) return;

    const total = quizData[currentTopic].questions.length;
    if (currentQuestion < total - 1) {
        currentQuestion += 1;
        renderQuestion();
    } else {
        finishQuiz(false);
    }
}

function getAchievement(points) {
    if (points === 5) return { icon: "👑", title: "Code Master", message: "Perfect score. Every challenge was answered correctly!" };
    if (points >= 4) return { icon: "🏆", title: "Logic Champion", message: "Excellent result. Your fundamentals are strong." };
    if (points >= 3) return { icon: "⭐", title: "Rising Coder", message: "Good job. One more round can take you even higher." };
    return { icon: "🚀", title: "Code Rookie", message: "Nice start. Review the explanations and try again for a stronger score." };
}

function finishQuiz(timeExpired) {
    if (!currentTopic || !quizPanel || !resultPanel) return;

    clearInterval(timerId);

    const total = quizData[currentTopic].questions.length;
    const xp = score * 20;
    const timeUsed = Math.min(60, Math.max(0, Math.round((Date.now() - startedAt) / 1000)));
    const achievement = getAchievement(score);

    quizPanel.classList.add("d-none");
    resultPanel.classList.remove("d-none");

    document.getElementById("badgeIcon").textContent = achievement.icon;
    document.getElementById("resultTitle").textContent = timeExpired ? "Time is up!" : "Challenge complete!";
    document.getElementById("resultMessage").textContent = timeExpired ? `The timer reached zero. ${achievement.message}` : achievement.message;
    document.getElementById("scoreValue").textContent = `${score}/${total}`;
    document.getElementById("xpValue").textContent = `${xp} XP`;
    document.getElementById("timeValue").textContent = `${timeUsed}s`;
    document.getElementById("achievementName").textContent = achievement.title;

    const storageKey = `codequiz-best-${currentTopic}`;
    const previousBest = getBestScore(currentTopic);
    const best = Math.max(previousBest, score);
    localStorage.setItem(storageKey, String(best));

    const currentTotalXp = Number(localStorage.getItem("codequiz-total-xp") || 0);
    localStorage.setItem("codequiz-total-xp", String(currentTotalXp + xp));

    document.getElementById("bestScoreText").textContent = `Best score: ${best}/${total}`;
    refreshSavedProgress();

    const resultTitle = document.getElementById("resultTitle");
    if (resultTitle) resultTitle.focus({ preventScroll: true });
}

function resetToTopics() {
    clearInterval(timerId);
    currentTopic = null;
    quizPanel?.classList.add("d-none");
    resultPanel?.classList.add("d-none");
    quizIntro?.classList.remove("d-none");
    topicButtons.forEach(button => button.classList.remove("active"));
}

topicButtons.forEach(button => {
    button.addEventListener("click", () => startQuiz(button.dataset.topic));
});

document.getElementById("nextButton")?.addEventListener("click", nextQuestion);
document.getElementById("retryButton")?.addEventListener("click", () => startQuiz(currentTopic));
document.getElementById("changeTopicButton")?.addEventListener("click", resetToTopics);

document.addEventListener("keydown", event => {
    if (!quizPanel || quizPanel.classList.contains("d-none")) return;

    if (["1", "2", "3", "4"].includes(event.key) && selectedAnswer === null) {
        const index = Number(event.key) - 1;
        const button = document.querySelector(`.answer-btn[data-answer-index="${index}"]`);
        if (button) chooseAnswer(index);
    }

    if ((event.key === "Enter" || event.key === " ") && selectedAnswer !== null) {
        const nextButton = document.getElementById("nextButton");
        if (document.activeElement === document.body && nextButton && !nextButton.disabled) {
            nextQuestion();
        }
    }
});

if (quizPanel) {
    const params = new URLSearchParams(window.location.search);
    const topicFromUrl = params.get("topic");
    if (quizData[topicFromUrl]) startQuiz(topicFromUrl);
}

const randomChallenge = document.getElementById("randomChallenge");
if (randomChallenge) {
    randomChallenge.addEventListener("click", () => {
        const topics = Object.keys(quizData);
        const topic = topics[Math.floor(Math.random() * topics.length)];
        window.location.href = `quiz.html?topic=${topic}`;
    });
}

const messageInput = document.getElementById("message");
const messageCount = document.getElementById("messageCount");
if (messageInput && messageCount) {
    messageInput.addEventListener("input", () => {
        messageCount.textContent = `${messageInput.value.length}/500`;
    });
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();
        const status = document.getElementById("formStatus");
        status.textContent = "Message accepted for demo. Thank you!";
        contactForm.reset();
        if (messageCount) messageCount.textContent = "0/500";
    });
}

refreshSavedProgress();
