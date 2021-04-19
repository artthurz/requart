import styled from 'styled-components';

export const Container = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .MuiInputBase-input:before {
    color: #fff;
  }
  .MuiInput-underline:before {
    border-bottom: 1px solid rgba(255, 255, 255, 0.42);
  }

  .MuiInputLabel-root {
    color: rgba(255, 255, 255, 0.42);
  }

  .MuiInputLabel-root.Mui-focused {
    color: #4a90e2;
  }

  .MuiInputBase-root.MuiInput-root {
    color: #fff;
  }

  .MuiInputBase-root.MuiInput-root:hover {
    color: #fff;
  }
`;

export const Span = styled.span`
  color: #939393;
  font-size: 10px;
  margin-top: 20px;
`;

export const Image = styled.img`
  margin-bottom: 15px;
  height: 40px;
  margin-left: -50px;
`;
