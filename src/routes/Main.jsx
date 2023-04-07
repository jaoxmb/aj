import React, { useCallback } from "react";
//components
import Diarias from '../components/Diarias';
import Tipo from '../components/Tipo';
import { Inputs, Input } from '../components/Input/Input';
import Total from "../components/Total";

export default function Main({ 
  data, 
  setData,
  openNavigation
}){

  const handleChange = ( event ) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(( values ) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <div className="container home">
        <div className="padding">
          <br />
          <br />
          <br />

          <Inputs>
            <Input
              type="text"
              className="font black"
              name="job"
              value={data.job}
              onChange={handleChange}
              placeholder="Job"
            />
            <Input
              type="text"
              name="produtora"
              value={data.produtora}
              onChange={handleChange}
              placeholder="Produtora"
            />
            <Input
              type="text"
              name="solicitante"
              value={data.solicitante}
              onChange={handleChange}
              placeholder="Solicitante"
            />
          </Inputs>

          <Tipo 
            data={data} 
            setData={setData} 
            pastType={data.tipo} 
          />

          <Diarias 
            navigateOpenEditor={openNavigation.editor}  
            data={data} 
          />

          <Input
            type="textarea"
            onChange={handleChange}
            name="observacao"
            value={data.observacao}
          />

          <br />

          <button className="btn font blue" onClick={openNavigation.minuta}>
            Gerar imagem da minuta
          </button>

          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
}