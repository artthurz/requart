import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
`;

export const Scroll = styled.ScrollView`
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #FE5200;
  margin-bottom: 30px;
`;

export const Card = styled.View`
  background-color: #fff;
  border-radius: 20px;
  margin: 20px;
  padding: 40px;
  width: 90%;
  height: auto;
  align-items: center;
  justify-content: center;
  elevation: 4;
`;

export const DropDown = styled.View`
  margin-top: 10px;
  width: 100%;
`;

export const ImgPreview = styled.Image`
  width: 80px;
  height: 80px;
  background-color: #333;
  border-radius: 20px;
  margin: 20px;
  justify-content: center;
`;

export const SelectImageCard = styled.View`
  width: 80px;
  height: 80px;
  background-color: #333;
  border-radius: 20px;
  margin: 20px;
  justify-content: center;
`;

export const Actions = styled.View`
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-radius: 20px;
  width: 125%;
  background-color: rgba(255, 255, 255, 0.85);
`;
