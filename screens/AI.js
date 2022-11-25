import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';
import { Box, Button, Divider, Heading, Text, HStack, List, ScrollView, Switch, useColorMode, useTheme, Fab, Icon, Stack, AspectRatio, Image, Center, Pressable } from "native-base";
import { MaterialCommunityIcons, Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DatePicker } from 'react-native-week-month-date-picker';
import { addDays } from 'date-fns';
import { Calendar } from 'react-native-calendars';
export default function AI() {

  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
  const navigation = useNavigation();
  const { colorMode, toggleColorMode } = useColorMode();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
  const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
  const workout = { key: 'workout', color: 'green' };
  const handleLogout = () => {
    AsyncStorage.removeItem('loginCredentials')
      .then(() => {
        setStoredCredentials('');
      })
      .catch((error) => console.log(error))
  }
  const components = [
    {
      name: 'Alert',
    },
    {
      name: 'Avatar',
    },
    {
      name: 'Badge',
    }]
  return (
    <Box bg={colorMode === 'dark' ? 'black' : 'white'} pt={12}>
      <Heading p={3} mx={2}>
        MyRota
      </Heading>
      <ScrollView contentContainerStyle={{ width: '100%' }}>
        <Box alignItems="center">
      <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
      <Pressable onPress={()=>{
        navigation.navigate('Shifts')
        }}>
        <Box>
            <Image source={require('../config/Images/shifts_image.png')} resizeMode="cover" height={200} alt="image" />
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              Shifts
            </Heading>
          </Stack>
        </Stack>
        </Pressable>
      </Box>
    </Box>
    
    <View style={style2.space}>
    <Box alignItems="center">
      <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{
            uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
          }} alt="image" />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              Availability
            </Heading>
          </Stack>
        </Stack>
      </Box>
    </Box>
    </View>
      </ScrollView>
    </Box>
  )
}

const style2 = {
  container: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  space:{
    marginTop:10

  }
}