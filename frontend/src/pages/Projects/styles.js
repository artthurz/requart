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

export const useEnterIconButtonStyle = makeStyles(() => ({
  root: {
    height: '10px',
    fontSize: '25px',
    color: '#fff !important',
    backgroundColor: 'rgba(81,150,255, 1) !important',
    transition: 'transform 250ms linear, filter 250ms linear',
    '&:hover': {
      backgroundColor: 'rgba(81,150,255, 0.9) !important',
    },
  },
}));

