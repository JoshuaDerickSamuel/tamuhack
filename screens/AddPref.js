import { StyleSheet, Text, View, FlatList, SafeAreaView , ScrollView, TouchableOpacity, Button, ImageBackground  } from 'react-native'
import React, {useState} from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, push, set } from 'firebase/database';


const DATA1 = [
  {
    id: '1-c0bd4e79-08ed-41bf-ae21-36402cbe2abf',
    title: 'English 🇬🇧',
    image: '../assets/Categories/Languages/English.jpg', 
  },
  {
    id: '2-39e4e155-ad38-4e1e-90c0-f17c079c384e',
    title: 'Spanish 🇪🇸',
    image: '../assets/Categories/Languages/Spanish.jpg', 
  },
  {
    id: '3-c30e3747-ada7-4a20-b6d9-6b217a515226',
    title: 'Mandarin 🇨🇳',
    image: '../assets/Categories/Languages/Mandarin.jpg', 
  },
  {
    id: '4-a7fa2b6e-ec8a-451e-9dee-9fb3cb04ba2e',
    title: 'French 🇫🇷',
    image: '../assets/Categories/Languages/French.jpg', 
  },
  {
    id: '5-7b0fc550-69ef-45b5-a7a3-5fcbd06b29ca',
    title: 'Hindi 🇮🇳',
    image: '../assets/Categories/Languages/Hindi.jpg', 
  },
  {
    id: '6-53a3be88-e785-4cfb-aec6-3e89afcf68a1',
    title: 'Russian 🇷🇺',
    image: '../assets/Categories/Languages/Russian.jpg', 
  },
  {
    id: '7-ba70a831-f075-43b4-af93-12655ca6d438',
    title: 'Sign Language ✋',
    image: '../assets/Categories/Languages/Sign Language.jpg', 
  }
]
const DATA2 = 
  [
  {
    id: '8-04265cb5-7385-41eb-b24e-4d55886e13d4',
    title: 'Coding (Python, Java, etc.) 👨‍💻',
    image: '../assets/Categories/Technology/Coding.jpg', 
  },
  {
    id: '9-e71330e3-2129-4a17-b397-f0394c42096b',
    title: 'Web Development 🌐',
    image: '../assets/Categories/Technology/Web Development.jpg', 
  },
  {
    id: '10-95a0232a-2748-4676-8e73-fb9e50ee1899',
    title: 'AI / Machine Learning 🤖',
    image: '../assets/Categories/Technology/AI ML.jpg', 
  },
  {
    id: '11-a7c5f4a8-8d9e-4dcb-9e5e-8e8d9b4f4c1e',
    title: 'Graphic Design 🎨',
    image: '../assets/Categories/Technology/Graphic Design.jpg', 
  },
  {
    id: '12-7d5c1f4b-78b2-47a5-9751-57e33d9f0ad3',
    title: 'Microsoft Excel 📊',
    image: '../assets/Categories/Technology/Excel.png', 
  },
  {
    id: '13-c265c1a3-9d88-4e4f-a5e4-f0324fbd8c68',
    title: 'Microsoft PowerPoint 📈',
    image: '../assets/Categories/Technology/Powerpoint.png', 
  }]
  
  const DATA4 = [
    {
    id: '14-3ebc9321-9668-4f2a-9f90-b23e0976b569',
    title: 'Drawing ✏️',
    image: '../assets/Categories/Art & Creativity/Drawing.jpg', 
  },
  {
    id: '15-72f3b212-af85-4b6b-8d25-3d7e5f598d77',
    title: 'Painting 🖌️',
    image: '../assets/Categories/Art & Creativity/Painting.jpg', 
  },
  {
    id: '16-7984e5f5-45fc-48d4-97d2-8b5f74d38f47',
    title: 'Photography 📸',
    image: '../assets/Categories/Art & Creativity/Photography.jpg', 
  },
  {
    id: '17-e7d3c5b5-68ff-41c4-9d5f-2a5c11d1f7b5',
    title: 'Writing & Blogging ✍️',
    image: '../assets/Categories/Art & Creativity/Writing.webp', 
  },
  {
    id: '18-f0c2a4c6-ee4e-498c-a8bc-f5c6e593f91e',
    title: 'Cooking & Baking 🍳',
    image: '../assets/Categories/Art & Creativity/Cooking.jpg', 
  }]
  const DATA5 = [
  {
    id: '20-94bf0ada-58eb-4b1e-8d7f-7c35fcb57d8d',
    title: 'Guitar 🎸',
    image: '../assets/Categories/Music Instruments & Preforming Arts/Guitar.jpg', 
  },
  {
    id: '21-f7f8c2ce-2e36-4a5e-ba5e-1b6b2f5b088b',
    title: 'Piano 🎹',
    image: '../assets/Categories/Music Instruments & Preforming Arts/Piano.jpg', 
  },
  {
    id: '22-2d3fcdaf-3f56-4e34-8c1b-afe1f64b0c91',
    title: 'Violin 🎻',
    image: '../assets/Categories/Music Instruments & Preforming Arts/Violin.jpg', 
  },
  {
    id: '23-d6c1f6a7-0f64-4b78-832d-a7d6c1efc3af',
    title: 'Drums 🥁',
    image: '../assets/Categories/Music Instruments & Preforming Arts/Drums.jpg', 
  },
  {
    id: '24-2b0e5c60-b5e8-41fc-9c4e-0c6e4570b7f7',
    title: 'Flute 🎶',
    image: '../assets/Categories/Music Instruments & Preforming Arts/Flute.jpg', 
  },
  {
    id: '25-7f6c6f2d-ff34-4587-8c36-0b4d2f3e7e90',
    title: 'Singing 🎤',
    image: '../assets/Categories/Music Instruments & Preforming Arts/Singing.jpg', 
  },
  {
    id: '26-9f872b80-ae8b-45c6-b89e-1186112f7d69',
    title: 'Dancing 💃',
    image: '../assets/Categories/Music Instruments & Preforming Arts/Dancing.jpg', 
  }]

  const DATA6 = [
  {
    id: '27-7f6c6f2d-ff34-4587-8c36-0b4d2f3e7e90',
    title: 'Gardening 🌱',
    image: '../assets/Categories/Crafts & Hobbies/Gardening.jpg', 
  },
  {
    id: '28-7f6c6f2d-ff34-4587-8c36-0b4d2f3e7e90',
    title: 'DIY Projects 🔨',
    image: '../assets/Categories/Crafts & Hobbies/DIY.jpg', 
  },
  {
    id: '29-7f6c6f2d-ff34-4587-8c36-0b4d2f3e7e90',
    title: 'Woodworking 🪓',
    image: '../assets/Categories/Crafts & Hobbies/Woodworking.jpg', 
  },
  {
    id: '30-7f6c6f2d-ff34-4587-8c36-0b4d2f3e7e90',
    title: 'Crocheting & Knitting 🪡',
    image: '../assets/Categories/Crafts & Hobbies/Crocheting.jpg', 
  },
  {
    id: '31-7f6c6f2d-ff34-4587-8c36-0b4d2f3e7e90',
    title: 'Pottery 🏺',
    image: '../assets/Categories/Crafts & Hobbies/Pottery.jpg', 
  },
  {
    id: '32-7f6c6f2d-ff34-4587-8c36-0b4d2f3e7e90',
    title: 'Scrapbooking 🖼️',
    image: '../assets/Categories/Crafts & Hobbies/Scrapbooking.jpg', 
  },
  {
    id: '35-7f6c6f2d-ff34-4587-8c36-0b4d2f3e7e90',
    title: 'Rock Climbing 🧗‍♂️',
    image: '../assets/Categories/Crafts & Hobbies/Rock Climbing.jpg', 
  },
  {
    id: '36-7f6c6f2d-ff34-4587-8c36-0b4d2f3e7e90',
    title: 'Personal Fitness 🏋️‍♂️',
    image: '../assets/Categories/Crafts & Hobbies/Fitness.jpg', 
  },
  {
    id: '37-7f6c6f2d-ff34-4587-8c36-0b4d2f3e7e90',
    title: 'Nutrition 🍎',
    image: '../assets/Categories/Crafts & Hobbies/Nutrition.jpg', 
  },
];



