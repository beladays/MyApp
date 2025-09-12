import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen 
        name="noticias" 
        options={{ 
          title: "Tela principal", 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          )
        }} 
      />
      <Tabs.Screen 
        name="favoritos" 
        options={{ 
          title: "Favoritos", 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          )
        }} 
      />
      <Tabs.Screen 
        name="perfil" 
        options={{ 
          title: "Perfil", 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )
        }} 
      />
    </Tabs>
  );
}
