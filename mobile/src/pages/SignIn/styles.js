import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
`;

export const Content = styled.View`
  flex-direction: column-reverse;
  height: 100%;
  width: 100%;
`;

export const Wrapper = styled.View`
  align-items: center;
  background-color: rgba(32, 32, 32, 0.9);
  bottom: 0;
  width: 100%;
  height: auto;
  padding: 60px 0px 0px 0px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  z-index: 800;
`;
