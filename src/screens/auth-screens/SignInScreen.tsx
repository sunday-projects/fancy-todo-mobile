import React, { useState } from 'react';
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Paragraph,
  Button,
  Title,
  Subheading,
  Snackbar,
} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { RootStackParamList } from '@/types';
import { SignInForm } from '@/components';

export type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

// export type SignInScreenRouteProp = RouteProp<RootStackParamList, 'SignIn'>;

export interface ISignInScreenProps {
  navigation: SignInScreenNavigationProp;
  // route: SignInScreenRouteProp;
}

export default function SignInScreen({
  navigation,
}: // route,
ISignInScreenProps) {
  const [snackbar, setSnackbar] = useState<string>('');

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAwareScrollView style={styles.scrollView}>
          <View style={styles.wrapper}>
            <View style={styles.titleView}>
              <Title style={styles.title}>Welcome back!</Title>
              <Subheading style={styles.subTitle}>
                Glad to see you again.
              </Subheading>
            </View>
            <SignInForm setSnackbar={setSnackbar} />
            <View style={styles.suggestionView}>
              <Paragraph>Don't have an account?</Paragraph>
              <Button
                style={styles.suggestionButton}
                mode="text"
                accessibilityStates
                onPress={() => navigation.navigate('SignUp')}>
                Sign Up
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
      <Snackbar
        visible={snackbar.length > 0}
        onDismiss={() => setSnackbar('')}
        action={{
          label: 'Dismiss',
          onPress: () => setSnackbar(''),
        }}
        accessibilityStates>
        {snackbar}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  suggestionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('5%'),
  },
  suggestionButton: {
    marginLeft: wp('2%'),
  },
  titleView: {
    paddingBottom: hp('3%'),
  },
  title: {
    fontSize: hp('4%'),
  },
  subTitle: {},
  wrapper: {
    alignItems: 'center',
    flex: 1,
    paddingTop: hp('8%'),
    paddingBottom: hp('4%'),
  },
  scrollView: {
    backgroundColor: '#fff',
  },
});
