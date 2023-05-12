import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Categorie from '../screens/Logged/Diet/Categorie/Categorie';
import FastingStack from './DietStacks.js/FastingStack';

export default function DietStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='categorie' screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="categorie" 
        component={Categorie} 
      />


      {/* Diet Stacks */}
      
      <Stack.Screen 
        name="fastingStack" 
        component={FastingStack} 
      />
    </Stack.Navigator>
  )
}