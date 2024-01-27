import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'

const OnboardingItem = ({item}) => {
    const { width } =  useWindowDimensions();

  return (
    <View style={[styles.container, { width}]}>
      <Image source={item.image} style={[styles.image,{width, resizeMode: 'contain'}]}/>
      <View style={{ flex: 0.3}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}

export default OnboardingItem

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    image:{
        flex:0.7,
        justifyContent: 'center'
    },
    title:{
        fontWeight:'800',
        fontSize:28,
        marginBottom:10,
        textAlign:'center'

    },
    description:{
        fontWeight: '300',
        textAlign: 'center',
        paddingHorizontal: 64,
    }
})