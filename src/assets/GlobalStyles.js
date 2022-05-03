import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    transition: 300ms;
    --font-raleway: 'Raleway', sans-serif;
    --font-saira: 'Saira Stencil One', cursive;
    --color-body: #8C11BE;
    --color-buttons: #A328D6;
    --color-white: #FFFFFF;
    --color-black: #000000;
    --color-placeholder: #868686;
    --color-red: #C70000;
    --color-green: #03AC00;
    --opacity-button-disabled: 0.7;
}
body {
    background-color: var(--color-body);
    width: 100vw;
    max-width: 600px;
}
`;

export default GlobalStyle;