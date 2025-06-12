// 🎵 Play background audio but delay until user clicks center message
const backgroundAudio = new Audio("bubble-sound.mp3");
backgroundAudio.loop = true;
backgroundAudio.volume = 0.3;


// Wait for DOM to load


document.addEventListener("DOMContentLoaded", function () {
    const centerMessage = document.getElementById("centerMessage");
    const baliIntro = document.getElementById("baliIntro");
    const birthdayContainer = document.getElementById("birthdayMessageContainer");
    const birthdayForm = document.getElementById("birthdayForm");
    const coupon = document.getElementById("coupon");
    const clownfish = document.querySelector(".clownfish");
    const explorationForm = document.getElementById("explorationForm");
    const speechBubble = document.querySelector(".speech-bubble");
    const baliTurtle = document.querySelector(".bali-turtle");

    const speechRows = [
        "HEY! I´m Bali! 🐢",
        "I’ve been looking for a very special birthday girl...",
        "Can you maybe help me find her???",
        "I have this magic questionnaire...",
        "Apparently, only she can answer it! 🎉"
    ];

    centerMessage.addEventListener("click", () => {
        centerMessage.classList.add("fade-out");

        // Play background audio
        backgroundAudio.play().catch((e) => {
            console.warn("Autoplay blocked — will resume on user interaction.");
            document.addEventListener("click", () => {
                backgroundAudio.play();
            }, { once: true });
        });

        // After fade-out, begin the animation sequence
        setTimeout(() => {
            centerMessage.style.display = "none";

            // Show Bali and swim in
            baliIntro.classList.remove("hidden");
            baliTurtle.style.animation = "swimInCurved 6s ease-in-out forwards";

            // Start speech after swim
            setTimeout(() => {
                speechBubble.classList.add("fade-in");
                displaySpeechRow();
            }, 6000);
        }, 4000); // match fade-out duration
    });

    let speechIndex = 0;

    function displaySpeechRow() {
        if (speechIndex < speechRows.length) {
            const row = document.createElement("p");
            row.innerHTML = speechRows[speechIndex];
            row.classList.add("fade-in-row");
            speechBubble.appendChild(row);

            if (speechIndex === 0) {
                baliTurtle.classList.add("dancing");
            }

            speechIndex++;
            setTimeout(displaySpeechRow, 2500);
        } else {
            // Show the form after Bali and speech
            setTimeout(() => {
                baliIntro.style.display = "none";
                birthdayContainer.classList.remove("hidden");
                birthdayContainer.style.display = "block";
                birthdayForm.classList.remove("hidden");
                birthdayForm.style.display = "block";
                document.getElementById("birthdayMessage").classList.add("fade-in-message");
            }, 2000);
        }
    }

    // Birthday form logic
    document.getElementById("birthdayForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim().toLowerCase();
        const birthday = document.getElementById("birthday").value.replace(/\./g, "-");
        const answer = document.getElementById("question").value.trim().toLowerCase();

        if (name === "nele" && (birthday === "1999-06-12" || birthday === "12-06-1999") && answer === "6") {
            alert("Correct values! Revealing surprise...");
            birthdayContainer.style.display = "none";
            birthdayForm.style.display = "none";
            coupon.classList.remove("hidden");
            coupon.style.display = "block";
            clownfish.style.display = "block";
            displayRow();
        } else {
            alert("Well damn! Are you sure you´re Nele?");
        }
    });

    // Surprise messages
    function displayRow() {
        const messageRows = [
            "🎉 AH! you must be that hot! birthday girl! everyone has been talking about...",
            "Good job on answering all those questions.",
            "Cant believe what a Star Wars nerd you are...",
            "loooooooooser Alerrt 😏",
            "Anyway... Biggest congratulations on turning another full round on this weird blue ball.",
            "26 whole rounds?! That is wild! I hope you have the bestest of all Birthdays! 🎉",
            "To celebrate the past AND! the future on this very special day",
            "I thought you maybe wanted to see something from the past! in the future?",
            "It can be hard letting go, but it can be even cooler to discover old things a new!",
            "WELL...WHAT IS IT?!",
            "✨ **AN ALL-INCLUSIVE TRIP FOR TWO! TOOO...** ✨",
            "to your favorite wreck-bass 😱🐟💙",
            "Submit a date below and an all-inclusive trip will be planned to your buddys new aquatic residence. You can take any of your friends with you! Feel free to also insert the name of your fish spotting accomplice!",
            "DAMN! A SHARK?!?! Gotta gooo 💨",
        ];

        let index = 0;
        document.getElementById("couponText").innerHTML = "";

        function showRow() {
            if (index < messageRows.length) {
                const row = document.createElement("p");
                row.innerHTML = messageRows[index];
                row.classList.add("fade-in-row");
                document.getElementById("couponText").appendChild(row);
                coupon.scrollIntoView({ behavior: "smooth", block: "center" });
                index++;
                setTimeout(showRow, 5000);
            } else {
                // Clownfish swims away, then form appears
                setTimeout(() => {
                    clownfish.style.animation = "swimAwayFast 1.5s ease-in-out forwards";
                    setTimeout(() => {
                        coupon.style.display = "none";
                        explorationForm.classList.remove("hidden");
                        explorationForm.style.display = "block";
                    }, 2000);
                }, 2000);
            }
        }

        showRow();
    }
});
