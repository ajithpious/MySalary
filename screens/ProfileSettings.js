import React from "react";
// import Images from '../config/Images';
import { Button, ScreenContainer, withTheme } from "@draftbit/ui";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useContext } from "react";
import { CredentialsContext } from "../components/CredentialsContext";
import { db } from "../firebase";
import { useEffect } from "react";
import { useState } from "react";
import { RadioButton , Button as PaperButton} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
const ProfileSettings = (props) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
    const navigation=useNavigation()
  const usersDB = db.collection("users");
  const [basicPay, setBasicPay] = useState();
  const [empType, setEmpType] = useState();
  const [weekHour, setWeekHour] = useState();

  const [creditcardnumber, setCreditcardnumber] = React.useState(undefined);
  const [expirymonth, setExpirymonth] = React.useState(undefined);
  const [expiryyear, setExpiryyear] = React.useState(undefined);
  const [cvc, setCvc] = React.useState(undefined);
  const { theme } = props;
  const getBasicPay = async () => {
    const user = usersDB.doc(storedCredentials);
    const data = await user.get();

    return data.data()["basicPay"];
  };
  const getWeekHour = async () => {
    const user = usersDB.doc(storedCredentials);
    const data = await user.get();

    return data.data()["weekHour"];
  };
  useEffect(() => {
    getBasicPay().then((basicPay) => {
      setBasicPay("" + basicPay);
    });
    getWeekHour().then((hour) => {
        console.log(hour)
        setWeekHour(""+weekHour)
      });

  }, []);
  const saveChanges=()=>{
    navigation.navigate('Home')
  }
  return (
    <ScreenContainer hasSafeArea={true} scrollable={true}>
      <KeyboardAvoidingView
        // style={styles.keyboardAvoidingViewEp}
        behavior="position"
        enabled={true}
        keyboardVerticalOffset={44}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView4R}
          showsHorizontalScrollIndicator={false}
          bounces={true}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.viewFS}>
            <Text
              style={StyleSheet.flatten([
                styles.textKo,
                theme.typography.headline4,
                { color: theme.colors.strong },
              ])}
            >
              Edit Your Details
            </Text>
            <Text
              style={StyleSheet.flatten([
                styles.textVq,
                theme.typography.subtitle1,
                { color: theme.colors.medium },
              ])}
            >
              Enter your Details
            </Text>
          </View>
          <View
            style={styles.viewMw}
            importantForAccessibility="auto"
            hitSlop={{}}
            pointerEvents="auto"
            accessible={true}
          >
            <View
              importantForAccessibility="auto"
              hitSlop={{}}
              pointerEvents="auto"
              accessible={true}
            >
              <Text
                style={StyleSheet.flatten([
                  styles.textKk,
                  theme.typography.caption,
                  { color: theme.colors.strong },
                ])}
                allowFontScaling={true}
                accessible={true}
                textBreakStrategy="highQuality"
                ellipsizeMode="tail"
              >
                Basic Payment Rate
              </Text>
              <View
                style={styles.viewDv}
                importantForAccessibility="auto"
                accessible={true}
                pointerEvents="auto"
                hitSlop={{}}
              >
                <TextInput
                  style={StyleSheet.flatten([
                    styles.textInputFa,
                    {
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.divider,
                      borderRadius: theme.borderRadius.global,
                      color: theme.colors.strong,
                    },
                  ])}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  allowFontScaling={true}
                  value={basicPay}
                  placeholderTextColor={theme.colors.medium}
                  placeholder="9.5"
                  onChangeText={(text) => setBasicPay(text)}
                  clearButtonMode="while-editing"
                  enablesReturnKeyAutomatically={true}
                  spellcheck={true}
                  returnKeyType="next"
                  textContentType="creditcardnumber"
                />
              </View>
            </View>
            <View
              importantForAccessibility="auto"
              hitSlop={{}}
              pointerEvents="auto"
              accessible={true}
            >
              <Text
                style={StyleSheet.flatten([
                  styles.textKk,
                  theme.typography.caption,
                  { color: theme.colors.strong },
                ])}
                allowFontScaling={true}
                accessible={true}
                textBreakStrategy="highQuality"
                ellipsizeMode="tail"
              >
                Employment Type
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignContent: "center" }}>
              <View style={{ flex: 1 }}>
                <RadioButton value="fulltime" onPress={()=>{setEmpType("fulltime")}} status={empType=="fulltime"?"checked":"unchecked"}/>
              </View>
              <View style={{ flex: 8, alignSelf: "center" }}>
                <Text>Full Time</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignContent: "center" }}>
              <View style={{ flex: 1 }}>
                <RadioButton value="partime" 
                onPress={()=>{setEmpType("partime")}}
                status={empType=="partime"?"checked":"unchecked"}
                />
              </View>
              <View style={{ flex: 8, alignSelf: "center" }}>
                <Text>Part-Time</Text>
              </View>
            </View>

            <View
              style={styles.viewUz}
              hitSlop={{}}
              accessible={true}
              importantForAccessibility="auto"
              pointerEvents="auto"
            >
              <View
                hitSlop={{}}
                pointerEvents="auto"
                importantForAccessibility="auto"
                accessible={true}
              >
                <Text
                  style={StyleSheet.flatten([
                    styles.textGi,
                    theme.typography.caption,
                    { color: theme.colors.strong },
                  ])}
                  allowFontScaling={true}
                  textBreakStrategy="highQuality"
                  ellipsizeMode="tail"
                  accessible={true}
                >
                  Weekly Hour
                </Text>
                <View
                  style={styles.viewMy}
                  importantForAccessibility="auto"
                  hitSlop={{}}
                  accessible={true}
                  pointerEvents="auto"
                >
                  <TextInput
                    style={StyleSheet.flatten([
                      styles.textInput49,
                      {
                        color: theme.colors.strong,
                        backgroundColor: theme.colors.background,
                        borderColor: theme.colors.divider,
                        borderRadius: theme.borderRadius.global,
                      },
                    ])}
                    value={weekHour}
                    onChangeText={(hour) => setWeekHour(hour)}
                    spellcheck={true}
                    allowFontScaling={true}
                    keyboardType="numeric"
                    placeholderTextColor={theme.colors.medium}
                    enablesReturnKeyAutomatically={true}
                    placeholder={weekHour}
                    autoCapitalize="none"
                    returnKeyType="next"
                    textContentType="number"
                    maxLength={2}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={styles.viewCe}
          hitSlop={{}}
          importantForAccessibility="auto"
          pointerEvents="auto"
          accessible={true}
        >
          <PaperButton
            style={StyleSheet.flatten([
              styles.buttonNM,
              { borderRadius: theme.borderRadius.global },
            ])}
            mode="contained"
            onPress={saveChanges}
          >
            Save Changes
          </PaperButton>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};
