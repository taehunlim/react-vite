import React from "react";
import styled from "@emotion/styled";

function Home() {
  return (
    <div>
      <Span>react</Span>
    </div>
  );
}

const Span = styled.span`
  color: ${({ theme }) => theme.fg.danger};
`;

export default Home;
