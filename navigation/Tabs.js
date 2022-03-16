import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Movies from '../screens/Movies'
import Search from '../screens/Search'
import Tv from '../screens/Tv'
import { View, Text } from 'react-native'

const Tab = createBottomTabNavigator()

const Tabs = () => (
    <Tab.Navigator
        initialRouteName='Search'
        screenOptions={{
            tabBarLabelStyle: { backgroundColor: "red" },
            tabBarActiveTintColor: "red",
            tabBarInactiveTintColor: "skyblue",
            tabBarStyle: { backgroundColor: "yellow" },
            headerTitleStyle: { color: "tomato" }
        }}
    >
        <Tab.Screen name="Movies" component={Movies} />
        <Tab.Screen name="Tv"
            component={Tv}
            options={{
                tabBarLabelStyle: { backgroundColor: "blue" },
                tabBarBadge: 5,
                headerRight: () => (

                    <View><Text>Hello</Text></View>
                )
            }}
        />
        <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
)
export default Tabs