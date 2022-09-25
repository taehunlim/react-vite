import React, { ReactNode } from "react";
import { ThemeProvider } from "@emotion/react";

import GlobalStyles from "./GlobalStyles";
import theme from "./theme";

interface Props {
  children: ReactNode;
}

function EmotionProvider({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}

export default EmotionProvider;
