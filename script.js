function scrollToMatches() {

    document
        .getElementById("matches")
        .scrollIntoView({
            behavior: "smooth"
        });

}


let quizScore = 0;
let currentQuestion = 0;

const quizQuestions = [
    {
        question: "لعب مع: مانشستر يونايتد، ريال مدريد، يوفنتوس. من هو؟",
        options: ["كريستيانو رونالدو", "مبابي", "نيمار", "هالاند"],
        answer: "كريستيانو رونالدو"
    },
    {
        question: "لعب مع: برشلونة، باريس سان جيرمان، إنتر ميامي. من هو؟",
        options: ["ميسي", "صلاح", "بنزيما", "مودريتش"],
        answer: "ميسي"
    },
    {
        question: "لعب مع: ليفربول، تشيلسي، مانشستر سيتي. من هو؟",
        options: ["رحيم سترلينج", "هاري كين", "سون", "دي بروين"],
        answer: "رحيم سترلينج"
    }
];


function startQuiz() {

    quizScore = 0;
    currentQuestion = 0;

    document.getElementById("quizScore").innerText =
        "النقاط: 0";
        document.getElementById("quizProgress").style.width =
    "0%";

    document.getElementById("quizStart").style.display = "none";

    showQuestion();

}


function showQuestion() {

    let question = quizQuestions[currentQuestion];

    document.getElementById("quizQuestion").innerText =
        question.question;

    let optionsContainer =
        document.getElementById("quizOptions");

    optionsContainer.innerHTML = "";

    question.options.forEach(function (option) {

        let button = document.createElement("button");

        button.innerText = option;

        button.onclick = function () {

            let buttons =
                optionsContainer.querySelectorAll("button");

            buttons.forEach(function (btn) {
                btn.disabled = true;
            });

            if (option === question.answer) {
                button.style.background = "#22c55e";
                button.style.color = "white";
            } else {
                button.style.background = "#ef4444";
                button.style.color = "white";

                buttons.forEach(function (btn) {
                    if (btn.innerText === question.answer) {
                        btn.style.background = "#22c55e";
                        btn.style.color = "white";
                    }
                });
            }

            checkAnswer(option);
        };

        optionsContainer.appendChild(button);

    });

}


function checkAnswer(answer) {

    let correctAnswer =
        quizQuestions[currentQuestion].answer;

    if (answer === correctAnswer) {
        quizScore++;
    }

    let progress =
        ((currentQuestion + 1) / quizQuestions.length) * 100;

    document.getElementById("quizProgress").style.width =
        progress + "%";

    document.getElementById("quizScore").innerText =
        "النقاط: " + quizScore;

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {

        setTimeout(function () {
            showQuestion();
        }, 700);

    } else {

        setTimeout(function () {

            document.getElementById("quizQuestion").innerText =
                "انتهى اللغز 🎉";

            document.getElementById("quizOptions").innerHTML =
                "";

            document.getElementById("quizScore").innerText =
                "نتيجتك: " + quizScore + " / " +
                quizQuestions.length;

            document.getElementById("quizStart").style.display =
                "";

            document.getElementById("quizStart").innerText =
                "العب مرة أخرى";
                let newQuizButton =
    document.getElementById("quizNewButton");

if (newQuizButton === null) {

    newQuizButton =
        document.createElement("a");

    newQuizButton.id =
        "quizNewButton";

    newQuizButton.href =
        "quiz.html";

    newQuizButton.innerText =
        "تحدي جديد 🔥";

    newQuizButton.className =
        "quiz-new-button";

    document.getElementById("quizStart")
        .parentNode
        .appendChild(newQuizButton);
}

        }, 700);
    }
}


document
    .getElementById("searchInput")
    .addEventListener("keyup", function () {

        let value = this.value
            .toLowerCase()
            .replace(/[أإآ]/g, "ا");

        let cards =
            document.querySelectorAll(
                ".news-card, .player, .match-card, .transfer-card, tr, #quiz"
            );

        let firstResult = null;

        cards.forEach(function (card) {

            let text =
                card.innerText
                    .toLowerCase()
                    .replace(/[أإآ]/g, "ا");

            if (value === "" || text.includes(value)) {

                card.style.display = "";

                if (value !== "" && firstResult === null) {
                    firstResult = card;
                }

            } else {

                card.style.display = "none";

            }

        });

        if (firstResult !== null) {

            firstResult.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

    });