import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.View`
    align-items: center;
    justify-content: center;
    background-color: #0a0742;
    width: 90%;
    height: 80%;
    border-radius: 20px;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #FE5200;
  margin-bottom: 40px;
`;


export const Text = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  margin-top: 40px;
`;

export const SmallText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #fefefe;
  margin-top: 5px;
`;

export const Avatar = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 100;
`;
