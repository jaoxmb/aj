import React, { useEffect, useState } from "react";

// componentes
import { Input } from "../Input";

const mask = ( string ) => unmask(string)
  .replace(/^(\d{2})(\d)/, '$1.$2')
  .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
  .replace(/\.(\d{3})(\d)/, '.$1/$2')
  .replace(/(\d{4})(\d)/, '$1-$2');

const unmask = ( string ) => string.replace(/\D/g, '').substring(0, 14);

export default function Produtora ({ 
  data,
  setData
}) {

  const { produtora: { string } } = data;
  const stringIsCnpj = (/^[0-9]{2}/).test(string);

  const handleChange = ( event ) => {
    const value = event.target.value;
    setData((data) => ({
      ...data,
      produtora: {
        ...data.produtora,
        string: stringIsCnpj ? unmask(value) : value,
      },
    }));
  };

  useEffect(() => {
    const completedCnpj = (/^[0-9]{14}/).test(string);
    const cnpj = string;
  
    completedCnpj && fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`)
      .then(response => response.json())
      .then(apiData => {
        console.log(apiData);
        setData(( data ) => ({
          ...data,
          produtora: {
            ...data.produtora,
            empresa: ( apiData )
          }
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [ string, setData ]);
   
  return (
    <>
      <Input
        type="text"
        value={stringIsCnpj ? mask(string) : string}      
        onChange={handleChange}
      />
    </>
  );
};