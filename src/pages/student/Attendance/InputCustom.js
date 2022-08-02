import React, { useState } from 'react';

function InputCustom() {
  const [value, setValue] = useState('');

  return (
    <div 
      style={{ 
        width: '100%', 
        padding: '8px 16px', 
        display: 'flex', 
        gap: '16px', 
      }}
    >
      <div style={{ fontSize: '12px', }}>Lý do vắng:</div>
      <div style={{ flexGrow: '1', }}><input 
        style={{ 
          width: '100%', 
          height: '16px', 
          borderStyle: 'none none solid none', 
          borderColor: '#D9D9D9',
          outline: 'none', 
        }} 
        value={value}
        onChange={e => setValue(e.target.value)}
      /></div>
    </div>
  )
}

export default InputCustom;