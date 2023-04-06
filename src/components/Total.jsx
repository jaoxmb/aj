import Valores from "../Valores";
import Valor from "./Valor";

// Função correspondente ao tipo 'tabela' e 'corrida' da minuta
const perHour = ( data ) => {
  const { diarias, tipo } = data;
  let totalObject = {};

  // Calcula as horas totais
  const hours = () => {
    return diarias.reduce(( total, item ) => {
      return total + item.horas;
    }, 0);
  };

  // Calcula o valor total
  const total = () => {
    return diarias.reduce(( total, item ) => {
      const value = Valor({ diarie: item, data: data }).format(false);
      return total + value;
    }, 0);
  };

  // Adiciona as informações acima ao objeto totalObject
  totalObject = {
    hours: hours(),
    total: total()
  };

  // Se o tipo for 'tabela', adiciona mais informações
  if (tipo === "tabela") {
    // Calcula o valor total extra
    const extraTotal = () => {
      const minValue = Valores.find(( item ) => item.id === data.valor.tabela)
        .valores[0].valor;
      return total() - minValue * diarias.length;
    };

    // Calcula as horas extras
    const overtime = () => {
      const minHours =
        tipo === "tabela"
          ? Valores.find(( item ) => item.id === data.valor.tabela).valores[0]
              .horas
          : data.valor.minimoDeHoras;
      return hours() - minHours * diarias.length;
    };

    // Adiciona as informações extras ao objeto totalObject
    totalObject = {
      ...totalObject,
      extraTotal: extraTotal(),
      overtime: overtime(),
    };
  }

  return totalObject;
};

// Função correspondete ao tipo 'pacote' da minuta
const perPackage = ( data ) => {
  const { diarias } = data;

  return ({
    diaries: diarias.length,
    total: diarias.reduce(( total, item ) => { return total + item.valor },0)
  });

}

const Total = ( data ) => {
  const { diarias, tipo } = data;

  // Calcula o valor total dos adicionais
  const additional = () => {
    return diarias.reduce(( total, item ) => {
      const { adicional } = item;
      const additionalTotal = adicional.reduce(( total, item ) => {
        return total + item.valor;
      }, 0);
      return total + additionalTotal;
    }, 0);
  };
  // Importa as informações com base no 'tipo' da minuta
  const result = tipo === 'pacote' ? perPackage( data ) : perHour( data );
  // Calcula 'total' mais valor 'additional'
  const summedResult = { ...result, total: ( result.total + additional())};

  return {
    additional: additional(),
    ...(summedResult)
  };
};

export default Total;
