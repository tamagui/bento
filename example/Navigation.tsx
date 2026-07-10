import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from './features/home/screen'
import { ComponentScreen } from './features/component/screen'
import { ColorSchemeToggle } from './features/home/ColorSchemeToggle'

const Stack = createNativeStackNavigator<{
  home: undefined
  component: {
    id: string
  }
}>()

export function Navigation() {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Bento Components',
          headerRight() {
            return <ColorSchemeToggle />
          },
        }}
      />
      <Stack.Screen
        name="component"
        component={ComponentScreen}
        options={({ route }) => ({
          // "settings-cells" -> "Settings Cells"
          title: (route.params?.id ?? 'Component')
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' '),
          headerRight() {
            return <ColorSchemeToggle />
          },
        })}
      />
    </Stack.Navigator>
  )
}
