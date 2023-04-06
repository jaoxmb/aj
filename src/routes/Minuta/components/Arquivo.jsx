import React from "react";
import { StyleSheet, Document, Page } from "@react-pdf/renderer";

// Components
import Tabela from "./Tabela"

const styles = StyleSheet.create({
  document: {
    fontSize: 10
  },
  borderPage: {
    width: '100%',
    height: '100%',
    padding: '0 20px 0 20px'
  }
});

const Arquivo = ({ 
  data
}) => (
  <Document style={styles.document}>
    <Page style={styles.borderPage}>
      <Tabela 
        data={data} 
      />
    </Page>
  </Document>
);

export default Arquivo;