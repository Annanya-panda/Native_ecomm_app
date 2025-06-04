import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/store/slice/cartSlice';
import Header from '../Header';
import Toast from 'react-native-toast-message';

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;
  const dispatch = useDispatch();

 const handleAddToCart = () => {
    dispatch(addToCart(product));
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: `${product.title} has been added to cart.`,
      position: 'bottom', 
    });
  };

  return (
    <>
      <Header
        backgroundColor="white"
        statusBarVisible={true}
        backgroundColorstatus="white"
        onIconPress={() => console.log('Icon pressed')}
        selectedIcon="search"
        showBackIcon={true}
        iconVisible={true}
        headertxt="Product Details"
      />
      <ScrollView style={styles.container}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />

 
        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <TouchableOpacity style={styles.addToBagButton} onPress={handleAddToCart}>
            <Text style={styles.addToBagButtonText}>Add to Bag</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    backgroundColor: '#e9ecef',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: -2 },
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 22,
    marginBottom: 15,
  },
  price: {
    fontSize: 20,
    color: '#28a745',
    fontWeight: '600',
    marginBottom: 25,
  },
  addToBagButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToBagButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
