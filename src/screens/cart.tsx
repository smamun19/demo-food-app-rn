import React, {useContext, useMemo} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CartCard from '../components/CartCard';
import Container from '../components/Container';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import Spacer from '../components/Spacer';
import {RootStackScreensProps} from '../navigators/root-stack';
import {UserContext} from '../services/userContext';

const Cart = ({navigation}: RootStackScreensProps<'Cart'>) => {
  const userInfo = useContext(UserContext);
  const voucherValue = userInfo?.voucher?.value ?? 0;

  const deliveryFee = 15;

  const removeVoucher = () => {
    userInfo?.removeVoucher();
  };

  const subTotal = useMemo(() => {
    return userInfo?.cartItem.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.price * currentValue.quantity;
    }, 0);
  }, [userInfo?.cartItem]);

  const totalAmount = useMemo(() => {
    // @ts-ignore
    return subTotal + deliveryFee - voucherValue;
  }, [subTotal, voucherValue]);

  if (userInfo?.cartItem.length === 0) {
    return (
      <Container
        header={
          <CustomHeader
            title="Cart"
            onLeftPress={() => navigation.navigate('Restaurant')}
          />
        }>
        <View style={styles.emptyCart}>
          <Text>Hungry?</Text>
          <Text>You havent added anything to your cart!</Text>
          <CustomButton
            onPress={() => navigation.goBack()}
            title="Browse"
            btnStyle={styles.browseBtn}
          />
        </View>
      </Container>
    );
  }

  return (
    <Container
      header={
        <CustomHeader
          title="Cart"
          onLeftPress={() => navigation.navigate('Restaurant')}
        />
      }
      footer={
        <View style={styles.footer}>
          <View style={styles.subTotal}>
            <Text style={styles.footerText}>Total</Text>
            <Text style={styles.footerText}>Tk {totalAmount}</Text>
          </View>

          <CustomButton
            onPress={() =>
              navigation.navigate('Checkout', {
                totalAmount: totalAmount,
                deliveryFee: deliveryFee,
                subTotal: subTotal,
              })
            }
            containerStyle={styles.btn}
            textStyle={styles.btnText}
            title="Review payment and address"
          />
        </View>
      }>
      <View style={styles.mid}>
        <View style={styles.card}>
          <Image
            style={styles.img}
            source={require('../assets/food_delivery.png')}
          />
          <View>
            <Text>Estimated delivery</Text>
            <Text style={styles.bold}>ASAP (40 min)</Text>
          </View>
        </View>
        <Spacer height={30} />
        {userInfo?.cartItem.map(e => (
          <CartCard
            name={e.name}
            id={e.id}
            price={e.price}
            quantity={e.quantity}
            variation={e.variation}
            compositeId={e.compositeId}
            key={e.compositeId}
          />
        ))}
        <Spacer height={10} />
        <CustomButton
          btnStyle={styles.addMoreBtnStyle}
          containerStyle={styles.addMoreBtnContainer}
          textStyle={styles.addMoreBtnText}
          title="Add more items"
        />
        <Spacer height={30} />
        <View style={styles.subTotal}>
          <Text style={styles.bold}>Subtotal</Text>
          <Text style={styles.bold}>Tk {subTotal}</Text>
        </View>
        <Spacer height={10} />

        <View style={styles.subTotal}>
          <Text>Delivery fee</Text>
          <Text>Tk {deliveryFee}</Text>
        </View>
        <Spacer height={10} />
        <View>
          {!userInfo?.voucher ? (
            <View style={styles.voucherBody}>
              <MaterialIcons name="redeem" color={'red'} size={20} />
              <Spacer height={0} width={10} />
              <CustomButton
                btnStyle={styles.addMoreBtnStyle}
                containerStyle={styles.addMoreBtnContainer}
                textStyle={styles.addMoreBtnText}
                onPress={() => navigation.navigate('Voucher')}
                title="Apply a voucher"
              />
            </View>
          ) : (
            <View style={styles.voucher}>
              <View style={styles.voucherBody}>
                <MaterialIcons name="loyalty" color={'red'} size={20} />
                <Spacer height={0} width={10} />
                <Text style={styles.voucherNameText}>
                  {userInfo.voucher.name}
                </Text>
                <Spacer height={0} width={10} />
                <CustomButton
                  btnStyle={styles.addMoreBtnStyle}
                  containerStyle={styles.addMoreBtnContainer}
                  textStyle={styles.addMoreBtnText}
                  onPress={removeVoucher}
                  title="Remove"
                />
              </View>
              <View style={styles.voucherValue}>
                <Text style={styles.voucherValueText}>
                  - Tk {userInfo.voucher.value}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  mid: {padding: 5},
  btn: {
    backgroundColor: 'red',
    borderRadius: 5,
  },
  footer: {
    padding: 5,
    borderRadius: 5,
  },
  card: {
    borderColor: '#6b6b6b',
    borderRadius: 1,
    height: 80,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  img: {height: 50, width: 50, borderRadius: 20},
  subTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bold: {fontWeight: 'bold', color: 'black'},
  footerText: {fontWeight: 'bold', paddingVertical: 5, color: 'black'},
  addMoreBtnText: {color: 'red'},
  addMoreBtnStyle: {
    width: 'auto',
  },
  addMoreBtnContainer: {
    height: 25,
    paddingHorizontal: 0,
    width: 'auto',
    alignItems: 'flex-start',
  },
  voucher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  voucherBody: {flexDirection: 'row', alignItems: 'center'},
  voucherNameText: {color: 'black', fontWeight: 'bold'},
  voucherValueText: {color: 'red', fontWeight: 'bold'},
  voucherValue: {
    backgroundColor: '#deadad',
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: 6,
  },
  emptyCart: {justifyContent: 'center', alignItems: 'center', padding: 5},
  browseBtn: {
    backgroundColor: 'red',
    width: 80,
    marginVertical: 10,
    height: 30,
  },
  btnText: {color: 'white'},
});

export default Cart;
