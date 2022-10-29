import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';
import { Box, Button, Divider, Heading, Text, HStack, List, ScrollView, Switch, useColorMode, useTheme, Fab, Icon } from "native-base";
import { MaterialCommunityIcons, Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DatePicker } from 'react-native-week-month-date-picker';
import { addDays } from 'date-fns';
export default function AI() {

  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
  const navigation = useNavigation();
  const { colorMode, toggleColorMode } = useColorMode();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
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
        My App
      </Heading>
      <ScrollView contentContainerStyle={{ width: '100%' }}>
        <Divider opacity={colorMode == 'dark' ? '0.4' : '1'} />
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
        </List>

        <SafeAreaView>
          <DatePicker
            startDate={new Date()}
            maxFutureDays={90}
            markedDates={[new Date(), addDays(new Date(), 2)]}
            onDateChange={(date) => setSelectedDate(date)}
            theme={{
              primaryColor: 'purple',
            }}
          >
            <View>
              <Text>Timeslots</Text>
              <Text>{selectedDate.toString()}</Text>
            </View>
          </DatePicker>
        </SafeAreaView>
      </ScrollView>
    </Box>
  )
}

const style2 = {
  container: {
    marginTop: 50,
    paddingLeft: 10,
    paddingRight: 10
  }
}