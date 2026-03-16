import ElasticInfoCard from "./ElasticInfoCard";
import InterestChip from "./InterestChip";
import TeamPicture from "./TeamPicture";

import { TEAM_INTERESTS } from "../Team/teamInterests.constants";
import type { TeamMember } from "../Team/knowTeam.types";
import { TEAM_AVATARS } from "../teamAvatars.constants";

type TeamProfileCardProps = {
  member: TeamMember;
  isActive: boolean;
  onFavBuddyClick?: (buddyName: string) => void;
};

const ROLE_COLOR_POOL = ["#8D8DFF", "#FFB9FF", "#64BDFF", "#98D81E"] as const;

function pickStableColor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return ROLE_COLOR_POOL[hash % ROLE_COLOR_POOL.length];
}

export default function TeamProfileCard({ member, isActive, onFavBuddyClick }: TeamProfileCardProps) {
  const ageText = `Age ${member.age}`;
  const resolvedAvatar = member.avatarKey ? TEAM_AVATARS[member.avatarKey] : member.avatarUrl;
  const usePaletteRoleColor = member.locationLabel === "CTO" || member.locationLabel === "Designer";
  const roleBg = member.roleColor
    ? member.roleColor
    : member.locationLabel === "CTO"
      ? "#64BDFF"
      : usePaletteRoleColor
        ? pickStableColor(member.id)
        : "#8D8DFF";

  return (
    <article className={`team-card ${isActive ? "is-active" : ""}`}>
      <header className="team-card-top">
        <div className="team-card-location" style={{ ["--role-bg" as string]: roleBg }}>
          {member.locationLabel}
        </div>
        <div className="team-card-main">
          <TeamPicture name={member.name} src={resolvedAvatar} />

          <div className="team-card-meta">
            <div className="team-card-title-row">
              <h3>{member.name}</h3>
              <span className="team-card-age">{ageText}</span>
            </div>

            <p>{member.shortBio}</p>

            <div className="team-card-interest-list">
              {member.interests.map(interestId => (
                <InterestChip key={`${member.id}-${interestId}`} category={TEAM_INTERESTS[interestId]} />
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="team-card-details">
        <ElasticInfoCard label="My Superpower" value={member.superpower} />
        <ElasticInfoCard label="What I'd use buddy for" value={member.buddyUse} />

        <div className="team-card-bottom-grid">
          <ElasticInfoCard label="Fav Feature" value={member.favoriteFeature} />
          <ElasticInfoCard
            label="Fav Buddy"
            value={member.favoriteBuddy}
            onClick={() => onFavBuddyClick?.(member.favoriteBuddy)}
          />
        </div>
      </div>
    </article>
  );
}
