import { StyleSheet, Text, View, FlatList, Animated, TouchableOpacity } from 'react-native'
import React, {useState, useRef} from 'react'
import welcomeData from '../welcomeData'
import OnboardingItem from './OnboardingItem'
import Paginator from './Paginator'
import NextButton from './NextButton'

const Onboarding = ({navigation}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);
    const [imgLoaded, setImgLoaded] = useState(false);
   
    const handleImgLoad = () => {
        setImgLoaded(true);
    }
    if(currentIndex == 3 && !imgLoaded){
        handleImgLoad();
    }
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;
    
    const handleSignIn = () => {
    navigation.navigate('Auth');
  };


  return ( 
    <View style={styles.home}>
    <View style={styles.container}>
        <View style={{flex:3}}>
      <FlatList 
      data = {welcomeData} 
      renderItem={({ item }) => <OnboardingItem item={item} />}
      horizontal
      showsHorizontalScrollIndicator
      pagingEnabled
      bounces={false}
      keyExtractor={(item) => item.id}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: {x: scrollX}}}], {
        useNativeDriver:false,
      })}
      scrollEventThrottle={32}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={viewConfig}
      ref = {slidesRef}

      />
      </View>
      <View style={styles.bottom}>
      <Paginator data={welcomeData} scrollX={scrollX}/>
      {imgLoaded ? <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity> : <></>}
      </View>
    </View>
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom:{
        backgroundColor: 'red',
        height: 100,
        width: 100,
        alignItems: 'center',

    },
    signInButton: {
    width: '100%',
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  home:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },


})