import React from "react";
import { StyleSheet, View, Text, Image } from "@react-pdf/renderer";

// images 
import BackgroundImage from "../../../images/from Minuta/background.jpg";

const styles = StyleSheet.create({
  headerBox: {
    position: 'absolute',
    width: '100%',
    height: 150,
    padding: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerBackground: {
    width: '100%',
    height: 150,
    marginBottom: 25
  },  
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'black',
    fontSize: 30,
    textTransform: 'uppercase'
  },  
  subtitle: {
    fontSize: 20,
    fontWeight: 800
  },
  bold: {
    fontWeight: 'medium'
  },
  minutaInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  }
});

const Cabecalho = ({
  data
}) => {

  return (
    <>
      <Image style={styles.headerBackground} src={BackgroundImage} />
      <View style={styles.headerBox}>
        <View>
          <Text style={styles.subtitle}>João Victor</Text>
          <Text>Razao Social</Text>
          <Text>cnpj</Text>
          <Text>endereco</Text>
          <Text>cel</Text>
          <Text>email</Text>
        </View>

        <View style={styles.minutaInfo}>
          <Text style={styles.title}>Minuta</Text>
          <Text>ref: 0001</Text>
          <Text>20/08/2003</Text>
          <Text style={styles.bold}>R$ 1.000,00</Text>
        </View>
      </View>
    </>
  );
};

export default Cabecalho;