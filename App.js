/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';






const App = () => {

  const [refreshing, setRefreshing] = useState(false)
  const [rates, setRates] = useState([])

  useEffect(() => {
    getDataFromAPI()
  },[])

  const getDataFromAPI = async () => {
    setRefreshing(true) 
    let res = await fetch('http://api.nbp.pl/api/exchangerates/tables/a/?format=json')
    let json = await res.json();
    console.log(json[0].rates[0])
    setRates(json[0].rates)
    setRefreshing(false)
  }

  const ItemView = ({item}) => {
    return (
      <Text

      >
        {item.currency} {item.mid}
      </Text>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.textLabel}>Kursy walut</Text>
      {/* {refreshing ? <ActivityIndicator /> : null} */}
      <FlatList
        data={rates}
        keyExtractor={(item) => item.code}
        renderItem={ItemView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getDataFromAPI}/>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  textLabel: {
    textAlign: 'center',
    fontSize: 26,
  },
});

export default App;
