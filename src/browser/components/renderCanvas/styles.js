import { css } from 'react-emotion';

const whiteboard = css`
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;

const colors = css`
  position: fixed;
`;

const colorBox = css`
  display: inline-block;
  height: 48px;
  width: 48px;
`;

const black = css`
  background-color:  black;
`;
const red = css`
  background-color: red;
`;
const green = css`
  background-color: green;
`;
const blue = css`
  background-color: blue;
`;
const yellow = css`
  background-color: yellow;
`;


export {
  whiteboard,
  colors,
  colorBox,
  black,
  red,
  green,
  blue,
  yellow,
};
