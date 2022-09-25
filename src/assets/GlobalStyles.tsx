import React from 'react';
import { Global, css } from '@emotion/react';
import theme from './theme';

const styles = css`
   *,
   *::after,
   *::before {
      box-sizing: border-box;
      font-family: 'Noto Sans KR', sans-serif;
   }

   html,
   body {
      overflow: hidden;
      height: 100%;

      @supports (-webkit-touch-callout: none) {
         height: -webkit-fill-available;
      }

      *::-webkit-scrollbar {
         display: none;
      }
   }

   /* font-family: "Noto Sans KR", sans-serif; */
   /* font-family: 'Roboto', sans-serif; */

   body {
      color: ${theme.fg.black};
      font-family: 'Noto Sans KR', sans-serif;
      margin: 0;
      position: relative;
      transition: background-color 0.3s ease;

      a {
         text-decoration: none;
      }
   }

   p,
   h1 {
      font-size: 1rem;
      line-height: 1.3;
      padding: 0;
      margin: 0;
   }

   a,
   button {
      display: inline-block;
      cursor: pointer;
      background: none;
      border: 0;
   }

   *:focus {
      outline: none;
   }

   a:focus {
      outline: none;
   }

   input:focus::-webkit-input-placeholder,
   textarea:focus::-webkit-input-placeholder {
      color: transparent !important;
   }

   input:focus:-moz-placeholder,
   textarea:focus:-moz-placeholder {
      color: transparent !important;
   }

   /* FF 4-18 */

   input:focus::-moz-placeholder,
   textarea:focus::-moz-placeholder {
      color: transparent !important;
   }

   /* FF 19+ */

   input:focus:-ms-input-placeholder,
   textarea:focus:-ms-input-placeholder {
      color: transparent !important;
   }

   /* IE 10+ */
`;

function GlobalStyles() {
   return <Global styles={styles} />;
}

export default GlobalStyles;
