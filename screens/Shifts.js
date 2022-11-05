import { View, Text,Modal} from 'react-native'
import React, { useState } from 'react'
import { Box, Button, Heading, useColorMode, useTheme } from 'native-base'
import { Calendar, CalendarList ,CalendarProvider} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
AsyncStorage.getItem('shifts')
    .then((result)=>{
        console.log("result=",result)
        if(result!==null){
            setShifts(JSON.parse(result))
          }else{
            setShifts({});
          }
    }).catch(error=>console.log(error))
const Shifts = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
    const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
    const workout = { key: 'workout', color: 'green' };
    const [shiftType,setShiftType]=useState(false)
    const [selectedDay,setSelectedDay]=useState("");
    const [shifts,setShifts]=useState({});
    const today="2022-11-01"
    const {
        colors
      } = useTheme();
      var s;
    
    const persistShifts = (shifts) => {
        AsyncStorage.setItem('shifts',JSON.stringify(shifts))
        .then(()=>{
        })
        .catch((error)=>{
          console.log(error)
        })
      }
    return (
        <Box bg={colorMode === 'dark' ? 'black' : 'white'} pt={12}>
            <Heading p={3} mx={2}>
                Shifts
            </Heading>
            
            <CalendarList
                markingType={'multi-dot'}
                markedDates={shifts}
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={false}
                onDayPress={(day) => {
                    setShiftType(true)
                    setSelectedDay(day.dateString)
                    
                }}
            />
            
            <Modal
            transparent={true}
            visible={shiftType}
            >
                <View style={style.containerPopUp}>
                    <View style={style.popup}>
                    <View style={style.close}>   
                        <Button variant='outline' size='sm' onPress={() => {
                            setShiftType(false)
                            console.log(selectedDay)
                            }}>
                                Close
                                </Button>
                            <Button onPress={()=>{
                                s=shifts
                                s[selectedDay]={selected: true, marked: true, selectedColor:colors['green'][300],type:"Long"}
                                setShifts(s)
                                // persistShifts(shifts)
                                setShiftType(false)
                            }} style={style.options} bg={colors['green'][300]}  variant="subtle">Long Day</Button>
                            <Button style={style.options} onPress={()=>{
                                s=shifts
                                s[selectedDay]={selected: true, marked: true, selectedColor:colors['secondary'][300],type:"Early"}
                                setShifts(s)
                                // persistShifts(shifts)
                                setShiftType(false)
                            }} bg={colors['secondary'][300]} variant="subtle">Early</Button>
                            <Button style={style.options} onPress={()=>{
                                s=shifts
                                s[selectedDay]={selected: true, marked: true, selectedColor:colors['violet'][300],type:"Late"}
                                setShifts(s)
                                // persistShifts(shifts)
                                setShiftType(false)
                            }} bg={colors['violet'][300]} variant="subtle">Late</Button>
                            <Button style={style.options} onPress={()=>{
                                s=shifts
                                s[selectedDay]={selected: true, marked: true, selectedColor:colors['dark'][300],type:"Night"}
                                setShifts(s)
                                // persistShifts(shifts)
                                setShiftType(false)
                            }} bg={colors['dark'][300]} backgroundColor={colors['dark'][300]} variant="subtle">Night</Button>
                    </View>
                    </View> 
                </View>
            </Modal>
        </Box>
    )
}
export default Shifts
const style = {
    containerPopUp:{
        backgroundColor:"#000000aa",
        flex:1,
    },
    popup:{
        justifyContent:"center",
        backgroundColor:"white",
        margin:100,
        alignItems:"center",
        marginTop:250,
        marginBottom:250,
        padding:30,
        borderRadius:40,
        flex:1
    },
    options:{
        marginTop:20
    }
  }