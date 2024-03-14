document.getElementById("roll").addEventListener("click", function () {
  // Generate random dice rolls
  let scores = [rollDice(), rollDice(), rollDice()];

  // Display scores
  document.getElementById("member-1").textContent = scores[0];
  document.getElementById("member-2").textContent = scores[1];
  document.getElementById("member-3").textContent = scores[2];

  // Determine the ranking
  determineWinner(scores);
});

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function determineWinner(scores) {
  let sortedScores = [...scores].sort((a, b) => b - a);
  let colors = ["red", "yellow", "green"];

  // Handle draw cases
  if (
    sortedScores[0] === sortedScores[1] &&
    sortedScores[1] === sortedScores[2]
  ) {
    colors = ["blue", "blue", "blue"];
  } else if (sortedScores[0] === sortedScores[1]) {
    colors = ["blue", "blue", "red"];
  } else if (sortedScores[1] === sortedScores[2]) {
    colors[1] = "blue"; // Middle and last have the same score
    colors[2] = "blue";
  }

  let winners = [];

  // Update colors and identify winner(s)
  for (let i = 0; i < scores.length; i++) {
    let dice = document.getElementById(`member-${i + 1}`);
    dice.className = "dice"; // Reset class
    let colorIndex = sortedScores.indexOf(scores[i]);
    dice.classList.add(colors[colorIndex]);
    colors[colorIndex] = ""; // Prevent reusing the color in case of tie
    if (sortedScores[0] === scores[i]) {
      winners.push(`Member ${i + 1}`);
    }
  }

  // Display winner(s)
  document.getElementById("winner").textContent = `Winner: ${winners.join(
    ", "
  )}`;
}
