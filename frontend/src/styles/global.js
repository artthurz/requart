import { createGlobalStyle } from "styled-components";
// import 'react-perfect-scrollbar/dist/css/styles.css';
import "react-toastify/dist/ReactToastify.css";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  :root {
    --background: #f0f2f5;
    --red: #e52e4d;
    --green: #33cc95;
    --blue: #5429cc;
    --blue-light: #6933ff;
    --orange: #ff512f;
    --orange-light: #f09819;
    --gray-dark: #121214;
    --gray-light: #202024;
    --text-title: #363f5f;
    --text-body: #969cb3;
    --shape: #ffffff;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus{
    outline: 0;
  }

  html, body, #root {
    height: 100%;
    font-size: 1rem
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 0.9rem 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }
  button{
    cursor: pointer;
  }

  .react-modal-overlay {
    background-color: rgba(0,0,0,0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 2;
  }

  .react-modal-content {
    width: 100%;
    max-width: 576px;
    background: #F7F8FA;
    padding: 3rem;
    position: relative;
    border-radius: 0.25rem;
    opacity: 1;
  }
  
  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    color: rgb(133, 133, 133);
    background: transparent;
    transition: filter 0.2s;
    font-size: 20px;

    &:hover {
      filter: brightness(0.6);
    }
  }

`;
