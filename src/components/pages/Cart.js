import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../redux/store/slice/cartSlice';
import Header from '../Header';

export default function CartScreen() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

const renderItem = ({ item }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.thumbnail }} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => dispatch(decrementQuantity(item.id))} style={styles.qtyButton}>
          <Text style={styles.qtyText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => dispatch(incrementQuantity(item.id))} style={styles.qtyButton}>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* <Text style={styles.totalPerItem}>
        Total: ${(item.price * item.quantity).toFixed(2)}
      </Text> */}

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => dispatch(removeFromCart(item.id))}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  </View>
);


  const handleClearCart = () => {
    Alert.alert('Clear Cart', 'Are you sure you want to clear the cart?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', onPress: () => dispatch(clearCart()), style: 'destructive' },
    ]);
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
        headertxt="Cart"
      />
    <View style={styles.container}>
      {items.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
            <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
              <Text style={styles.clearButtonText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    padding: 20,
    elevation: 2,
  },
   clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  qtyButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    color: '#000',
  },
  clearButton: {
  backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#666',
  },
  totalPerItem: {
  fontSize: 14,
  color: '#555',
  marginTop: 4,
  fontWeight: '500',
},

});