const AddPref = ({ navigation }) => {

  return (
    <View style={styles.container}>
        <SideScroller nav = {navigation}/>
    </View>
    
  )
}

const Card = ({title, img}) => {
        const [friends, setFriends] = useState(friendsArray); // Setting default value
        const handleAddFriend = () => {
            setFriends((prevFriends) => [
                ...prevFriends,
                {
                    name: {title},
                    age: 20, // Random age
                },
            ]);
         };

    return(
<   View style={styles.card}>
  
      <TouchableOpacity style={styles.button} onPress={() => {
        
                  const a = {title}
                  const test = a.title;
                  console.log(test)
                  const auth = getAuth();
                  const user = auth.currentUser;
                  UID = user.uid;
                  const db = getDatabase();
                  const prefsRef = ref(db, `users/${user  .uid}/preferences`);
                  push(prefsRef, {
                      pref:test,
                    })
                    .then(() => {
                      console.log('Skill added successfully');
                    })
                    .catch((error) => {
                      console.error('Error adding: ', error.message);
                    });     

      }}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}
    
    

const CardContainer = ({title}) => {
    return (
        <View style={styles.holder}>
            <Card title={title.title} img = {title.image}/>
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

const friendsArray = [];

const SideScroller = ({nav}) => {





    return (
        <View>
        <Header/>
        <SafeAreaView style={styles.content}>
            <ScrollView style={styles.scrollView}>
            <Text style={styles.cardTitle}>Title</Text>  
            <FlatList
                data={DATA1}
                renderItem={({item}) => <CardContainer title={item} />}
                keyExtractor={item => item.id}
                horizontal = {true}
                pagingEnabled
                      />
            <Text style={styles.cardTitle}>Title2</Text>  
            <FlatList
                data={DATA2}
                renderItem={({item}) => <CardContainer title={item} />}
                keyExtractor={item => item.id}
                horizontal = {true}
                pagingEnabled
            />
            <Text style={styles.cardTitle}>Title</Text>  
            <FlatList
                data={DATA4}
                renderItem={({item}) => <CardContainer title={item} />}
                keyExtractor={item => item.id}
                horizontal = {true}
                pagingEnabled
            />
            <Text style={styles.cardTitle}>Title</Text>  
            <FlatList
                data={DATA5}
                renderItem={({item}) => <CardContainer title={item} />}
                keyExtractor={item => item.id}
                horizontal = {true}
                pagingEnabled
            />
            <Text style={styles.cardTitle}>Title</Text>  
            <FlatList
                data={DATA6}
                renderItem={({item}) => <CardContainer title={item} />}
                keyExtractor={item => item.id}
                horizontal = {true}
                pagingEnabled
            />
            <Button title="Next" onPress={() => nav.navigate('Skills')} />
            </ScrollView>
        </SafeAreaView>
        
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
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row'

    },
    cardTitle:{
        fontSize: 40
    },
    image:{
      flex: 1,
      justifyContent: 'center'
    }

})