import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

export const Card = styled.TouchableOpacity`
  color: #fff;
  margin: 10px 0;
`;

export const CardBackground = styled(LinearGradient)`
  border-radius: 20px;
  padding: 35px 20px;
  width: 100%;
  height: 350px;
`;

export const LinkButton = styled.TouchableOpacity`
  border-radius: 25px;
  width: 100%;
  height: 45px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  margin-top: 20px;
`;

export const LinkDescription = styled.Text`
  font-size: 15px;
  color: #fff;
  font-weight: bold;
`;

