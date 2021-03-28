import styled from "styled-components";
import { darken } from "polished";

export const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(-90deg, #4169e1, #41b9e1);
  /* background: linear-gradient(-90deg, #4169e1, #7159c1); */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: center;
  background-color: rgba(32, 32, 32, 0.8);
  border-radius: 10px;
  padding-top: 60px;
  padding-bottom: 60px;
  padding-right: 60px;
  padding-left: 60px;

  form {

    button {
      margin: 20px 0 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, "#3b9eff")};
      }
    }

    /* a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    } */
  }
`;

export const Image = styled.img`
  height: 40px;
  position: absolute;
  top: 17.5px;
  left: 30px;
`;

export const Footer = styled.div`
  position: absolute;
  left: 30px;
  bottom: 30px;
  width: 100%;
  color: #fff;
  max-width: 200px;
  text-align: center;
  background-color: rgba(32, 32, 32, 0.8);
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 10px;
`;
