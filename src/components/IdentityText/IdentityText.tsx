import "./identityText.css";

type Props = {
  identity: string;
  color: string;
  rolling: boolean;
  onRoll: () => void;
};

export default function IdentityText({
  identity,
  color,
  rolling,
}: Props) {
  return (
    <h1 className="identity-title">
      <span className="identity-static">You are a</span>

      <span
        className={`identity-word ${rolling ? "rolling" : ""}`}
        style={{ color }}
      >
        {identity}
        <span className="underline" />
      </span>
    </h1>
  );
}

