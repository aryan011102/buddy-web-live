type TeamPictureProps = {
  name: string;
  src?: string;
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function TeamPicture({ name, src }: TeamPictureProps) {
  const initials = getInitials(name);

  return (
    <div className="team-picture-shell" aria-label={`${name} picture`}>
      <div className="team-picture-circle">
        {src ? (
          <img className="team-picture-image" src={src} alt={name} loading="lazy" />
        ) : (
          <div className="team-picture-fallback" aria-hidden="true">
            {initials}
          </div>
        )}
      </div>
    </div>
  );
}
