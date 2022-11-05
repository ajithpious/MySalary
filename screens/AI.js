import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';
import { Box, Button, Divider, Heading, Text, HStack, List, ScrollView, Switch, useColorMode, useTheme, Fab, Icon, Stack, AspectRatio, Image, Center } from "native-base";
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
        App Name
      </Heading>
      <ScrollView contentContainerStyle={{ width: '100%' }}>
        {/* <Divider opacity={colorMode == 'dark' ? '0.4' : '1'} />
        <Fab renderInPortal={false} shadow={2} size="sm" placement="bottom-right" icon={colorMode == 'light' ?
          <Ionicons
            name="moon-sharp"
            size={24}
            onPress={toggleColorMode}
            color={colorMode == 'dark' ? 'white' : 'black'}
          /> : <Entypo
            name="light-up"
            size={24}
            onPress={toggleColorMode}
            color={colorMode == 'dark' ? 'white' : 'black'} />} />
        <Button size="sm" variant="subtle" onPress={handleLogout}>
          Log Out
        </Button>
        <Divider opacity={colorMode == 'dark' ? '0.4' : '1'} />
        <Divider mt={12} opacity={colorMode == 'dark' ? '0.4' : '1'} />
        <List
          divider={
            <Divider ml={16} opacity={colorMode == 'dark' ? '0.4' : '1'} />
          }
          px={3}
          // mt={12}
          py={0}
          // borderColor="red.200"
          borderWidth={0}
          borderRightWidth={0}
          w="100%"
        >
          {components.map((comp, index) => (
            <List.Item
              key={index}
              onPress={() =>
                navigation.navigate('component', { name: comp.name })
              }
              _hover={{ bg: 'coolGray.300' }}
            >
              <HStack space={3} py={1} alignItems="center" w="100%">
                <Box mr={4}>
                  <Entypo
                    name="circular-graph"
                    size={32}
                    color={colorMode === 'dark' ? 'white' : 'black'}
                  />
                </Box>

                <Text>{comp.name}</Text>
                <Box ml="auto">
                  <Icon
                    mr={2}
                    size="sm"
                    as={<MaterialCommunityIcons name="chevron-right" />}
                    color="coolGray.500"
                  />
                </Box>
              </HStack>
            </List.Item>
          ))}
        </List> */}
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
              My .....
            </Heading>
          </Stack>
        </Stack>
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
              sdv
            </Heading>
          </Stack>
        </Stack>
      </Box>
    </Box>
    </View>
        <Calendar
          markingType={'multi-dot'}
          markedDates={{
            '2017-10-25': { dots: [vacation, massage, workout], selected: true, selectedColor: 'red' },
            '2017-10-26': { dots: [massage, workout], disabled: true }
          }}
        />
      </ScrollView>
    </Box>
  )
}

const style2 = {
  container: {
    marginTop: 50,
    paddingLeft: 10,
    paddingRight: 10
  },
  space:{
    marginTop:10

  }
}