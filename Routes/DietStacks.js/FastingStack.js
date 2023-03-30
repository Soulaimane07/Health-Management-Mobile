import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Days from '../../screens/Logged/Diet/Pages/Fasting/Days';

export default function FastingStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='categorie' screenOptions={{ headerShown: true }}>
        <Stack.Screen 
            name="days" 
            options={({ route }) => ({ title: route.params.PageTitle, headerTintColor: "white", headerStyle: {backgroundColor: '#655DBB'} })}
            component={Days} 
        />
    </Stack.Navigator>
  )
}