import React, { useEffect, useState } from "react";

const mask = ( string ) => 
  unmask(string)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');

const unmask = ( string ) => string.replace(/\D/g, '').substring(0, 14);

export default function Produtora({ data, setData }) {

  const { produtora: { string, empresa } } = data;
  const valueIsCnpj = /^[0-9]{3}/.test(string);

  console.log(data.produtora);

  const handleChange = ( event ) => {
    const value = event.target.value;
    const validation = /^[0-9]{14}/.test(unmask(value));

    setData(( data ) => {
      const empresa = validation ? data.produtora.empresa : {};
      return ({
        ...data,
        produtora: {
          empresa: empresa,
          string: valueIsCnpj ? unmask(value) : value,
        },
      })
    });
  };

  useEffect(() => {
    const completedCnpj = /^[0-9]{14}/.test(string);
    const cnpj = string;

    if ( completedCnpj ) {
      fetch(
        `https://cors-anywhere.herokuapp.com/https://receitaws.com.br/v1/cnpj/${cnpj}`
      )
        .then(( response ) => response.json())
        .then(( dataApi ) => {
          if ( dataApi.status === 'OK' ) {
            const { email, cep, nome } = dataApi;

            setData(( data ) => ({
              ...data,
              produtora: {
                ...data.produtora,
                empresa: {
                  email: email,
                  cep: cep,
                  nome: nome,
                },
              },
            }));
          }
        })
        .catch(( err ) => {
          console.error(err);
        });
    }
  }, [string, setData]);

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={valueIsCnpj ? mask(string) : string}
        onChange={handleChange}
        placeholder="Produtora"
      />
      {empresa.nome && (
        <span
          style={{
            position: "absolute",
            right: 0,
            width: "50%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            color: "#cdcdcd",
          }}
        >
          {empresa.nome}
        </span>
      )}
    </div>
  );
}; 