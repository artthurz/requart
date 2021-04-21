import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Body = styled.div`
  height: 78.5rem;
  width: 1200px;
  background-color: #fff;
  .project-dropdown {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 20px;
    }
  }
`;

export const Details = styled.section`
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
  background-color: rgba(81, 150, 255, 1);
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
  height: 220px;
  margin-bottom: 40px;
  color: var(--gray-light);
`;

export const Badge = styled.div`
  background-color: ${(props) => (props?.color ? props.color : '#c1c1c1')};
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  line-height: 30px;

  span {
    color: #fff;
    text-transform: uppercase;
  }
`;

export const RequirementsHeader = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: flex-start;

  h1 {
    margin-left: 40px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

export const useAddIconButtonStyle = makeStyles(() => ({
  root: {
    position: 'absolute',
    left: '-30px',
    top: '13px',
    fontSize: '25px',
    color: '#fff !important',
    backgroundColor: 'rgba(41,204,151, 1) !important',
    transition: 'transform 250ms linear, filter 250ms linear',
    '&:hover': {
      backgroundColor: 'rgba(41,204,151, 0.9) !important',
    },
  },
}));

export const useRotatedAddIconButtonStyle = makeStyles(() => ({
  root: {
    position: 'absolute',
    left: '-30px',
    top: '13px',
    fontSize: '25px',
    color: '#fff !important',
    backgroundColor: 'rgba(41,204,151, 1) !important',
    transform: 'rotate(45deg)',
    transition: 'transform 250ms linear, filter 250ms linear',
    '&:hover': {
      backgroundColor: 'rgba(41,204,151, 0.9) !important',
    },
  },
}));

export const useBackIconButtonStyle = makeStyles(() => ({
  root: {
    position: 'absolute',
    left: '-30px',
    top: '10px',
    fontSize: '25px',
    color: '#fff !important',
    backgroundColor: 'rgba(81,150,255, 1) !important',
    transition: 'transform 250ms linear, filter 250ms linear',
    '&:hover': {
      backgroundColor: 'rgba(81,150,255, 0.9) !important',
    },
  },
}));
