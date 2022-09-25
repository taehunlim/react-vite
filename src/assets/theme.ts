const minWidth = (deviceSize: string) =>
  `${(Number(deviceSize.split("px")[0]) + 1).toString()}px`;

const deviceSize = {
  desktop: "1280px",
  laptop: "1024px",
  tablet: "768px",
  mobile: "480px",
};

const device = {
  desktop: `@media (min-width: ${minWidth(deviceSize.laptop)})`,
  laptop: `@media (min-width: ${minWidth(deviceSize.tablet)}) and (max-width: ${
    deviceSize.laptop
  })`,
  tablet: `@media (min-width: ${minWidth(deviceSize.mobile)}) and (max-width: ${
    deviceSize.tablet
  })`,
  mobile: `@media (max-width: ${deviceSize.mobile})`,
};

const fg = {
  primary: "#003580",
  danger: "#FF5555",
  red: "#DD3333",
  new: "#FF9900",
  complete: "#00BB88",
  onGoing: "#0086E6",
  etc: "#555555",
  black: "#222222",
  gray: "#888888",
  translucent: "#BBBBBB",
  active: "#0086E5",
  white: "#FFFFFF",
};

const bg = {
  primary: "rgba(0, 53, 128, 0.1)",
  danger: "rgba(255, 85, 85, 0.1)",
  complete: "rgba(0, 187, 136, 0.1)",
  onGoing: "rgba(0, 134, 229, 0.1)",
  etc: "rgba(85, 85, 85, 0.1)",
  white: "#FFFFFF",
};

const theme = {
  deviceSize,
  device,
  fg,
  bg,
};

export default theme;
