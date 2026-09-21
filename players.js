let koraPlayers = [];
let koraPlayersLoaded = false;

async function loadKoraPlayers() {
    try {
        const response = await fetch("kora_names.csv");

        if (!response.ok) {
            throw new Error("لم يتم العثور على ملف اللاعبين");
        }

        const csvText = await response.text();

        const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== "");

        // تخطي أول سطر لأنه أسماء الأعمدة
        koraPlayers = lines.slice(1).map(line => {
            const parts = line.split(",");

            return {
                name: parts[0]?.trim() || "",
                country: parts[1]?.trim() || ""
            };
        }).filter(player => player.name !== "");

        koraPlayersLoaded = true;

        console.log("تم تحميل لاعبي KoraZone:", koraPlayers.length);

    } catch (error) {
        console.error("خطأ في تحميل قاعدة اللاعبين:", error);
    }
}

loadKoraPlayers();
const playerDatabaseResults =
    document.getElementById("playerDatabaseResults");

const mainSearchInput =
    document.getElementById("searchInput");

if (mainSearchInput && playerDatabaseResults) {

    mainSearchInput.addEventListener("input", function () {

        const value = this.value.trim().toLowerCase();

        playerDatabaseResults.innerHTML = "";

        if (value.length < 2) {
            return;
        }

        if (!koraPlayersLoaded) {
            playerDatabaseResults.innerText =
                "قاعدة اللاعبين ما خلصتش تحميل لسه...";
            return;
        }

        const results = koraPlayers
            .filter(function (player) {
                return player.name.toLowerCase().includes(value);
            })
            .slice(0, 10);

        if (results.length === 0) {
            playerDatabaseResults.innerText =
                "لا يوجد لاعب بهذا الاسم";
            return;
        }

        results.forEach(function (player) {

            const result = document.createElement("div");

            result.innerText = player.name;

            result.style.padding = "10px";
            result.style.cursor = "pointer";
            result.style.background = "#071b2d";
            result.style.color = "white";
            result.style.borderBottom =
                "1px solid rgba(255,255,255,0.1)";

            result.onclick = function () {
                mainSearchInput.value = player.name;
                playerDatabaseResults.innerHTML = "";
            };

            playerDatabaseResults.appendChild(result);
        });
    });
}
