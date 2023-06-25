import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const API_KEY = '6a3c6a2a19msh03e5da18fb9bd78p17e0bejsn01c39e64bb0c';
const BASE_URL = 'https://api-football-beta.p.rapidapi.com';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#337ab7',
    color: '#fff',
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    textAlign: 'center',
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    marginBottom: 10,
  },
  listItemText: {
    fontWeight: 'bold',
  },
});

const App = ({ navigation }) => {
  const [timeNome, setTimeNome] = useState('');
  const [leagueInfo, setLeagueInfo] = useState('39');
  const [seasonInfo, setSeasonInfo] = useState('2021');
  const [leagueTeams, setLeagueTeams] = useState('39');
  const [seasonTeams, setSeasonTeams] = useState('2019');
  const [timesInfo, setTimesInfo] = useState([]);
  const [timesTeams, setTimesTeams] = useState([]);

  const buscarInformacoes = () => {
    fetch(`${BASE_URL}/teams?league=${leagueInfo}&season=${seasonInfo}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'api-football-beta.p.rapidapi.com',
      },
    })
      .then(response => response.json())
      .then(data => {
        const times = data.response;
        const time = times.find(t => t.team.name.toLowerCase() === timeNome.toLowerCase());
        if (!time) {
          alert('Time não encontrado!');
          return;
        }
        setTimesInfo([time]);
      })
      .catch(error => console.error(error));
  };

  const buscarTimes = () => {
    fetch(`${BASE_URL}/teams?league=${leagueTeams}&season=${seasonTeams}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'api-football-beta.p.rapidapi.com',
      },
    })
      .then(response => response.json())
      .then(data => {
        const times = data.response;
        setTimesTeams(times);
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informações sobre times, jogos e jogadores</Text>

      <ScrollView>
        <View>
          <Text>Buscar Informações</Text>
          <Text>Escolha a liga e a temporada:</Text>

          <Text>Liga:</Text>
          <TextInput
            style={styles.input}
            value={leagueInfo}
            onChangeText={setLeagueInfo}
          />

          <Text>Temporada:</Text>
          <TextInput
            style={styles.input}
            value={seasonInfo}
            onChangeText={setSeasonInfo}
          />

          <Text>Time:</Text>
          <TextInput
            style={styles.input}
            value={timeNome}
            onChangeText={setTimeNome}
          />

          <Button title="Buscar Informações" onPress={buscarInformacoes} />

          <View style={styles.list}>
            {timesInfo.map(time => (
              <View style={styles.listItem} key={time.team.id}>
                <Text style={styles.listItemText}>{time.team.name}</Text>
                <Text>({time.team.country})</Text>
                <Text>Fundado em: {time.team.founded}</Text>
                <Text>ID: {time.team.id}</Text>
                <Text>Código: {time.team.code || 'N/A'}</Text>
                <Text>Nacional: {time.team.national}</Text>
              </View>
            ))}
          </View>
        </View>

        <View>
          <Text>Buscar Times</Text>
          <Text>Escolha a liga e a temporada e veja os times:</Text>

          <Text>Liga:</Text>
          <TextInput
            style={styles.input}
            value={leagueTeams}
            onChangeText={setLeagueTeams}
          />

          <Text>Temporada:</Text>
          <TextInput
            style={styles.input}
            value={seasonTeams}
            onChangeText={setSeasonTeams}
          />

          <Button title="Buscar Times" onPress={buscarTimes} />

          <View style={styles.list}>
            {timesTeams.map(time => (
              <View style={styles.listItem} key={time.team.id}>
                <Text style={styles.listItemText}>
                  {time.team.name} ({time.team.country}) - Fundado em {time.team.founded} - ID do time: {time.team.id}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View>
        <Button title="Informações de Jogadores" onPress={() => {navigation.navigate('Tela3')}} />
        <Button title="Eventos e Jogos" onPress={() => {navigation.navigate('Tela2')}} />
      </View>
    </View>
  );
};

export default App;
