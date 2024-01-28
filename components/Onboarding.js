import { StyleSheet, Text, View, FlatList, Animated } from 'react-native'
import React, {useState, useRef} from 'react'
import welcomeData from '../welcomeData'
import OnboardingItem from './OnboardingItem'
import Paginator from './Paginator'
import NextButton from './NextButton'

const Onboarding = () => {
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
    


  return ( 
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
      {imgLoaded ? <NextButton/> : <></>}
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

    }


})