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
