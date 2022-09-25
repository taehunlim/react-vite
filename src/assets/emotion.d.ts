import "@emotion/react";

interface DeviceSizeProps {
  desktop: string;
  laptop: string;
  tablet: string;
  mobile: string;
}

interface DeviceProps {
  desktop: string;
  laptop: string;
  tablet: string;
  mobile: string;
}

interface BootstrapColorProps {
  primary: string;
  danger: string;
  complete: string;
  onGoing: string;
  etc: string;
}

interface BootstrapColorProps {
  primary: string;
  danger: string;
  complete: string;
  onGoing: string;
  etc: string;
}

type FgProps = Fg & {
  [key in keyof Fg]: string;
};

interface Fg extends BootstrapColorProps {
  red: string;
  new: string;
  black: string;
  gray: string;
  translucent: string;
  active: string;
  white: string;
}

type BgProps = Bg & {
  [key in keyof Bg]: string;
};

interface Bg extends BootstrapColorProps {
  white: string;
}

declare module "@emotion/react" {
  export interface Theme {
    deviceSize: DeviceSizeProps;
    device: DeviceProps;
    fg: FgProps;
    bg: BgProps;
  }
}

// 함수로 스타일 지정을 위한 props
export interface ThemeProps {
  theme: {
    deviceSize: DeviceSizeProps;
    device: DeviceProps;
    fg: FgProps;
    bg: BgProps;
  };
}
