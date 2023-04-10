import React from "react";
import { StyleSheet, Font, Document, Page } from "@react-pdf/renderer";

// Components
import Tabela from "./Tabela"
import Cabecalho from "./Cabecalho";

// fonts
import RobotoRegular from "../../../fonts/Roboto/Roboto-Regular.ttf";
import RobotoMedium from "../../../fonts/Roboto/Roboto-Medium.ttf";
import RobotoBlack from "../../../fonts/Roboto/Roboto-Black.ttf";

Font.register({ 
  family: 'Roboto', 
  fonts: [
    {
      src: RobotoRegular
    },
    {
      src: RobotoMedium,
      fontWeight: 'medium'
    },
    {
      src: RobotoBlack,
      fontWeight: 'black'
    }
  ]
});

const styles = StyleSheet.create({
  document: {
    fontFamily: 'Roboto',
    fontSize: 10
  },
  margin: {
    width: '100%',
    height: '100%',
    padding: '0 25px 0 25px'
  }
});

const Arquivo = ({ 
  data
}) => (
  <Document style={styles.document}>
    <Page>
      <Cabecalho data={data}/>
      <Tabela data={data} style={styles.margin}/>
    </Page>
  </Document>
);

export default Arquivo;