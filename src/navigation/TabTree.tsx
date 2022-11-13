import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyProfile } from "../screens/MyProfile";
import { Favorites } from "../screens/Favorites";
import { MyPlaces } from "../screens/MyPlaces";
import { AddPlace } from "../screens/AddPlace";

const StackTabTree = createNativeStackNavigator();

export function TabTreeNavigator() {
  return (
    <StackTabTree.Navigator>
      <StackTabTree.Screen
        options={{ headerShown: false }}
        name="MyProfile"
        component={MyProfile as any}
      />
      <StackTabTree.Screen
        options={{
          title: "Mis favoritos",
        }}
        name="Favorites"
        component={Favorites as any}
      />
      <StackTabTree.Screen
        options={{
          title: "Mis lugares",
        }}
        name="MyPlaces"
        component={MyPlaces as any}
      />
      <StackTabTree.Screen
        options={{
          title: "Agregar lugar",
        }}
        name="AddPlace"
        component={AddPlace as any}
      />
    </StackTabTree.Navigator>
  );
}
