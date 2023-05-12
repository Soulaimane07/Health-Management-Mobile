import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Days from '../../screens/Logged/Diet/Pages/Fasting/Days';
import Fasting from '../../screens/Logged/Diet/Pages/Fasting/Fasting';

export default function FastingStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='plans' screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="plans" 
          options={({headerShown: false})}
          component={Days} 
        />
        <Stack.Screen 
          name="fasting" 
          // options={({ route }) => ({ title: route.params.title, headerTitleAlign: 'center', headerTintColor: "white", headerStyle: {backgroundColor: '#655DBB'} })}
          component={Fasting} 
        />
    </Stack.Navigator>
  )
}
