import React from "react";
import Die from "./components/Die";
import { nanoid } from "./components/nanoid";
import Time from "./components/Time";

export default function App() {
  const [dice, setDice] = React.useState(getTenDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState(1);
  const [bestTime, setBestTime] = React.useState();

  function getRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    return randomNumber;
  }

  function getTenDice() {
    const tenDice = Array(10)
      .fill()
      .map(() => ({ id: nanoid(), value: getRandomNumber(), isHeld: false }));
    return tenDice;
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function rollDice() {
    if (tenzies) {
      setDice(getTenDice());
      setTenzies(false);
      setRolls(1);
    } else {
      setRolls((oldRolls) => oldRolls + 1);
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: getRandomNumber() }
        )
      );
    }
  }

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true);
    const allEqual = dice.every((die) => die.value === dice[0].value);

    if (allHeld && allEqual) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  function formatTime(ms) {
    const minutes = Math.round(ms / 60000);
    const seconds = Math.round((ms % 60000) / 1000);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  function updateBestTime(records) {
    if (records > 0) {
      setBestTime(formatTime(records));
    }
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same.<br/>Click each die to freeze it<br/>at its
        current value between rolls.
      </p>
      <div className="stats-container">
        <button className="rolls-count">{rolls}</button>
        <button className="best-time">Best time: {bestTime || "N/A"}</button>
        <button className="time">
          <Time
            on={!tenzies}
            renderGameTime={formatTime}
            updateBestTime={updateBestTime}
          />
        </button>
      </div>
      <div className="die-container">
        {dice.map((die) => (
          <Die
            value={die.value}
            holdDice={() => holdDice(die.id)}
            color={die.isHeld}
            key={die.id}
          />
        ))}
      </div>
      <button className="roll-button" onClick={rollDice}>
        {tenzies ? "New Game!" : "Roll"}
      </button>
    </main>
  );
}
