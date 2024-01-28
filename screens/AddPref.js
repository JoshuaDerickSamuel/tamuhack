import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import React from 'react'

const DATA = [
  {
    id: '1-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '2-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '3-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '4-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '5-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '6-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
]



const AddPref = () => {
  return (
    <View style={styles.container}>
        <SideScroller/>
    </View>
    
  )
}

const Card = ({title}) => {
  return (
    <View style={styles.card}>
      <Text>{title}</Text>
     
    </View>
  )
}

const CardContainer = () => {
    return (
        <View style={styles.holder}>
            <Card/>
            <Card/>
            <Card/>
        </View>
    )
}

const SideScroller = () => {
    return (
        <SafeAreaView>
            <Text>Title</Text>  
            <Text>Subtitle</Text>
            <FlatList
                data={DATA}
                renderItem={({item}) => <CardContainer title={item.title} />}
                keyExtractor={item => item.id}
                horizontal = {true}
                pagingEnabled
            />
        </SafeAreaView>

    )
}

export default AddPref

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card:{
        width: 367,
        height: 70,
        backgroundColor: 'red',
        margin:3,
        borderRadius: 9,
    },
    holder:{
        marginHorizontal: 10
    }

})