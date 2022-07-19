import { useState } from 'react';

import { useStore, actions } from '~/store';

import MyNavbar from '~/components/MyNavbar';
import MySidebar from '~/components/MySidebar';

function Mistake() {
  console.log('Page: Mistake');

  const [state, dispatch] = useStore();

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', userSelect: 'none'}}>
        <div>
          <svg style={{ width: '24px', height: '24px', margin: '0px 16px', cursor: 'pointer' }} onClick={() => dispatch(actions.setIsOpenSidebar(!state.isOpenSidebar))} viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 20H0V16.6667H30V20ZM30 11.6667H0V8.33333H30V11.6667ZM30 3.33333H0V0H30V3.33333Z" fill="#06245E"/>
          </svg>  
        </div>
        <div style={{ width: '100%' }}>
          <MyNavbar isSite={false}></MyNavbar>
        </div>
      </div>
    
      <div style={{ display: 'flex', flexDirection: 'row' }} >
        <MySidebar isOpen={state.isOpenSidebar}></MySidebar>

        <div
          style={{
            width: '100%'
          }}
        >
          
        </div>
      </div>
    </>
  );
}

export default Mistake;