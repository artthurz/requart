import styled from 'styled-components';

export const Body = styled.div`
  height: calc(100% - 80px);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DetailsTitle = styled.h1`
  margin-top: 20px;
  color: var(--text-title);
`;
export const DetailsCards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  padding: 20px;
  background-color: rgba(81,150,255, 1);
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  width: 280px;
`;
export const CardTitle = styled.h1`
  color: #fff;
  font-size: 22px;
`;
export const CardDescription = styled.span`
  color: #fff;
  margin-top: 5px;
`;
export const Sparetor = styled.hr`
  border-top: 1px solid var(--gray);
  width: 98%;
`;
export const DetailsSubTitle = styled.h1`
  color: var(--text-title);
  font-size: 24px;
  margin: 40px 0;
`;
export const DetailsDescription = styled.span`
  width: 80%;
  height: 300px;
  margin-bottom: 40px;
  color: var(--gray-light);
`;
