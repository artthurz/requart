import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.TouchableOpacity`
  width: 90%;
  height: 80%;
`;

export const CardBackground = styled(LinearGradient)`
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border-radius: 20px;
`;

export const CardTitle = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #fe5200;
  margin-bottom: 40px;
`;

export const CardName = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  margin-top: 40px;
`;

export const CardEmail = styled.Text`
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
