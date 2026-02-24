export type BgVariant = {
  pageBg: string;
  titleColor: string;
};

// Randomize once per page load
export const IS_DARK = Math.random() < 0.5;

export function makeBgVariant(params: {
  lightBg: string;
  darkBg: string;
  lightTitle: string;
  darkTitle: string;
}): BgVariant {
  return {
    pageBg: IS_DARK ? params.darkBg : params.lightBg,
    titleColor: IS_DARK ? params.darkTitle : params.lightTitle,
  };
}
