import { forwardRef } from 'react';

import { ArrowDownSVG } from './svgs';

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <div
    style={{
      minWidth: '140px',
      padding: '8px',
      border: 'solid #D9D9D9 1px',
      fontWeight: 'bold',
      cursor: 'pointer',
      userSelect: 'none',
    }}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    ref={ref}
  >
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 13px' }}>
      <div>{children}</div>
      <div>
        <ArrowDownSVG style={{ width: '13px', height: '9px' }} />
      </div>
    </div>
  </div>
));

export default CustomToggle;