import { Baby } from '@tamagui/lucide-icons'
import { useId, useState } from 'react'
import { Button, Label, Switch, Text, View } from 'tamagui'

/** ------ EXAMPLE ------ */
export function IconTitleSwitch() {
  const uniqueId = useId()
  const [checked, setChecked] = useState(true)

  return (
    <Button
      flexDirection="row"
      maxW="100%"
      borderColor="$borderColor"
      borderWidth={1}
      px="$4"
      py="$3"
      $group-window-sm={{ mt: '$6', mx: '$5' }}
      rounded="$3"
      width={400}
      height="auto"
      items="center"
      gap="$2.5"
      theme="surface1"
      animation="medium"
      onPress={() => setChecked(!checked)}
    >
      <Baby size="$2" color="$color11" />
      <View flexDirection="column">
        <Label size="$1.5" htmlFor={uniqueId + 'switch'}>
          Title here
        </Label>
        <Text theme="alt1">Your description here</Text>
      </View>
      <Switch
        id={uniqueId + 'switch'}
        checked={checked}
        onCheckedChange={setChecked}
        marginLeft="auto"
        size="$2"
        backgroundColor={checked ? '$color10' : '$color5'}
      >
        <Switch.Thumb borderColor="$borderColor" animation="200ms" bg="$color1" />
      </Switch>
    </Button>
  )
}

IconTitleSwitch.fileName = 'IconTitleSwitch'
