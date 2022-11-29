import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { RadioButton, Button, Badge, DataTable } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import "intl";
import "intl/locale-data/jsonp/en"; // or any other locale you need
import {
  Box,
  Text,
  Heading,
  useColorMode,
  useTheme,
  StatusBar,
  useColorModeValue,
  Pressable,
  Center,
} from "native-base";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import { useContext } from "react";
import { CredentialsContext } from "./CredentialsContext";

const CustomTab = () => {
  const [checked, setChecked] = React.useState("first");
  const [shiftCount, setShiftCount] = useState({});
  const [shifts, setShifts] = useState({});
  const usersDB = db.collection("users");
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const [range, setRange] = React.useState({
    startDate: undefined,
    endDate: undefined,
  });
  useEffect(() => {
    getShifts().then((data) => {
      setShifts(data);
      // console.log(shifts)
    });
  }, []);
  useEffect(() => {
    calNumberOfShiftsOfRange();
  }, [open]);
  const getShifts = async () => {
    const user = usersDB.doc(storedCredentials);
    const data = await user.get();
    // console.log("inside functio=",data.data()['shifts'])
    if (data.data()["shifts"] == "" || data.data()["shifts"] === undefined) {
      return {};
    } else {
      // setShifts(data.data()['shifts'])
      return data.data()["shifts"];
    }
  };
  const formatDate = (date) => {
    if (date == undefined) {
      return "Pick Range";
    }
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  };
  const [open, setOpen] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );
  const calNumberOfShiftsOfRange = () => {
    console.log("shifts=", shifts);
    if (range["endDate"] == undefined || range["startDate"] == undefined) {
      setShiftCount({ long: 0, early: 0, late: 0, Night: 0 });
      return { long: 0, early: 0, late: 0, Night: 0 };
    }
    let shiftKeys = Object.keys(shifts);
    let filShiftKeys = shiftKeys.filter((e) => {
      var keyDate = new Date(e);
      var sDate = new Date(formatDate(range["startDate"]));
      var eDate = new Date(formatDate(range["endDate"]));
      if (keyDate >= sDate && keyDate <= eDate) {
        return true;
      }
    });
    console.log("filteed shifts=", filShiftKeys);
    var longCount = 0;
    var earlyCount = 0;
    var lateCount = 0;
    var nightCount = 0;
    for (const key of filShiftKeys) {
      if (shifts[key]["type"] == "Long") {
        longCount += 1;
      } else if (shifts[key]["type"] == "Early") {
        earlyCount += 1;
      } else if (shifts[key]["type"] == "Late") {
        lateCount += 1;
      } else if (shifts[key]["type"] == "Night") {
        nightCount += 1;
      }
    }
    setShiftCount({
      long: longCount,
      early: earlyCount,
      late: lateCount,
      Night: nightCount,
    });
    return shiftCount;
  };
  return (
    <View>
      <View style={[{ flexDirection: "row" }]}>
        <View style={[{ flex: 1, flexDirection: "row" }]}>
          <Heading size="md" p={3} mx={2}>
            Range of shifts
          </Heading>
        </View>
      </View>
      <View style={[{ flexDirection: "row", marginLeft: 20 }]}>
        <DataTable>
          {/* <DataTable.Header>
        <DataTable.Title>Dessert</DataTable.Title>
        <DataTable.Title numeric>Calories</DataTable.Title>
        <DataTable.Title numeric>Fat</DataTable.Title>
      </DataTable.Header> */}
          <DataTable.Row>
            <DataTable.Cell>
              <Heading size="xs">From: </Heading>
              {formatDate(range["startDate"])}
            </DataTable.Cell>
            <DataTable.Cell>
              <Heading size="xs">To: </Heading>
              {formatDate(range["endDate"])}
            </DataTable.Cell>
            <DataTable.Cell>
              <Button
                onPress={() => setOpen(true)}
                uppercase={false}
                mode="contained"
              >
                Pick range
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
      <View style={styles.calculateButton}>
        <Button
          onPress={calNumberOfShiftsOfRange}
          uppercase={false}
          mode="contained"
        >
          Calculate
        </Button>
      </View>
      <View>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>Long Day</DataTable.Cell>
            <DataTable.Cell>{shiftCount["long"]}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Early</DataTable.Cell>
            <DataTable.Cell>{shiftCount["early"]}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Late</DataTable.Cell>
            <DataTable.Cell>{shiftCount["late"]}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Night</DataTable.Cell>
            <DataTable.Cell>{shiftCount["Night"]}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
      <DatePickerModal
        locale="en"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm}
        // validRange={{
        //   startDate: new Date(2021, 1, 2),  // optional
        //   endDate: new Date(), // optional
        //   disabledDates: [new Date()] // optional
        // }}
        // onChange={} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // saveLabelDisabled={true} // optional, default is false
        // uppercase={false} // optional, default is true
        // label="Select period" // optional
        // startLabel="From" // optional
        // endLabel="To" // optional
        // animationType="slide" // optional, default is slide on ios/android and none on web
        // startYear={2000} // optional, default is 1800
        // endYear={2100} // optional, default is 2200
        // closeIcon="close" // optional, default is "close"
        // editIcon="pencil" // optional, default is "pencil"
        // calendarIcon="calendar" // optional, default is "calendar"
      />
    </View>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
    calculateButton:{
        padding:10,
        paddingLeft:50,
        paddingRight:50
    }
});
