import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import welcomeData from '../welcomeData'
import OnboardingItem from './OnboardingItem'

const Onboarding = () => {
  return (
    <View style={styles.container}>
      <FlatList data = {welcomeData} renderItem={({ item }) => <OnboardingItem item={item} />}/>
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})