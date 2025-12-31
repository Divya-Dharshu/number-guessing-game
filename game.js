const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let highScores = {
  easy: null,
  medium: null,
  hard: null
};

function welcomeMessage() {
  console.log("\n🎯 Welcome to the Number Guessing Game!");
  console.log("I'm thinking of a number between 1 and 100.");
  console.log("You have limited chances based on difficulty.\n");
}

function selectDifficulty(callback) {
  console.log("Please select the difficulty level:");
  console.log("1. Easy (10 chances)");
  console.log("2. Medium (5 chances)");
  console.log("3. Hard (3 chances)");

  rl.question("\nEnter your choice: ", (choice) => {
    let chances, level;

    switch (choice) {
      case "1":
        chances = 10;
        level = "easy";
        break;
      case "2":
        chances = 5;
        level = "medium";
        break;
      case "3":
        chances = 3;
        level = "hard";
        break;
      default:
        console.log("❌ Invalid choice. Defaulting to Medium.");
        chances = 5;
        level = "medium";
    }

    console.log(`\n✅ You selected ${level.toUpperCase()} difficulty.`);
    callback(chances, level);
  });
}

function playGame(chances, level) {
  const number = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;
  const startTime = Date.now();

  function guessNumber() {
    if (attempts >= chances) {
      console.log(`\n❌ Game Over! The correct number was ${number}.`);
      return playAgain();
    }

    rl.question("\nEnter your guess: ", (input) => {
      const guess = Number(input);
      attempts++;

      if (guess === number) {
        const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`\n🎉 Congratulations! You guessed the number in ${attempts} attempts.`);
        console.log(`⏱️ Time Taken: ${timeTaken} seconds`);

        if (!highScores[level] || attempts < highScores[level]) {
          highScores[level] = attempts;
          console.log("🏆 New High Score!");
        }

        return playAgain();
      } else if (guess > number) {
        console.log("❌ Incorrect! The number is LESS than your guess.");
      } else {
        console.log("❌ Incorrect! The number is GREATER than your guess.");
      }

      // Hint system
      if (attempts === chances - 1) {
        console.log("💡 Hint: The number is " + (number % 2 === 0 ? "EVEN" : "ODD"));
      }

      guessNumber();
    });
  }

  guessNumber();
}

function playAgain() {
  console.log("\n📊 High Scores:");
  console.log(highScores);

  rl.question("\nDo you want to play again? (yes/no): ", (answer) => {
    if (answer.toLowerCase() === "yes") {
      startGame();
    } else {
      console.log("\n👋 Thanks for playing!");
      rl.close();
    }
  });
}

function startGame() {
  welcomeMessage();
  selectDifficulty(playGame);
}

startGame();
