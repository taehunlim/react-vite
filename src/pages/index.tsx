import React from 'react';
import styled from '@emotion/styled';

function Index() {
   return (
      <div>
         <Span>react</Span>
      </div>
   );
}

const Span = styled.span`
   color: ${({ theme }) => theme.danger};
   font-size: ${({ theme }) => theme.font.size.m};
   font-weight: ${({ theme }) => theme.font.weight.normal};
`;

export default Index;
