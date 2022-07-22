import React from 'react';

import MyNavbar from '~/components/MyNavbar';
import MyFooter from '~/components/MyFooter';

function News() {
  return (
    <>
      <MyNavbar isSite={true}></MyNavbar>

      News

      <MyFooter></MyFooter>
    </>
  );
}

export default News;