import { Tabs } from "expo-router";
import React from 'react';
import { HomeIcon, PenIcon } from "lucide-react-native";

export default function TabLayout() {
    
    return (
        <Tabs
        >
            <Tabs.Screen
            name="index"
            options={{
                title: 'Home',
                tabBarIcon: ({}) => <HomeIcon size={28} />
            }}
            />

            <Tabs.Screen
            name="note"
            options={{
                title: 'Note',
                tabBarIcon: ({}) => <PenIcon size={28} />
                
            }}
            />
        </Tabs>
    )
}