  
import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 10px 0 10px 0;
`;

export const DateButton = styled.TouchableOpacity`
  height: 46px;
  width: 200px;
  background: transparent;
  border-color: rgba(209, 209, 214, 1);
  border-width: 1px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: black;
  margin-left: 15px;
`;

export const Picker = styled.View`
  background: black;
  padding: 15px 30px;
  margin-top: 30px;
  margin-left: 15px;
`;