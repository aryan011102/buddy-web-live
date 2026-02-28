import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  pageBg: string;
  imageBg: string;
};

export default function ScrollStackItem({
  children,
  pageBg,
  imageBg
}: Props) {
  return (
    <div
      className="stack-card"
      data-page-bg={pageBg}
      data-image-bg={imageBg}
    >
      {children}
    </div>
  );
}

