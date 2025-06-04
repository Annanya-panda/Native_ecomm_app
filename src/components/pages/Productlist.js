import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/store/slice/productslice';
import Header from '../Header';

const screenWidth = Dimensions.get('window').width;
const CARD_MARGIN = 8;
const CARD_WIDTH = (screenWidth / 2) - CARD_MARGIN * 3;

export default function ProductListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { list, loading, error, page, hasMore } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(0));
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(fetchProducts(0));
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchProducts(page + 1));
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );

  if (loading && page === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.error}>Error: {error}</Text>;
  }

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
        headertxt="Product List"
      />
      <View style={styles.container}>
        
       <FlatList
  key={'h'} // any static value will do — use 'h' for horizontal layout to avoid RN’s internal caching issue
  data={list}
  keyExtractor={(item) => item.id.toString()}
  renderItem={renderItem}
  numColumns={2}
  columnWrapperStyle={styles.row}
  contentContainerStyle={{ padding: 10 }}
  onEndReached={loadMore}
  onEndReachedThreshold={0.5}
  refreshControl={
    <RefreshControl refreshing={loading && page === 0} onRefresh={onRefresh} />
  }
/>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    width: CARD_WIDTH,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    padding: 10,
  },
  image: {
    width: '100%',
    height: 130,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    marginTop: 4,
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
