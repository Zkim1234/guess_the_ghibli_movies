/* Game JavaScript */

// Game Logic
class GhibliGame {
  constructor(config) {
    this.levelNum = config.levelNum;
    this.totalQuestions = config.totalQuestions || 5;
    this.timePerQuestion = config.timePerQuestion || 30;
    this.currentQuestion = 0;
    this.score = 0;
    this.timeRemaining = this.timePerQuestion;
    this.timerInterval = null;
    this.isAnswered = false;
    this.questions = [];

    this.initializeElements();
    this.loadQuestions();
  }

  initializeElements() {
    this.gameImage = document.getElementById("gameImage");
    this.choicesContainer = document.getElementById("choicesContainer");
    this.timerDisplay = document.getElementById("timerDisplay");
    this.currentScoreDisplay = document.getElementById("currentScore");
    this.resultAnimation = document.getElementById("resultAnimation");
    this.resultText = document.getElementById("resultText");
    this.resultScore = document.getElementById("resultScore");
  }

  loadQuestions() {
    fetch(`/api/questions/${this.levelNum}`)
      .then((response) => response.json())
      .then((data) => {
        this.questions = data.questions;
        this.startQuestion();
      })
      .catch((error) => {
        console.error("Error loading questions:", error);
        // Fallback - start anyway
        this.startQuestion();
      });
  }

  startQuestion() {
    if (this.currentQuestion >= this.totalQuestions) {
      this.endGame();
      return;
    }

    this.isAnswered = false;
    this.timeRemaining = this.timePerQuestion;
    this.startTimer();
    this.displayQuestion();
  }

  displayQuestion() {
    if (!this.questions || this.questions.length === 0) {
      console.log("No questions loaded");
      return;
    }

    const question = this.questions[this.currentQuestion];

    // Display image
    this.gameImage.onerror = () => {
      this.gameImage.onerror = null;
      this.gameImage.src = `/images/level0${this.levelNum}-image.jpg`;
    };
    this.gameImage.src = question.image;
    this.gameImage.alt = `Question ${this.currentQuestion + 1}`;

    // Clear previous choices
    this.choicesContainer.innerHTML = "";
    this.choicesContainer.classList.remove("level-one-choices");

    // Render based on level
    if (this.levelNum === 1) {
      this.renderMultipleChoice(question);
    } else if (this.levelNum === 2) {
      this.renderTextInput(question, 1);
    } else if (this.levelNum === 3) {
      this.renderTextInput(question, 2);
    }
  }

  renderMultipleChoice(question) {
    this.choicesContainer.classList.add("level-one-choices");

    (question.choices || []).slice(0, 3).forEach((choice) => {
      const button = document.createElement("button");
      button.className = "choice-button";
      button.textContent = choice;
      button.onclick = () => {
        const isCorrect = choice === question.correctTitle;
        this.handleAnswerSelected(isCorrect);
      };
      this.choicesContainer.appendChild(button);
    });
  }

