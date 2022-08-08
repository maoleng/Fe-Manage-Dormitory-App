import { useState } from 'react';

function MyInput({ style, type, name, placeholder, spl, initValue, disabled, hidden }) {
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
      hidden={hidden}
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
      hidden={hidden}
    />
  );
}

export default MyInput;