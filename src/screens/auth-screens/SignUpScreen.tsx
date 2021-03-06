import React, { useState } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Button,
  Paragraph,
  Title,
  Subheading,
  Snackbar,
} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { RootStackParamList } from '@/types';
import { SignUpForm } from '@/components';

export type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

// export type SignUpScreenRouteProp = RouteProp<RootStackParamList, 'SignUp'>;

export interface ISignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
  // route: SignUpScreenRouteProp;
}

export default ({ navigation /*route*/ }: ISignUpScreenProps) => {
  const [snackbar, setSnackbar] = useState('');

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAwareScrollView style={styles.scrollView}>
          <View style={styles.wrapper}>
            <View style={styles.titleView}>
              <Title style={styles.title}>Create a new account.</Title>
              <Subheading style={styles.subTitle}>
                It's always been free.
              </Subheading>
            </View>
            <SignUpForm setSnackbar={setSnackbar} />
            <View style={styles.suggestionView}>
              <Paragraph>Already have an account?</Paragraph>
              <Button
                style={styles.suggestionButton}
                mode="text"
                accessibilityStates
                onPress={() => navigation.navigate('SignIn')}>
                Sign In
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
};

const styles = StyleSheet.create({
  suggestionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3%'),
  },
  suggestionButton: {
    marginLeft: wp('2%'),
  },
  wrapper: {
    alignItems: 'center',
    flex: 1,
    paddingTop: hp('8%'),
    paddingBottom: hp('4%'),
  },
  titleView: {
    paddingBottom: hp('3%'),
  },
  title: {
    fontSize: hp('4%'),
  },
  subTitle: {},
  scrollView: {
    backgroundColor: '#fff',
  },
});
