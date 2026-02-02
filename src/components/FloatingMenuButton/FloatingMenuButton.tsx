import "./FloatingMenuButton.css";
import menuIcon from "../../assets/svg/buddyIcon.svg";
type Props = {
  onClick: () => void;
};

export default function FloatingMenuButton({ onClick }: Props) {
  return (
    <button className="floating-menu-btn" onClick={onClick}>
      <img src={menuIcon} alt="Menu" />
    </button>
  );
}
