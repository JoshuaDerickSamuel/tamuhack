import { StyleSheet, Text, View, FlatList, SafeAreaView , ScrollView, TouchableOpacity, Button  } from 'react-native'
import React, {useState} from 'react'

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
    title: 'Fourth Item',
  },
  {
    id: '5-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Fifth Item',
  },
  {
    id: '6-3da1-471f-bd96-145571e29d72',
    title: 'Sixth Item',
  },
]





const AddPref = ({ navigation }) => {

  return (
    <View style={styles.container}>
        <SideScroller nav = {navigation}/>
    </View>
    
  )
}

const Card = ({title}) => {
        const [friends, setFriends] = useState(friendsArray); // Setting default value
        const handleAddFriend = () => {
    setFriends((prevFriends) => [
        ...prevFriends,
        {
            name: {title},
            age: 20, // Random age
        },
    ]);
    console.log(friends)
};

    return(
<   View style={styles.card}>
      <TouchableOpacity style={styles.button} onPress={handleAddFriend}>
        <Text>{title}</Text>
      </TouchableOpacity>
     
    </View>
  )
}
    
    

const CardContainer = ({title}) => {
    return (
        <View style={styles.holder}>
            <Card title={title.title}/>
        </View>
    )
}

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.headertext}>Header</Text>
        </View>
    )
}

const friendsArray = [
    {
        name: "John",
        age: 19,
    },
    {
        name: "Candy",
        age: 18,
    },
    {
        name: "mandy",
        age: 20,
    },
];

const SideScroller = ({nav}) => {





    return (
        <View>
        <Header/>
        <SafeAreaView style={styles.content}>
            <ScrollView style={styles.scrollView}>
            <Text style={styles.cardTitle}>Title</Text>  
            <FlatList
                data={DATA}
                renderItem={({item}) => <CardContainer title={item} />}
                keyExtractor={item => item.id}
                horizontal = {true}
                pagingEnabled
            />
            <Text style={styles.cardTitle}>Title</Text>  
            <FlatList
                data={DATA}
                renderItem={({item}) => <CardContainer title={item} />}
                keyExtractor={item => item.id}
                horizontal = {true}
                pagingEnabled
            />
            <Text style={styles.cardTitle}>Title</Text>  
            <FlatList
                data={DATA}
                renderItem={({item}) => <CardContainer title={item} />}
                keyExtractor={item => item.id}
                horizontal = {true}
                pagingEnabled
            />
            <Text style={styles.cardTitle}>Title</Text>  
            <FlatList
                data={DATA}
                renderItem={({item}) => <CardContainer title={item} />}
                keyExtractor={item => item.id}
                horizontal = {true}
                pagingEnabled
            />
            </ScrollView>
        </SafeAreaView>
        <Button title="Go to Home" onPress={() => nav.navigate('Skills')} />
        </View>

    )
}

export default AddPref

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    flex:1
  },
    card:{
        width: 367,
        height: 200,
        margin:3,
        borderRadius: 9,
    },
    holder:{
        marginHorizontal: 10
    },content:{
        flex:1
    },
    header:{
        height: 160,
        backgroundColor: 'lightblue',

    },
    cardTitle:{
        fontSize: 40
    }

})