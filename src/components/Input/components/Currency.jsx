import React from "react";

const toMoney = ( value ) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const mask = ( value ) => toMoney(parseInt(value.replace(/\D/g, "")) / 100);
const unmask = ( value ) => parseInt(value.replace(/[^0-9,]*/g, '').replace(',', '.'));

const Currency = ({
  value = 0,
  onChange,
  name,
  className,
  placeholder
}) => {

  return (
    <>
      <input 
        className={className}
        type="text"
        name={name}
        placeholder={placeholder}
        inputMode="numeric"
        onChange={( event ) => { 
          const value = event.target.value;
          // Retorna valor como número sem mascara
          event.target.value = unmask(mask(value));
          onChange(event);
        }}
        value={toMoney(value)}
      />
    </>
  );
};

export default Currency;