import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Body = styled.div`
  height: 40rem;
  width: 1200px;
  background-color: #fff;

  .project-dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 20px;
    }
  }
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

export const useAddIconButtonStyle = makeStyles(() => ({
  root: {
    position: 'absolute',
    right: '-30px',
    top: '10px',
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
    right: '-30px',
    top: '10px',
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

