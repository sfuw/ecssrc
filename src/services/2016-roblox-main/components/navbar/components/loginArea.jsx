import React from "react";
import { createUseStyles } from "react-jss";
import LoginModalStore from "../../../stores/loginModal";
import LoginModal from "../../loginModal";
import getFlag from "../../../lib/getFlag";
import { useNavigate } from 'react-router-dom';

const useLoginAreaStyles = createUseStyles({
  text: {
    color: 'white',
    fontWeight: 400,
    fontSize: '16px',
    borderBottom: 0,
    marginTop: '2px',
    marginBottom: 0,
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '4px 8px',
    '&:hover': {
      color: 'white',
      background: 'rgba(25,25,25,0.1)',
      cursor: 'pointer',
      borderRadius: '4px',
    },
  },
});

const LoginArea = props => {
  const navigate = useNavigate();
  const s = useLoginAreaStyles();
  const loginModalStore = LoginModalStore.useContainer();

  return <div className='row'>
    <div className='col-6 offset-6'>
      <div className='row'>
        <div className='col-6'>
          <p className={s.text}>
            <a className={s.link}>
              Sign Up
            </a>
          </p>
        </div>
        <div className='col-6'>
          <p className={s.text}>
            <a className={s.link} onClick={(e) => {
              e.preventDefault();
              if (getFlag('requireLoginThroughCookie', true)) {
                navigate('/login');
                return;
              }
              loginModalStore.setOpen(!loginModalStore.open);
            }}>
              Login
            </a>
          </p>
          {loginModalStore.open && <LoginModal></LoginModal>}
        </div>
      </div>
    </div>
  </div>
}

export default LoginArea;