const styles = StyleSheet.create({
  textKk: {
    textTransform: "uppercase",
  },
  textGi: {
    textTransform: "uppercase",
  },
  textJM: {
    textTransform: "uppercase",
  },
  textH5: {
    textTransform: "uppercase",
  },
  scrollView4R: {
    flexGrow: 1,
  },
  buttonNM: {
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardAvoidingViewEp: {
    flexGrow: 1,
    justifyContent: "space-around",
  },
  textKo: {
    marginBottom: 6,
  },
  viewFS: {
    paddingRight: 32,
    paddingLeft: 32,
    paddingTop: 10,
    paddingBottom: 34,
  },
  textInputFa: {
    height: 54,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingLeft: 14,
    paddingRight: 14,
  },
  textInput49: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingLeft: 14,
    paddingRight: 14,
    height: 54,
    maxWidth: 90,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "left",
  },
  textInputUi: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingLeft: 14,
    paddingRight: 14,
    height: 54,
    maxWidth: 90,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "left",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  textInputF7: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "left",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingLeft: 14,
    paddingRight: 14,
    height: 54,
    maxWidth: 90,
  },
  viewDv: {
    paddingTop: 12,
    marginBottom: 12,
    paddingBottom: 12,
  },
  viewMy: {
    paddingBottom: 12,
    paddingTop: 12,
    marginBottom: 12,
  },
  viewHp: {
    paddingBottom: 12,
    paddingTop: 12,
    marginBottom: 12,
  },
  viewQT: {
    marginLeft: 24,
    marginRight: 24,
  },
  viewBh: {
    paddingBottom: 12,
    paddingTop: 12,
    marginBottom: 12,
  },
  viewUz: {
    width: "100%",
    flexDirection: "row",
    marginTop: 8,
  },
  viewMw: {
    paddingBottom: 14,
    paddingRight: 32,
    paddingLeft: 32,
  },
  viewCe: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 34,
    paddingTop: 14,
  },
  textVq: {
    textAlign: "left",
  },
  imageCk: {
    borderRightWidth: 1,
    marginBottom: 24,
    height: 190,
    width: "100%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    marginTop: 34,
  },
});
export default withTheme(ProfileSettings);
