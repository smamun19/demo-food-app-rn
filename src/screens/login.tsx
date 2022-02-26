import React, {useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {Text} from 'react-native-elements';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/TextInput';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RootStackScreensProps} from '../navigators/root-stack';

const Login = ({navigation}: RootStackScreensProps<'Login'>) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.KeyboardAwareContainer}>
        <View style={styles.inputContainer}>
          <CustomInput
            inputStyle={styles.textInput}
            title="Email"
            placeholder="Enter Your Email Address"
            value={email}
            onChangeText={setEmail}
          />
          <CustomInput
            title="Password"
            placeholder="Enter Your Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <View style={styles.signUp}>
            <Text style={styles.text2}>New to Foddie?</Text>
            <CustomButton
              title="Sign Up"
              btnStyle={styles.signUpBtn}
              textStyle={styles.btnText2}
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
          <View>
            <CustomButton
              title="Forgot Password"
              textStyle={styles.btnText2}
              btnStyle={styles.forgotBtn}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView>
        <View style={styles.btnView}>
          <CustomButton
            title="Continue"
            btnStyle={styles.btn}
            textStyle={styles.btnText}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  KeyboardAwareContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  btn: {
    width: '100%',
    backgroundColor: 'grey',
    borderRadius: 100,
  },
  btnView: {
    flexDirection: 'row',
  },
  signUp: {
    flexDirection: 'row',
    alignItems: 'baseline',
    width: '50%',
  },
  signUpBtn: {
    width: '40%',
    marginEnd: 110,
  },
  btnText: {
    color: 'white',
  },
  btnText2: {
    color: '#65a6f0',
  },
  forgotBtn: {
    width: '40%',
    marginStart: 14,
    marginBottom: 40,
  },
  forgotBtnArea: {},
  text2: {
    marginLeft: 36,
  },
  textInput: {},
});

export default Login;
