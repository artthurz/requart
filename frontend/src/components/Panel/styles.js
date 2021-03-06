import styled from 'styled-components';

export const MainPanel = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: ${(props) => (props.styles?.margin ? props.styles.margin : '2rem')};
  height: ${(props) => (props.styles?.height ? props.styles.height : 'auto')};
  min-height: 650px;
  box-shadow: inset 0 0 0 0 #b5b5b5, 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  background-color: ${(props) => (props.styles?.backgroundColor ? props.styles?.backgroundColor : '#F7F8FA')};
`;

export const SubPanel = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  position: relative;
  min-height: 52px;
  padding: 12px 20px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: bold;
  color: ${(props) =>
    props.styles?.color ? props.styles.color : 'rgba(0, 0, 0, 0.65)'};
  line-height: 28px;
  background-color: ${(props) =>
    props.styles?.backgroundColor ? props.styles.backgroundColor : '#fff'};

  h1 {
    margin-left: 20px;
    font-size: 24px;
    font-weight: bold;
  }

  border-radius: ${(props) => props.header && '4px 4px 0 0'};
  text-align: ${(props) => props.header && 'left'};
  box-shadow: ${(props) =>
    props.header &&
    `inset 0 -1px 0 0 ${
      props.styles?.boxShadowColor ? props.styles?.boxShadowColor : '#E7E8EB'
    }`};
  box-shadow: ${(props) =>
    props.footer &&
    `inset 0 1px 0 0 ${
      props.styles?.boxShadowColor ? props.styles?.boxShadowColor : '#E7E8EB'
    }`};
`;
