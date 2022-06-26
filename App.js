/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';

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
  const [date, setDate] = useState(Date.now())

  useEffect(() => {
    getDataFromAPI()
  }, [])

  const getDataFromAPI = async () => {
    setRefreshing(true)
    let res = await fetch('http://api.nbp.pl/api/exchangerates/tables/b/?format=json')
    let json = await res.json();
    // console.log(json[0].rates[0])
    setDate(json[0].effectiveDate)
    setRates(json[0].rates)
    setRefreshing(false)
  }

  const ItemView = ({ item }) => {
    return (
      <View style={styles.itemView}>
        <Text style={styles.currencyName}>
          {item.currency}
        </Text>
        <Text style={styles.currencyValue}>
          {item.mid.toFixed(2)} zł
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.textLabel}>Kursy walut</Text>
      <Text style={styles.textLabelSmall}>z dnia {date}</Text>
      {/* {refreshing ? <ActivityIndicator /> : null} */}
      <FlatList
        data={rates}
        keyExtractor={(item) => item.code}
        renderItem={ItemView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getDataFromAPI} />
        }
        style={styles.flatList}
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
  textLabelSmall: {
    textAlign: 'center',
    fontSize: 16,
  },
  flatList: {
    borderTopWidth: 1,
  },
  itemView: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  currencyName: {
    flex: 3,
    fontSize: 16,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  currencyValue: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
  },
});

export default App;
