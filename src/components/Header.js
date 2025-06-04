import React, { useState } from 'react';
import { View, TouchableOpacity, StatusBar, Image, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = ({  showBackIcon = false, backgroundColor, statusBarVisible,backgroundfieldcolor='#dadada', iconVisible,onIconPress, selectedIcon,backgroundColorstatus,showSearchIcon = true, headertxt}) => {
  const navigation = useNavigation()
 
  const handleIconPress = (icon) => {
    onIconPress(icon); 
    
    if (icon === 'goBack') {
      navigation.goBack();
    }
    else if (icon === 'heart') {
    
      navigation.navigate('wishlist')
    }
    else if (icon === 'bag') {
    
      navigation.navigate('cart')
    }
  };

  

  return (
    <View style={[styles.header, { backgroundColor }]}>
      {statusBarVisible && <StatusBar backgroundColor={backgroundColorstatus} barStyle="dark-content" />}
      
      

      
      <View style={styles.iconfy}>
      {showBackIcon ? (
        <TouchableOpacity style={styles.headicon} onPress={() => handleIconPress('goBack')}>
          <Feather name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
      ) : (
        <Image source={require('../assests/logo.png')} style={styles.logo} />
      )}

   <View style={[styles.headertxticon, { backgroundColor: backgroundfieldcolor }]}>
     <Text style={styles.headertext}>{headertxt}</Text>

      {iconVisible && (
      <Ionicons name="chevron-down" size={17} color={'#666'}style={styles.icone}/>
    )}
      </View>
      </View>
       
      <View style={styles.headerIcons}>
      {showSearchIcon && (
          <TouchableOpacity style={styles.headicon} onPress={() => handleIconPress('search')}>
            <Feather name="search" size={20} color={selectedIcon === 'search' ? 'black' : 'black'} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.headicon} onPress={() => handleIconPress('heart')}>
          <AntDesign name="hearto" size={20} color={selectedIcon === 'heart' ? 'black' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headicon} onPress={() => handleIconPress('bag')}>
          <Ionicons name="bag-outline" size={21} color={selectedIcon === 'bag' ? '#f9eee8' : 'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = {
   container: {
    width: '100%',
  },
  iconfy:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'
  },
  headertxticon:{
    flexDirection:'row',
    alignItems:'center',
    // backgroundColor:'#dadada',
    borderRadius:6,
    justifyContent:'center',
    padding:3,
    
  },
  headertext:{
    fontSize:14,
    color:'black',
    fontWeight:'500',
    marginLeft:4,
   
   
  },
  icone:{
    marginLeft:2
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  animatedSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 5,
    marginRight: 12,
    backgroundColor: 'white',
  },
  searchInput: {
    flex: 1,
    height: 23,
    color: 'black',
  },
  searchIcon: {
    paddingLeft: 8,
  },
  headicon: {
    marginRight: 12,
  },
    logo:{
    width:30,
    height:30,
    borderRadius:30
  }
};

export default Header;
