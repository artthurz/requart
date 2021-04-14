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
