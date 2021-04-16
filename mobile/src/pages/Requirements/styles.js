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
  height: 500px;
`;

export const Tag = styled.View`
  align-items: center;
  max-width: 90%;
`;

export const TagName = styled.Text`
    font-size: 16;
    font-weight: bold;
    color: #fff;
    margin-bottom: 5px;
`;
