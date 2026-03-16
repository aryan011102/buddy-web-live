type ElasticInfoCardProps = {
  label: string;
  value: string;
  onClick?: () => void;
};

export default function ElasticInfoCard({ label, value, onClick }: ElasticInfoCardProps) {
  if (onClick) {
    return (
      <article
        className="team-elastic-card team-elastic-card-button"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={event => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick();
          }
        }}
      >
        <div className="team-elastic-card-label">{label}</div>
        <p className="team-elastic-card-value">{value}</p>
      </article>
    );
  }

  return (
    <article className="team-elastic-card">
      <div className="team-elastic-card-label">{label}</div>
      <p className="team-elastic-card-value">{value}</p>
    </article>
  );
}