  renderTextInput(question, inputCount) {
    if (inputCount === 1) {
      // Level 2: Title or Year
      const inputSection = document.createElement("div");
      inputSection.className = "input-section";

      const input = document.createElement("input");
      input.type = "text";
      input.className = "game-text-input";
      input.placeholder = "Enter film title or year";

      const button = document.createElement("button");
      button.className = "game-submit-button";
      button.textContent = "Enter";
      const submitAnswer = () => {
        const answer = input.value.toLowerCase().trim();
        const titleMatch = answer === question.correctTitle.toLowerCase();
        const yearMatch = answer === question.correctYear.toString();
        const isCorrect = titleMatch || yearMatch;
        this.handleAnswerSelected(isCorrect);
      };

      button.onclick = submitAnswer;
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          submitAnswer();
        }
      });

      inputSection.appendChild(input);
      inputSection.appendChild(button);
      this.choicesContainer.appendChild(inputSection);
      input.focus();
    } else if (inputCount === 2) {
      // Level 3: Title AND Year
      const row = document.createElement("div");
      row.className = "two-input-row";

      const titleGroup = document.createElement("div");
      titleGroup.className = "input-group";
      const titleLabel = document.createElement("label");
      titleLabel.className = "game-input-label";
      titleLabel.textContent = "Title";
      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.className = "game-text-input";
      titleInput.placeholder = "Film title";
      titleGroup.appendChild(titleLabel);
      titleGroup.appendChild(titleInput);

      const yearGroup = document.createElement("div");
      yearGroup.className = "input-group";
      const yearLabel = document.createElement("label");
      yearLabel.className = "game-input-label";
      yearLabel.textContent = "Year";
      const yearInput = document.createElement("input");
      yearInput.type = "text";
      yearInput.className = "game-text-input";
      yearInput.placeholder = "Release year";
      yearGroup.appendChild(yearLabel);
      yearGroup.appendChild(yearInput);

      const button = document.createElement("button");
      button.className = "game-submit-button";
      button.textContent = "Enter";
      const submitAnswer = () => {
        const titleMatch =
          titleInput.value.toLowerCase().trim() ===
          question.correctTitle.toLowerCase();
        const yearMatch =
          yearInput.value.trim() === question.correctYear.toString();
        const isCorrect = titleMatch && yearMatch;

        let feedbackMessage = null;
        if (!isCorrect) {
          if (!titleMatch && !yearMatch) {
            feedbackMessage = "Incorrect! Title and release year are wrong.";
          } else if (!titleMatch) {
            feedbackMessage = "Incorrect! Title is wrong.";
          } else {
            feedbackMessage = "Incorrect! Release year is wrong.";
          }
        }

        this.handleAnswerSelected(isCorrect, feedbackMessage);
      };

      button.onclick = submitAnswer;

      const handleEnterSubmit = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          submitAnswer();
        }
      };
      titleInput.addEventListener("keydown", handleEnterSubmit);
      yearInput.addEventListener("keydown", handleEnterSubmit);

      row.appendChild(titleGroup);
      row.appendChild(yearGroup);
      row.appendChild(button);
      this.choicesContainer.appendChild(row);
      titleInput.focus();
    }
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      this.updateTimerDisplay();

      if (this.timeRemaining <= 0) {
        this.timeExpired();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    this.timerDisplay.textContent = this.timeRemaining;

    if (this.timeRemaining <= 10) {
      this.timerDisplay.parentElement.classList.add("warning");
    }
    if (this.timeRemaining <= 5) {
      this.timerDisplay.parentElement.classList.add("critical");
    }
  }

  timeExpired() {
    if (!this.isAnswered) {
      this.showResult(false);
      this.nextQuestion();
    }
  }

  showResult(isCorrect, feedbackMessage = null) {
    if (isCorrect) {
      this.score++;
      this.resultText.textContent = "Correct!";
      this.resultText.classList.remove("incorrect");
      this.resultText.classList.add("correct");
    } else {
      this.resultText.textContent = feedbackMessage || "Incorrect!";
      this.resultText.classList.remove("correct");
      this.resultText.classList.add("incorrect");
    }

    this.updateScoreDisplay();
    this.resultAnimation.classList.add("show");

    setTimeout(() => {
      this.resultAnimation.classList.remove("show");
    }, 2400);
  }

  updateScoreDisplay() {
    this.currentScoreDisplay.textContent = this.score;
    this.resultScore.textContent = this.score;
  }

  nextQuestion() {
    this.currentQuestion++;
    setTimeout(() => {
      this.startQuestion();
    }, 2400);
  }

  endGame() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    const params = new URLSearchParams({
      score: String(this.score),
      total: String(this.totalQuestions),
      level: String(this.levelNum),
    });
    window.location.href = `/result?${params.toString()}`;
  }

  handleAnswerSelected(isCorrect, feedbackMessage = null) {
    if (this.isAnswered) return;

    this.isAnswered = true;
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.showResult(isCorrect, feedbackMessage);
    this.nextQuestion();
  }
}

// Initialize game when page loads
document.addEventListener("DOMContentLoaded", () => {
  const game = new GhibliGame(gameConfig);
  window.game = game;
});
