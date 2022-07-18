import { useState } from 'react';

function MyInput({ style, type, name, placeholder, spl, initValue, disabled }) {
  console.log('Component: MyInput');

  const [value, setValue] = useState(initValue || ''); 
  const [focus, setFocus] = useState(false);

  return spl === 'login' ? (
    <input 
      style={{...style, borderColor: (focus ? '#84B4FC' : '#AFADAD')}}
      type={type}
      name={name}
      placeHolder={placeholder}
      onChange={e => setValue(e.target.value)}
      value={value}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  ) : (
    <input 
      style={style}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={e => setValue(e.target.value)}
      value={value}
      disabled={disabled}
    />
  );
}

export default MyInput;