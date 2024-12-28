import React from 'react';
import ButtonWrapper from '../components/common/ButtonWrapper';
import { useNavigate } from 'react-router-dom';

export default function NotInDiscord() {
  const navigator = useNavigate();
  const handleRedirectToInvadersDiscord = () => {
    window.open(import.meta.env.REACT_APP_INVADERS_INVITE_LINK, '_blank')?.focus();
    navigator('/');
  };

  return (
    <div>
      <h3>You are not in Invaders Discord</h3>
      <ButtonWrapper onClick={handleRedirectToInvadersDiscord}>Join now</ButtonWrapper>
    </div>
  );
}
