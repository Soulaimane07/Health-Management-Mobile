import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calories from '../Screens/Logged/Target/Calories';
import Steps from '../Screens/Logged/Target/Steps';

export default function TargetStack() {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="calories" component={Calories} />
        <Stack.Screen name="steps" component={Steps} />
    </Stack.Navigator>
  )
}