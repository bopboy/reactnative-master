import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Movies from '../screens/Movies'
import Search from '../screens/Search'
import Tv from '../screens/Tv'
import { useColorScheme } from 'react-native'
import { BLACK_COLOR, DARK_GREY, LIGHT_GERY, WHITE_COLOR, YELLOW_COLOR } from '../colors'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const Tabs = () => {
    const isDark = useColorScheme() === "dark"
    return (
        <Tab.Navigator
            sceneContainerStyle={{ backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR }}
            screenOptions={{
                tabBarStyle: { backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR },
                tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
                tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GERY,
                headerStyle: { backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR },
                headerTitleStyle: { color: isDark ? WHITE_COLOR : BLACK_COLOR },
                tabBarLabelStyle: {
                    marginTop: -5, fontSize: 12, fontWeight: "600"
                }
            }}
        >
            <Tab.Screen
                name="Movies" component={Movies}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        // console.log(focused, color, size)
                        return <Ionicons name="film-outline" color={color} size={size} />
                    }
                }}
            />
            <Tab.Screen
                name="TV" component={Tv}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        // console.log(focused, color, size)
                        return <Ionicons name="tv-outline" color={color} size={size} />
                    }
                }}
            />
            <Tab.Screen
                name="Search" component={Search}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        // console.log(focused, color, size)
                        return <Ionicons name="search-outline" color={color} size={size} />
                    }
                }}
            />
        </Tab.Navigator>
    )
}
export default Tabs