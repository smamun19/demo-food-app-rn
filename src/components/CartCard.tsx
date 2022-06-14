import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../services/userContext';

interface CartCardProps {
  quantity: number;
  name: string;
  price: number;
  variation?: string;
  id: number;
}

const CartCard = ({name, price, quantity, variation, id}: CartCardProps) => {
  const userInfo = useContext(UserContext);

  const addQuantity = () => {
    if (variation) {
      userInfo?.addItem({
        id: id,
        variation: variation,
        price: price,
        quantity: 1,
        name: name,
        compositeId: `${id}${variation}`,
      });
      return;
    }

    userInfo?.addItem({
      id: id,
      price: price,
      quantity: 1,
      name: name,
      compositeId: `${id}`,
    });
  };

  const removeQuantity = () => {
    if (variation) {
      userInfo?.removeItem({
        id: id,
        variation: variation,
        price: price,
        quantity: 1,
        name: name,
        compositeId: `${id}${variation}`,
      });
      return;
    }

    userInfo?.removeItem({
      id: id,
      price: price,
      quantity: 1,
      name: name,
      compositeId: `${id}`,
    });
  };
  return (
    <View style={styles.cartCard}>
      <View style={styles.leftSection}>
        <MaterialIcons
          onPress={removeQuantity}
          name="remove-circle"
          size={30}
          color="red"
        />
        <Text>{quantity}</Text>
        <MaterialIcons
          onPress={addQuantity}
          name="add-circle"
          size={30}
          color="red"
        />

        <Image
          source={require('../assets/placeholder.jpg')}
          style={styles.img}
        />

        <Text style={styles.name}>
          {name} {variation ? ` - ${variation}` : null}
        </Text>
      </View>

      <Text>Tk {price * quantity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cartCard: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: '#6b6b6b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {height: 50, width: 50, marginLeft: 20},
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flexWrap: 'wrap',
    width: 150,
    marginLeft: 20,
  },
});

export default CartCard;
