import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Image } from 'react-native';

const API_FOOTBALL_KEY = '6a3c6a2a19msh03e5da18fb9bd78p17e0bejsn01c39e64bb0c';
const BASE_URL = 'https://api-football-beta.p.rapidapi.com';

const Tela3 = ({ navigation }) => {
  const buscarJogadores = () => {
    const time = timeValue;
    const season = seasonValue;
    if (time === '') {
      alert('Por favor, digite o ID do time.');
      return;
    }
    fetch(`${BASE_URL}/players?team=${time}&season=${season}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_FOOTBALL_KEY,
        'x-rapidapi-host': 'api-football-beta.p.rapidapi.com',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const jogadores = data.response;
        setJogadores(jogadores);
      })
      .catch((error) => console.error(error));
  };

  const [timeValue, setTimeValue] = React.useState('');
  const [seasonValue, setSeasonValue] = React.useState('');
  const [jogadores, setJogadores] = React.useState([]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.jumbotron}>
        <Text style={styles.jumbotronText}>Informações sobre times, jogos e jogadores</Text>
        <Text style={styles.jumbotronText}>Todas as informações que você precisa!</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Consulta de Jogadores de Futebol</Text>
        <View style={styles.panelBody}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Digite o ID do time (Ex:. 49):</Text>
            <TextInput
              style={styles.input}
              value={timeValue}
              onChangeText={setTimeValue}
              placeholder="Digite o ID do time"
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Digite a Temporada (ano):</Text>
            <TextInput
              style={styles.input}
              value={seasonValue}
              onChangeText={setSeasonValue}
              placeholder="Digite a Temporada"
            />
          </View>
          <Button title="Buscar Jogadores" onPress={buscarJogadores} />
          <View style={styles.hr} />
          <View style={styles.listaJogadores}>
            {jogadores.map((jogador, index) => (
              <View key={index} style={styles.playerItem}>
                <Image source={{ uri: jogador.player.photo }} style={styles.playerImage} />
                <Text style={styles.playerName}>
                  {`${jogador.player.name} (${jogador.position}) - Nacionalidade: ${jogador.nationality}, Idade: ${jogador.age}`}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Navegação</Text>
        <View style={styles.panelBody}>
          <Button title="Informações de times" onPress={() => {navigation.navigate('Tela1')}} />
          <Button title="Eventos e jogos" onPress={() => {navigation.navigate('Tela2')}} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  jumbotron: {
    backgroundColor: '#337ab7',
    padding: 30,
    marginBottom: 30,
    color: '#fff',
    borderRadius: 0,
    alignItems: 'center',
  },
  jumbotronText: {
    fontSize: 36,
    marginTop: 10,
    color: '#fff',
  },
  panel: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#fff',
    marginBottom: 30,
    borderRadius: 0,
    alignItems: 'center',
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  hr: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginVertical: 20,
  },
  listaJogadores: {
    marginTop: 10,
  },
  playerItem: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  playerName: {
    marginRight: 10,
  },
});

export default Tela3;
