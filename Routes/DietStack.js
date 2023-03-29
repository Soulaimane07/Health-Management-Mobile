import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Categorie from '../screens/Logged/Diet/Categorie/Categorie';
import Page1 from '../screens/Logged/Diet/DietTest/Page1';
import Page2 from '../screens/Logged/Diet/DietTest/Page2';
import Page3 from '../screens/Logged/Diet/DietTest/Page3';
import FastingStack from './DietStacks.js/FastingStack';

export default function DietStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='categorie' screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="categorie" 
        component={Categorie} 
      />


      {/* * Diet Test  */}

      <Stack.Screen 
        name="dietTest" 
        component={Page1} 
      />
      <Stack.Screen 
        name="dietTest2" 
        component={Page2} 
      />
      <Stack.Screen 
        name="dietTest3" 
        component={Page3} 
      />

      {/* Diet Stacks */}
      
      <Stack.Screen 
        name="fastingStack" 
        component={FastingStack} 
      />
    </Stack.Navigator>
  )
}