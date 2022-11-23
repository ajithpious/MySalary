import { View, Modal, Alert, Dimensions, Animated } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Text, Heading, useColorMode, useTheme, StatusBar, useColorModeValue, Pressable, Center } from 'native-base'
import { Calendar, CalendarList, CalendarProvider } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { CredentialsContext, DataContext } from '../components/CredentialsContext';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { DataTable } from 'react-native-paper';
import { TabView, SceneMap } from 'react-native-tab-view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createAppContainer } from "react-navigation";



const Shifts = () => {
    const navigation = useNavigation()
    const { colorMode, toggleColorMode } = useColorMode();
    const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
    const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
    const workout = { key: 'workout', color: 'green' };
    const [shiftType, setShiftType] = useState(false)
    const [selectedDay, setSelectedDay] = useState("");
    const [shifts, setShifts] = useState({});
    const [shiftCount, setShiftCount] = useState({});
    const [month,setMonth]=useState((new Date()).getMonth()+1)
    const [hasUnsavedChanges, setUnsavedChanges] = useState(false);
    const { shiftData, setShiftData } = useContext(DataContext)
    const today = "2022-11-01"
    const usersDB = db.collection('users');
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const Tab = createMaterialTopTabNavigator();
    // const Navigator = createAppContainer();
    // const Navigator = createAppContainer(TabNavigator);


    // console.log(storedCredentials)

    // console.log("shiftdata=", shiftData)
    const {
        colors
    } = useTheme();
    var s;
    useEffect(() => {
        console.log("in useeffect")
        getShifts().then((data) => {
            setShifts(Object.assign(data, shifts))
            console.log(shifts)
            console.log(month)
        })
        // calNumberOfShiftsOfMonth()   
    },[]
    );
    useEffect(()=>{
        calNumberOfShiftsOfMonth()
    },[shifts,month,selectedDay])
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            if (!hasUnsavedChanges) {
                // If we don't have unsaved changes, then we don't need to do anything
                return;
            }
            if (e['data']['action']['type'] == "NAVIGATE") {
                return;
            }

            // Prevent default behavior of leaving the screen
            e.preventDefault();

            // Prompt the user before leaving the screen
            Alert.alert(
                'Discard changes?',
                'You have unsaved changes. Are you sure to discard them and leave the screen?',
                [
                    { text: "Don't leave", style: 'cancel', onPress: () => { } },
                    {
                        text: 'Discard',
                        style: 'destructive',
                        // If the user confirmed, then we dispatch the action we blocked earlier
                        // This will continue the action that had triggered the removal of the screen
                        onPress: () => {
                            // setShifts({})
                            navigation.navigate('Home')
                        },
                    },
                ]
            );
        })

    }, [navigation, hasUnsavedChanges]);
    const Tab1 = () => {
        return (
            <View>
                <TableExample/>
            </View>
        )
    }
    const Tab2 = () => {
        return (<View>
            <Text>efvejrhfv</Text>
        </View>)
    }
    const persistShifts = async () => {
        // setShifts(Object.assign(shiftData,shifts))
        AsyncStorage.setItem('shifts', JSON.stringify(shifts))
            .then(async () => {
                setShiftData(shifts)

                const user = usersDB.doc(storedCredentials)
                const data = await user.get()
                // console.log("type=",typeof data.data())
                if (data.data()['shifts'] == "" || data.data()['shifts'] === undefined) {
                    Object.assign({}, shifts)
                    await user.set(
                        Object.assign(data.data(), { 'shifts': Object.assign({}, shifts) })
                    );
                }
                else {
                    await user.set(
                        // Object.assign(data.data(),{'shifts':Object.assign(data.data()['shifts'],shifts)})
                        Object.assign(data.data(), { 'shifts': shifts })
                    );
                }
                console.log("d=", Object.assign(data.data()['shifts'], shifts))


            })
            .catch((error) => {
                console.log(error)
            })
        navigation.navigate('Home')

    }
    const calNumberOfShiftsOfMonth=()=>{
        let shiftKeys=Object.keys(shifts)
        let filShiftKeys=shiftKeys.filter((e)=>{
            var [_,mon]=e.split("-")
            if(mon==month){
                return true
            }
        })
        var longCount=0;
        var earlyCount=0;
        var lateCount=0;
        var nightCount=0;
        for(const key of filShiftKeys){
            if(shifts[key]['type']=='Long'){
                longCount+=1;
            }else if(shifts[key]['type']=='Early'){
                earlyCount+=1;
            }else if(shifts[key]['type']=='Late'){
                lateCount+=1;
            }else if(shifts[key]['type']=='Night'){
                nightCount+=1;
            }

        }
        setShiftCount({'long':longCount,'early':earlyCount,'late':lateCount,'Night':nightCount})
        return shiftCount
    }
    const TableExample = () => {
        return (
            <DataTable style={style.container}>
                <DataTable.Header style={style.tableHeader}>
                    <DataTable.Title>Shift</DataTable.Title>
                    <DataTable.Title>Number</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell>Long Day</DataTable.Cell>
                    <DataTable.Cell>{shiftCount['long']}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Early</DataTable.Cell>
                    <DataTable.Cell>{shiftCount['early']}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Late</DataTable.Cell>
                    <DataTable.Cell>{shiftCount['late']}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Night</DataTable.Cell>
                    <DataTable.Cell>{shiftCount['Night']}</DataTable.Cell>
                </DataTable.Row>


            </DataTable>
        );
    };
    const getShifts = async () => {
        const user = usersDB.doc(storedCredentials)
        const data = await user.get()
        // console.log("inside functio=",data.data()['shifts'])
        if (data.data()['shifts'] == "" || data.data()['shifts'] === undefined) {
            return {}
        } else {
            // setShifts(data.data()['shifts'])
            return data.data()['shifts']
        }

    }
    return (
        <Box bg={colorMode === 'dark' ? 'black' : 'white'} pt={12}>
            <View style={[{ flexDirection: 'row' }]}>
                <View style={[{ flex: 1, flexDirection: 'row' }]}>
                    <Heading p={3} mx={2}>
                        Shifts
                    </Heading>
                </View>
                <View style={[{ justifyContent: 'space-between' }]}>
                    <TouchableOpacity>
                        <Text onPress={persistShifts} p={3} mx={2}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <Calendar
                markingType={'multi-dot'}
                markedDates={shifts}
                // Object.assign(getShifts(),shifts)
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={false}
                onMonthChange={(month) => {
                    console.log(month['month'])
                    setMonth(month['month'])
                }}
                onDayPress={(day) => {
                    setShiftType(true)
                    setSelectedDay(day.dateString)

                }}
            />
            <View>
                <NavigationContainer independent={true}>
                    <Tab.Navigator style={{ minHeight: 1000 }}
                     screenOptions={{
                        activeTintColor: 'green',
                        tabBarLabelStyle: { fontSize: 12, textTransform: 'none' },
                        style: {
                            backgroundColor: 'white'
                        }
                    }}>
                        <Tab.Screen name="This Month" component={Tab1} />
                        <Tab.Screen name="Custom Date" component={Tab2} />
                    </Tab.Navigator>
                </NavigationContainer>
            </View>

            <Modal
                transparent={true}
                visible={shiftType}
            >
                <View style={style.containerPopUp}>
                    <View style={style.popup}>
                        <View style={style.close}>
                            <Button variant='outline' size='sm' onPress={() => {
                                setShiftType(false)
                                // console.log(selectedDay)
                            }}>
                                Close
                            </Button>
                            <Button onPress={() => {
                                s = shifts
                                s[selectedDay] = { selected: true, marked: true, selectedColor: colors['green'][300], type: "Long" }
                                setShifts(s)
                                setUnsavedChanges(true)
                                // persistShifts(shifts)
                                setShiftType(false)

                            }} style={style.options} bg={colors['green'][300]} variant="subtle">
                                <Text>Long Day</Text></Button>
                            <Button style={style.options} onPress={() => {
                                s = shifts
                                s[selectedDay] = { selected: true, marked: true, selectedColor: colors['secondary'][300], type: "Early" }
                                setShifts(s)
                                // persistShifts(shifts)
                                setUnsavedChanges(true)
                                setShiftType(false)
                            }} bg={colors['secondary'][300]} variant="subtle">
                                <Text >Early</Text></Button>
                            <Button style={style.options} onPress={() => {
                                s = shifts
                                s[selectedDay] = { selected: true, marked: true, selectedColor: colors['violet'][300], type: "Late" }
                                setShifts(s)
                                // persistShifts(shifts)
                                setUnsavedChanges(true)
                                setShiftType(false)
                            }} bg={colors['violet'][300]} variant="subtle">
                                <Text >Late</Text></Button>
                            <Button style={style.options} onPress={() => {
                                s = shifts
                                s[selectedDay] = { selected: true, marked: true, selectedColor: colors['dark'][300], type: "Night" }
                                setShifts(s)
                                // persistShifts(shifts)
                                setUnsavedChanges(true)
                                setShiftType(false)
                            }} bg={colors['dark'][300]} backgroundColor={colors['dark'][300]} variant="subtle">
                                <Text color={"white"}>Night</Text>
                            </Button>
                            <Button style={style.options} onPress={() => {
                                s = shifts
                                delete s[selectedDay]
                                setShifts(s)
                                setUnsavedChanges(true)
                                console.log("clear=", shifts)
                                setShiftType(false)
                            }} bg={colors['red'][300]} backgroundColor={colors['red'][300]} variant="subtle">
                                <Text >Clear</Text></Button>
                        </View>
                    </View>
                </View>
            </Modal>

        </Box>
    )

}
export default Shifts
const style = {
    containerPopUp: {
        backgroundColor: "#000000aa",
        flex: 1,
    },
    popup: {
        justifyContent: "center",
        backgroundColor: "white",
        margin: 100,
        alignItems: "center",
        marginTop: 200,
        marginBottom: 200,
        padding: 30,
        borderRadius: 40,
        flex: 1
    },
    options: {
        marginTop: 20
    },
    tableHeader: {
        backgroundColor: '#DCDCDC',
    }
}