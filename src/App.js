import './style.scss';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// pages
import Main from './routes/Main';
import Editor from './routes/Editor/Editor';
import Minuta from './routes/Minuta/Minuta';


function App() {

  const [data, setData] = useState({
    tipo: "tabela",
    produtora: "",
    solicitante: "",
    job: "",
    observacao: "obs lindo",
    valor: {
      tabela: 3,
      valorHora: 52,
      minimoDeHoras: 11
    },
    diarias: [
      {
        id: '1',
        inicio: "2022-08-21T10:00",
        horas: 15,
        ocorrencia: "Retirada",
        valor: 520,
        adicional: [
          {
            ocorrencia: 'Almoço',
            valor: 28
          },
          {
            ocorrencia: 'Janta',
            valor: 30
          }
        ]
      },
      {
        id: '2',
        inicio: "2022-08-21T10:00",
        horas: 15,
        ocorrencia: "Montagem2",
        valor: 520,
        adicional: []
      }
    ]
  });
  const navigate = useNavigate();

  const openNavigation = {
    home: () => { 
      navigate('/aj/');
    },
    editor: {
      new: () => {
        const newId = Math.random().toString(36).slice(8);
        navigate(`/aj/editor/new/${newId}`);
      },
      edit: (id) => {
        navigate(`/aj/editor/edit/${id}`);
      },
    },
    minuta: () => {
      navigate('/aj/minuta');
    }
  }

  useEffect(() => {

    window.onpopstate = () => {
      document.querySelector('body').style = '';
      document.querySelector('.home').style = '';
    }

  }, [])

  return (
    <>
      {window.location.pathname !== '/aj/minuta' && (
        <Main 
          data={data}
          setData={setData} 
          openNavigation={openNavigation}
        />
      )}

      <Routes>
        <Route
          path='/aj/'
          element={null}
        />
        <Route 
          path='/aj/editor/:editorMode/:usedItemId'
          element={(
            <Editor
              openNavigation={openNavigation}
              data={data}
              setData={setData}
            />
          )} 
        />
        <Route 
          path='/aj/minuta'
          element={
            <Minuta 
              data={data}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
