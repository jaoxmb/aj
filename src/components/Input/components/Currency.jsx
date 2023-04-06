import { useState } from "react";

const Currency = ({
  value = 0,
  onChange,
  name,
  className,
  placeholder
}) => {

  const toMoney = ( value ) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const mask = ( value ) => toMoney(Number(value.replace(/\D/g, "")) / 100);
  const unmask = ( value ) => Number(value.replace(/[^0-9,]*/g, '').replace(',', '.'));

  const [ money, setMoney ] = useState(toMoney(value));

  return (
    <>
      <input 
        className={className}
        type="text"
        name={name}
        placeholder={placeholder}
        inputMode="numeric"
        onChange={( event ) => { 
          const maskValue = mask(event.target.value);
          setMoney(() => maskValue);

          event.target.value = unmask(maskValue);
          onChange(event)
        }}
        value={money}
      />
    </>
  )
}

export default Currency