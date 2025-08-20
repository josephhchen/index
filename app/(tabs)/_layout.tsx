import { Tabs } from "expo-router";
import React from 'react';
import { HomeIcon, PenIcon } from "lucide-react-native";
import { useTheme } from "@/hooks/useTheme";

export default function TabLayout() {

    const { colors } = useTheme();
    
    return (
        <Tabs
        screenOptions={{
            tabBarActiveTintColor: colors.tint,
            tabBarInactiveTintColor: colors.tabIconDefault,
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: colors.background,
                borderTopWidth: 0
            },
        }}
        >
            <Tabs.Screen
            name="index"
            options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} style={{ top: 12 }} />      
            }}
            />

            <Tabs.Screen
            name="note"
            options={{
                title: 'Note',
                tabBarIcon: ({ color }) => <PenIcon size={28} color={color} style={{ top: 12 }} />
                
            }}
            />
        </Tabs>
    )
}