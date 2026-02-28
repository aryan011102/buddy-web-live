import "./peopleVisitedSign.css";

type Props = {
  count: number;
};

export default function PeopleVisitedSign({ count }: Props) {
  if (count <= 0) return null;

  const formatted = new Intl.NumberFormat("en-US").format(count);

  return (
    <div className="people-visited-sign" aria-label={`People visited ${formatted}`}>
      <div className="people-visited-board">
        <div className="people-visited-title">people visited</div>
        <div className="people-visited-count">{formatted}</div>
      </div>
      <div className="people-visited-pole" aria-hidden="true" />
    </div>
  );
}

