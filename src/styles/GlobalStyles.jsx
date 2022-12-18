import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        font-family: 'Lexend Deca', sans-serif;
        margin: 70px 0;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    * {
        box-sizing: border-box;
    }
`;

export const StyledButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: #ffffff;
  background-color: #52b6ff;
  border-radius: 5px;
  font-size: ${(props) => props.fontSize};
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: filter 0.2s;
  font-family: 'Lexend Deca', sans-serif;
  &:disabled{
    filter: opacity(0.7);
  }
`;

export const TextInput = styled.input`
  width: 303px;
  height: 45px;
  border-radius: 5px;
  border: 1px solid #d5d5d5;
  font-size: 20px;
  margin-bottom: 6px;
  padding: 10px;
  font-family: 'Lexend Deca', sans-serif;
  &::placeholder {
    font-size: 20px;
    color: #dbdbdb;
  }
  `;
