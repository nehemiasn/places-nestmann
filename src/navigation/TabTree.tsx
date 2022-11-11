import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyProfile } from "../screens/MyProfile";
import { Favorites } from "../screens/Favorites";

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
    </StackTabTree.Navigator>
  );
}
