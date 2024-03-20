import e from"@emotion/styled";export{ThemeContext,css,keyframes}from"@emotion/react";export{default as StyledEngineProvider}from"#StyledEngineProvider";export{default as GlobalStyles}from"#GlobalStyles";
/**
 * @mui/styled-engine v5.15.14
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */"use client";function styled(t,o){const s=e(t,o);return process.env.NODE_ENV!=="production"?(...e)=>{const o=typeof t==="string"?`"${t}"`:"component";e.length===0?console.error([`MUI: Seems like you called \`styled(${o})()\` without a \`style\` argument.`,'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join("\n")):e.some((e=>e===void 0))&&console.error(`MUI: the styled(${o})(...args) API requires all its args to be defined.`);return s(...e)}:s}const internal_processStyles=(e,t)=>{Array.isArray(e.__emotion_styles)&&(e.__emotion_styles=t(e.__emotion_styles))};export{styled as default,internal_processStyles};

