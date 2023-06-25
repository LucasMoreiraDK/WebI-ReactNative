import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';

const API_KEY = "6a3c6a2a19msh03e5da18fb9bd78p17e0bejsn01c39e64bb0c";
const API_ENDPOINT = `https://v3.football.api-sports.io/fixtures?date=`;

const Tela2 = ({ navigation }) => {
  const [dateValue, setDateValue] = useState('');
  const [results, setResults] = useState([]);

  const handleDateChange = (value) => {
    setDateValue(value);
  };

  const handleSearch = () => {
    if (!dateValue) {
      alert("Por favor, escolha uma data.");
      return;
    }

    const url = `${API_ENDPOINT}${dateValue}`;
    fetch(url, {
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const fixtures = data.response;
        if (fixtures.length === 0) {
          setResults(["Não há jogos marcados para esta data."]);
          return;
        }
        const fixtureList = fixtures.map((fixture) => `${fixture.fixture.status.short} ${fixture.teams.home.name} vs. ${fixture.teams.away.name}`);
        setResults(fixtureList);
      })
      .catch((error) => {
        console.log(error);
        setResults(["Ocorreu um erro ao buscar os jogos."]);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.jumbotron}>
        <Text style={styles.jumbotronText}>Informações sobre times, jogos e jogadores</Text>
        <Text style={styles.jumbotronText}>Todas as informações que você precisa!</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Jogos de futebol em uma data específica</Text>
        <View style={styles.panelBody}>
          <TextInput
            style={styles.input}
            value={dateValue}
            onChangeText={handleDateChange}
            placeholder="Escolha uma data"
          />
          <Button title="Buscar" onPress={handleSearch} />
          <View style={styles.results}>
            {results.map((result, index) => (
              <Text key={index} style={styles.resultText}>{result}</Text>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Navegação</Text>
        <View style={styles.panelBody}>
          <Button title="Informações de times" onPress={() => {navigation.navigate('Tela1')}} />
          <Button title="Informações dos jogadores" onPress={() => {navigation.navigate('Tela3')}} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 30,
  },
  jumbotron: {
    backgroundColor: '#337ab7',
    padding: 30,
    marginBottom: 30,
    alignItems: 'center',
  },
  jumbotronText: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 10,
  },
  panel: {
    width: '90%',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  panelTitle: {
    backgroundColor: '#337ab7',
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    fontSize: 24,
    marginTop: 0,
    marginBottom: 0,
  },
  panelBody: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  results: {
    marginTop: 20,
  },
  resultText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Tela2;
