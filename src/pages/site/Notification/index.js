import React from 'react';

import MyNavbar from '~/components/MyNavbar';
import MyFooter from '~/components/MyFooter';

function Notification() {
  return (
    <>
      <MyNavbar isSite={true}></MyNavbar>

      Notification

      <MyFooter></MyFooter>
    </>
  );
}

export default Notification;