import "./diceButton.css";
import dice from "../../assets/svg/dice.svg";

type Props = {
  onClick: () => void;
  rolling?: boolean;
};

export default function DiceButton({ onClick, rolling }: Props) {
  return (
    <button
      className={`dice-btn ${rolling ? "rolling" : ""}`}
      onClick={onClick}
      aria-label="Roll Dice"
    >
      <img src={dice} alt="Roll dice" />
    </button>
  );
}
