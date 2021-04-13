import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

export const Card = styled.TouchableOpacity`
  width: 100%;
  height: 100%;

  color: #fff;
`;

export const CardBackground = styled(LinearGradient)`
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 35px 20px;
`;
