import React from 'react';

import MyNavbar from '~/components/MyNavbar';
import MyFooter from '~/components/MyFooter';

function Guide() {
  return (
    <>
      <MyNavbar isSite={true}></MyNavbar>

      Guide

      <MyFooter></MyFooter>
    </>
  );
}

export default Guide;