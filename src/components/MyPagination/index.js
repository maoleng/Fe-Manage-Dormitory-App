import React from 'react';

import { Pagination } from "react-bootstrap";

function MyPagination({ page, setPage, pages }) {
  // console.log('Component: MyPagination');

  let pagesWrap = (!page) ? [0] : (page > 1 ? [page - 2, page - 1, page] : [page - 1, page]);
  if (pagesWrap[pagesWrap.length - 1] + 2 <= pages.length) {
    pagesWrap.push(pagesWrap[pagesWrap.length - 1] + 1);
  }
  if (pagesWrap[pagesWrap.length - 1] + 2 <= pages.length) {
    pagesWrap.push(pagesWrap[pagesWrap.length - 1] + 1);
  }
  if (pagesWrap[0] !== 0){
    if (pagesWrap[0] > 1) {
      pagesWrap.unshift('...');
    }
    pagesWrap.unshift(0);
  }
  if (pagesWrap[pagesWrap.length - 1] < pages.length - 1) {
    if (pagesWrap[pagesWrap.length - 1] < pages.length - 2) {
      pagesWrap.push('...');
    }
    pagesWrap.push(pages.length - 1);
  }

  return (
    <Pagination>
      <li
        style={{...(page > 0 ? {
            cursor: 'pointer'
          } : {
            cursor: 'context-menu',
            backgroundColor: '#FFFFFF',
            color: '#D9D9D9'
          }),
          ...{
            border: 'none',
            fontWeight: 'bold',
          }
        }}
        className={'page-item page-link'}
        onClick={() => setPage((page > 0) ? (page - 1) : page)}
      >‹</li>

      {pagesWrap.map((elem, index) => 
        (elem === '...') ? (
          <li
            style={{
              border: 'none',
              backgroundColor: '#FFFFFFFF'
            }}
            className={'page-item page-link'}
            key={index}
          >{elem}</li>
        ) : (
          <li
            style={{
              border: 'none',
              cursor: 'pointer',
              borderRadius: '100%',
              color: (elem === page ? '#FFFFFF' : '#0D6EFD'),
              backgroundColor: (elem === page ? '#0B42AB' : '#FFFFFF')
            }}
            className={'page-item page-link'}
            onClick={() => {
              setPage(elem);
            }}
            key={index}
          >{elem + 1}</li>
        )
      )}
      
      <li
        style={{...((page < pages.length - 1) ? {
            cursor: 'pointer'
          } : {
            cursor: 'context-menu',
            backgroundColor: '#FFFFFF',
            color: '#D9D9D9'
          }),
          ...{
            border: 'none',
            fontWeight: 'bold',
          }
        }}
        className={'page-item page-link'}
        onClick={() => setPage((page < pages.length - 1) ? (page + 1) : page)}
      >›</li>
    </Pagination>
  );
}

export default MyPagination;