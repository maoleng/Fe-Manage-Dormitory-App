import React from 'react';

import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";

function Introduction() {
  console.log("Page: Introduction");

  return (
    <>
      <MyNavbar isSite={true}></MyNavbar>

      <div>
        <h1>Nội dung blabla</h1>
        <h1>Nội dung blabla</h1>
        <h1>Nội dung blabla</h1>
        <h1>Nội dung blabla</h1>
        <h1>Nội dung blabla</h1>
      </div>

      <MyFooter></MyFooter>
    </>
  );
}

export default Introduction;