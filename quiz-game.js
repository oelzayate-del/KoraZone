const players2022 = [
    { name: "Kylian Mbappe", flag: "fr" },
    { name: "Lionel Messi", flag: "ar" },
    { name: "Julian Alvarez", flag: "ar" },
    { name: "Olivier Giroud", flag: "fr" },
    { name: "Enner Valencia", flag: "ec" },
    { name: "Cody Gakpo", flag: "nl" },
    { name: "Goncalo Ramos", flag: "pt" },
    { name: "Marcus Rashford", flag: "gb-eng" },
    { name: "Alvaro Morata", flag: "es" },
    { name: "Richarlison", flag: "br" }
];

/* لاعبين إضافيين للبحث */
const allPlayers = [
    ...players2022,

    { name: "Neymar", flag: "br" },
    { name: "Cristiano Ronaldo", flag: "pt" },
    { name: "Mohamed Salah", flag: "eg" },
    { name: "Karim Benzema", flag: "fr" },
    { name: "Harry Kane", flag: "gb-eng" },
    { name: "Kevin De Bruyne", flag: "be" },
    { name: "Erling Haaland", flag: "no" },
    { name: "Vinicius Junior", flag: "br" },
    { name: "Rodrygo", flag: "br" },
    { name: "Sadio Mane", flag: "sn" },
    { name: "Robert Lewandowski", flag: "pl" },
    { name: "Luka Modric", flag: "hr" },
    { name: "Son Heung-min", flag: "kr" },
    { name: "Romelu Lukaku", flag: "be" },
    { name: "Antoine Griezmann", flag: "fr" },
    { name: "Pedri", flag: "es" },
    { name: "Gavi", flag: "es" },
    { name: "Bukayo Saka", flag: "gb-eng" },
    { name: "Phil Foden", flag: "gb-eng" },
    { name: "Jude Bellingham", flag: "gb-eng" },
    { name: "Raheem Sterling", flag: "gb-eng" },
    { name: "Bruno Fernandes", flag: "pt" },
    { name: "Bernardo Silva", flag: "pt" },
    { name: "Casemiro", flag: "br" },
    { name: "Thiago Silva", flag: "br" },
    { name: "Sergio Ramos", flag: "es" },
    { name: "Gerard Pique", flag: "es" },
    { name: "Angel Di Maria", flag: "ar" },
    { name: "Paulo Dybala", flag: "ar" },
    { name: "Lautaro Martinez", flag: "ar" },
    { name: "Edinson Cavani", flag: "uy" },
    { name: "Luis Suarez", flag: "uy" },
    { name: "Darwin Nunez", flag: "uy" }
];

const params = new URLSearchParams(window.location.search);
const quizYear = params.get("quiz");

const players = quizYear === "2026" ? [] : players2022;

const playerCards = document.querySelectorAll(".top10-player");

/* إظهار الأعلام فقط في البداية */
playerCards.forEach(function (card, index) {

    const player = players[index];

    if (!player) return;

    card.querySelector(".player-name").innerText = player.name;

    const flag = document.createElement("img");

    flag.className = "player-flag";
    flag.src = "https://flagcdn.com/w40/" + player.flag + ".png";
    flag.alt = "";

    card.insertBefore(
        flag,
        card.querySelector(".player-name")
    );
});


const searchInput = document.getElementById("playerSearch");
const searchResults = document.getElementById("searchResults");
const wrongMessage = document.getElementById("wrongMessage");

const solvedPlayers = new Set();


/* البحث بالإنجليزي */
function normalize(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, "");
}


/* عند الكتابة */
searchInput.addEventListener("input", function () {

    const value = normalize(this.value);

    searchResults.innerHTML = "";
    wrongMessage.innerText = "";

    if (value.length < 3) {
        return;
    }

    /* اللاعبين الذين يبدأ اسمهم بالحروف المكتوبة */
    const matches = allPlayers.filter(function (player) {

        if (solvedPlayers.has(player.name)) {
            return false;
        }

       return normalize(player.name).includes(value);
    });


    /* مفيش لاعب */
    if (matches.length === 0) {

        wrongMessage.innerText =
            "هذا اللاعب غير موجود بالقائمة";

        return;
    }


    /* عرض النتائج */
    matches.forEach(function (player) {

        const result = document.createElement("button");

        result.type = "button";
        result.innerText = player.name;

        result.style.display = "block";
        result.style.margin = "8px auto";
        result.style.padding = "10px 20px";
        result.style.borderRadius = "8px";
        result.style.border = "none";
        result.style.cursor = "pointer";

        result.onclick = function () {

            searchInput.value = "";
            searchResults.innerHTML = "";
            wrongMessage.innerText = "";

            /* هل اللاعب من الـ Top 10؟ */
            const index = players.findIndex(function (p) {
                return p.name === player.name;
            });


            /* إجابة صحيحة */
            if (index !== -1) {

                const card = playerCards[index];

                card.querySelector(".player-name").style.setProperty(
    "display",
    "inline",
    "important"
);

                card.style.background = "#22c55e";

                

            }

            /* إجابة غلط */
            else {

                wrongMessage.innerText =
                    "إجابة غلط ❌";
            }
        };

        searchResults.appendChild(result);
    });
});