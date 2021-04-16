import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

export const Card = styled.TouchableOpacity`
  color: #fff;
  margin: 2px 0;
`;

export const CardBackground = styled(LinearGradient)`
  border-radius: 20px;
  padding: 35px 20px;
  width: 100%;
  height: 150px;
  flex-direction: row;
`;

export const CardTitle = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #fe5200;
  margin-bottom: 40px;
`;

export const CardName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-left: 10px;
`;

export const CardEmail = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #fefefe;
  margin-left: 10px;
`;

export const CardRole = styled.View`
  margin-top: 10px;
  font-size: 12px;
  margin-left: 10px;
  background-color: #eee;
  width: auto;
  align-items: center;
  justify-content: center;
  border-radius: 50;
  width: 100px;
`;

export const CardRoleText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  line-height: 22px;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100;
`;

export const CardButtons = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 100;
  height: 100%;
`;
export const CardDetails = styled.View`
  flex: 1;
`;
