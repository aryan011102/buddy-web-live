import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import TeamProfileCard from "../components/TeamProfileCard";
import type { TeamMember } from "./knowTeam.types";
import "./knowTeam.css";

const TEAM_DATA_PATH = "/data/team-members.json";
const CLONE_SETS = 3;
const MIDDLE_SET_INDEX = 1;
const INITIAL_MEMBER_INDEX = 5;

type Direction = 1 | -1;

export default function KnowTeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [activeVirtualIndex, setActiveVirtualIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationLockRef = useRef(false);
  const activeVirtualIndexRef = useRef(0);
  const isInitializedRef = useRef(false);
  const scrollEndTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(TEAM_DATA_PATH);
        if (!res.ok) {
          throw new Error(`Failed to load ${TEAM_DATA_PATH}`);
        }

        const payload = (await res.json()) as TeamMember[];
        if (!cancelled) {
          setMembers(payload);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to load team data");
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const cardCount = members.length;
  const virtualMembers = useMemo(() => {
    if (cardCount === 0) return [] as TeamMember[];
    return Array.from({ length: CLONE_SETS }, () => members).flat();
  }, [members, cardCount]);

  const canScroll = cardCount > 1;

  const activeRealIndex = useMemo(() => {
    if (!cardCount) return 0;
    const mod = activeVirtualIndex % cardCount;
    return mod < 0 ? mod + cardCount : mod;
  }, [activeVirtualIndex, cardCount]);

  const title = useMemo(() => {
    if (error) return "The OG Buddies";
    if (members.length === 0) return "Loading team...";
    return "The OG Buddies";
  }, [members.length, error]);

  useEffect(() => {
    activeVirtualIndexRef.current = activeVirtualIndex;
  }, [activeVirtualIndex]);

  function waitForScrollSettled(container: HTMLDivElement, timeoutMs = 900) {
    return new Promise<void>(resolve => {
      const start = performance.now();
      let last = container.scrollLeft;
      let stableFrames = 0;
      let rafId = 0;

      const done = () => {
        window.cancelAnimationFrame(rafId);
        resolve();
      };

      const tick = () => {
        const now = performance.now();
        const current = container.scrollLeft;

        if (Math.abs(current - last) < 0.5) {
          stableFrames += 1;
        } else {
          stableFrames = 0;
        }

        last = current;

        if (stableFrames >= 4 || now - start >= timeoutMs) {
          done();
          return;
        }

        rafId = window.requestAnimationFrame(tick);
      };

      rafId = window.requestAnimationFrame(tick);
    });
  }

  function getCardElements(container: HTMLDivElement) {
    return Array.from(container.querySelectorAll<HTMLElement>(".team-carousel-item"));
  }

  function scrollToVirtualIndex(index: number, behavior: ScrollBehavior = "smooth") {
    const container = trackRef.current;
    if (!container) return;

    const cards = getCardElements(container);
    const target = cards[index];
    if (!target) return;

    target.scrollIntoView({ behavior, inline: "center", block: "nearest" });
    activeVirtualIndexRef.current = index;
    setActiveVirtualIndex(index);
  }

  function hardCenterVirtualIndex(index: number) {
    const container = trackRef.current;
    if (!container) return false;

    const cards = getCardElements(container);
    const target = cards[index];
    if (!target) return false;

    const targetLeft = target.offsetLeft - (container.clientWidth - target.clientWidth) / 2;
    container.scrollLeft = Math.max(0, targetLeft);
    activeVirtualIndexRef.current = index;
    setActiveVirtualIndex(index);
    return true;
  }

  function recenterIfNeeded(index: number) {
    if (!cardCount) return;

    const leftEdge = cardCount * 0.5;
    const rightEdge = cardCount * 2.5;

    if (index > leftEdge && index < rightEdge) return;

    const normalized = ((index % cardCount) + cardCount) % cardCount;
    const centered = cardCount * MIDDLE_SET_INDEX + normalized;
    scrollToVirtualIndex(centered, "auto");
  }

  async function stepBy(direction: Direction) {
    if (!cardCount) return;
    const container = trackRef.current;
    if (!container) return;
    const next = activeVirtualIndexRef.current + direction;
    scrollToVirtualIndex(next, "smooth");
    await waitForScrollSettled(container);
    recenterIfNeeded(next);
  }

  async function traverseToRealIndex(targetRealIndex: number) {
    if (!cardCount || targetRealIndex < 0 || targetRealIndex >= cardCount) return;
    if (animationLockRef.current) return;

    const current = activeRealIndex;
    if (current === targetRealIndex) return;

    animationLockRef.current = true;

    const forwardSteps = (targetRealIndex - current + cardCount) % cardCount;
    const backwardSteps = (current - targetRealIndex + cardCount) % cardCount;

    const direction: Direction = forwardSteps <= backwardSteps ? 1 : -1;
    const steps = Math.min(forwardSteps, backwardSteps);

    for (let i = 0; i < steps; i += 1) {
      await stepBy(direction);
    }

    animationLockRef.current = false;
  }

  async function handleFavBuddyClick(buddyName: string) {
    if (!cardCount) return;
    const candidates = buddyName
      .split(/,|&| and /i)
      .map(part => part.trim().toLowerCase())
      .filter(Boolean);

    let targetRealIndex = -1;

    for (const normalizedBuddy of candidates) {
      targetRealIndex = members.findIndex(
        member => member.name.trim().toLowerCase() === normalizedBuddy
      );

      if (targetRealIndex === -1) {
        targetRealIndex = members.findIndex(member =>
          member.name.trim().toLowerCase().startsWith(`${normalizedBuddy} `)
        );
      }

      if (targetRealIndex === -1) {
        targetRealIndex = members.findIndex(member => {
          const name = member.name.trim().toLowerCase();
          return normalizedBuddy.startsWith(name) || name.includes(normalizedBuddy);
        });
      }

      if (targetRealIndex !== -1) break;
    }

    if (targetRealIndex === -1) return;

    await traverseToRealIndex(targetRealIndex);
  }

  async function goPrev() {
    if (!canScroll || animationLockRef.current) return;
    animationLockRef.current = true;
    await stepBy(-1);
    animationLockRef.current = false;
  }

  async function goNext() {
    if (!canScroll || animationLockRef.current) return;
    animationLockRef.current = true;
    await stepBy(1);
    animationLockRef.current = false;
  }

  useLayoutEffect(() => {
    if (!cardCount) return;
    isInitializedRef.current = false;
    const normalizedInitialIndex = ((INITIAL_MEMBER_INDEX % cardCount) + cardCount) % cardCount;
    const start = cardCount * MIDDLE_SET_INDEX + normalizedInitialIndex;
    activeVirtualIndexRef.current = start;
    setActiveVirtualIndex(start);
    const centerOnFirst = () => {
      hardCenterVirtualIndex(start);
    };

    const rafId = window.requestAnimationFrame(centerOnFirst);
    const t1 = window.setTimeout(centerOnFirst, 80);
    const t2 = window.setTimeout(centerOnFirst, 220);
    const t3 = window.setTimeout(centerOnFirst, 420);
    const t4 = window.setTimeout(() => {
      centerOnFirst();
      isInitializedRef.current = true;
    }, 720);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardCount]);

  useEffect(() => {
    const container = trackRef.current;
    if (!container || virtualMembers.length === 0) return;
    const scrollContainer = container;
    let timeoutId: number | null = null;

    function onScroll() {
      if (!isInitializedRef.current) return;
      const cards = getCardElements(scrollContainer);
      if (cards.length === 0) return;

      const viewportCenter = scrollContainer.scrollLeft + scrollContainer.clientWidth / 2;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveVirtualIndex(nearestIndex);
      activeVirtualIndexRef.current = nearestIndex;

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(() => {
        recenterIfNeeded(activeVirtualIndexRef.current);
      }, 120);
      scrollEndTimeoutRef.current = timeoutId;
    }

    scrollContainer.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      scrollContainer.removeEventListener("scroll", onScroll);
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      if (scrollEndTimeoutRef.current !== null) {
        window.clearTimeout(scrollEndTimeoutRef.current);
        scrollEndTimeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [virtualMembers.length, cardCount]);

  return (
    <section className="know-team-section" aria-label="Know the team">
      <h2>{title}</h2>

      {error && <p className="know-team-error">{error}</p>}

      {!error && (
        <>
          <div className="team-carousel-shell">
            <button
              type="button"
              className="team-carousel-nav"
              aria-label="Show previous team member"
              onClick={() => void goPrev()}
              disabled={!canScroll}
            >
              &#8249;
            </button>

            <div className="team-carousel-track" ref={trackRef}>
              {virtualMembers.map((member, index) => {
                const isActive = index === activeVirtualIndex;
                return (
                  <div className={`team-carousel-item ${isActive ? "is-active" : ""}`} key={`${member.id}-${index}`}>
                    <TeamProfileCard
                      member={member}
                      isActive={isActive}
                      onFavBuddyClick={handleFavBuddyClick}
                    />
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="team-carousel-nav"
              aria-label="Show next team member"
              onClick={() => void goNext()}
              disabled={!canScroll}
            >
              &#8250;
            </button>
          </div>

          <p className="team-carousel-swipe-hint">Swipe to get to know them all</p>
        </>
      )}
    </section>
  );
}
