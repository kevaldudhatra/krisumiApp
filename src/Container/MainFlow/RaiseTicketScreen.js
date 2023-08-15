import React, {useState} from 'react';
import {Colors, Fonts, Images} from '../../Theme/Index';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

export default function RaiseTicketScreen() {
  const [name, setName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [email, setEmail] = useState();
  const [custId, setCustId] = useState();
  const [query, setQuery] = useState();

  return (
    <KeyboardAwareScrollView style={{flex: 1, backgroundColor: Colors.white}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.mainContainer}>
            <View style={styles.ticketHeader}>
              <TouchableOpacity
                onPress={() => {
                  Actions.pop();
                }}>
                <View style={styles.backButton}>
                  <Image
                    style={styles.backIcon}
                    source={Images.backwardIcon}></Image>
                </View>
              </TouchableOpacity>
              <Text style={styles.ticketHeaderText}>Raise A Ticket</Text>
              <View style={styles.blankButton}></View>
            </View>

            <Text style={styles.textInputHeaderText}>Registered Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => {
                setName(text);
              }}
              value={name}
              placeholderTextColor={Colors.borderColor}
              placeholderStyle={{fontFamily: Fonts.DMSansRegular}}
              placeholder="Enter Your Name"
              keyboardType="default"
            />

            <Text style={styles.textInputHeaderText}>Phone No</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => {
                setPhoneNo(text);
              }}
              value={phoneNo}
              placeholderTextColor={Colors.borderColor}
              placeholderStyle={{fontFamily: Fonts.DMSansRegular}}
              placeholder="+91"
              keyboardType="name-phone-pad"
            />

            <Text style={styles.textInputHeaderText}>Email Address</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => {
                setEmail(text);
              }}
              value={email}
              placeholderTextColor={Colors.borderColor}
              placeholderStyle={{fontFamily: Fonts.DMSansRegular}}
              placeholder="Enter Your Email"
              keyboardType="email-address"
            />

            <Text style={styles.textInputHeaderText}>Customer ID</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => {
                setCustId(text);
              }}
              value={custId}
              placeholderTextColor={Colors.borderColor}
              placeholderStyle={{fontFamily: Fonts.DMSansRegular}}
              placeholder="Enter Your ID"
              keyboardType="default"
            />

            <Text style={styles.textInputHeaderText}>Query</Text>
            <View style={styles.queryInput}>
              <TextInput
                onChangeText={text => {
                  setQuery(text);
                }}
                value={query}
                placeholderTextColor={Colors.borderColor}
                placeholderStyle={{fontFamily: Fonts.DMSansRegular}}
                multiline={true}
                placeholder="Enter Your Query"
                keyboardType="default"
              />
            </View>

            <TouchableOpacity onPress={() => {}}>
              <View style={styles.ticketButton}>
                <Text style={styles.ticketButtonText}>Generate A Ticket</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Image style={styles.topImage} source={Images.topBackgroung}></Image>
          <Image
            style={styles.bottomImage}
            source={Images.bottomBackgroung}></Image>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.lightOrange,
    justifyContent: 'center',
  },
  backIcon: {
    height: 15,
    width: 15,
    alignSelf: 'center',
    tintColor: Colors.arrowColor,
  },
  ticketHeaderText: {
    fontSize: 20,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    alignSelf: 'center',
  },
  blankButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  textInputHeaderText: {
    fontSize: 16,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  textInput: {
    height: 70,
    borderWidth: 1,
    borderRadius: 35,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderColor: Colors.borderColor,
  },
  queryInput: {
    height: 145,
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderColor: Colors.borderColor,
  },
  ticketButton: {
    height: 70,
    backgroundColor: Colors.lightOrange,
    borderRadius: 35,
    marginTop: 25,
    marginBottom: 5,
    alignContent: 'center',
    justifyContent: 'center',
  },
  ticketButtonText: {
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.arrowColor,
    alignSelf: 'center',
  },
  topImage: {
    position: 'absolute',
    top: -25,
    right: 5,
    height: 130,
    width: 50,
    resizeMode: 'contain',
  },
  bottomImage: {
    height: 150,
    width: '75%',
    resizeMode: 'cover',
  },
});
