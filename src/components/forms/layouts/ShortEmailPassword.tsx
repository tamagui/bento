import { Lock, Mail } from '@tamagui/lucide-icons'
import { Button, View } from 'tamagui'
import { Input } from '../inputs/components/inputsParts'
import { FormCard } from './components/layoutParts'

/** -------- EXAMPLE ------------ */
export function ShortEmailPassword() {
  return (
    <FormCard
      rounded={20}
      borderColor="$borderColor"
      self="center"
      $group-window-sm={{
        minW: '100%',
        px: '$5',
        py: '$6',
      }}
    >
      <View flexDirection="column" gap="$5" items="center" minW={'100%'}>
        <View flexDirection="column" gap="$3" minW={'100%'}>
          <Input size="$4" minW="100%">
            <Input.Box>
              <Input.Icon>
                <Mail />
              </Input.Icon>
              <Input.Area pl={0} placeholder="Your Email" />
            </Input.Box>
          </Input>
          <Input size="$4" minW="100%">
            <Input.Box>
              <Input.Icon>
                <Lock />
              </Input.Icon>
              <Input.Area type="password" pl={0} placeholder="Password" />
            </Input.Box>
          </Input>
        </View>
        <View
          flexDirection="row"
          height="$3.5"
          gap="$4"
          justify="space-between"
          width="100%"
        >
          <Button flex={1} flexBasis={0}>
            <Button.Text>Back</Button.Text>
          </Button>

          <Button theme="accent" flex={1} flexBasis={0}>
            <Button.Text>Continue</Button.Text>
          </Button>
        </View>
      </View>
    </FormCard>
  )
}

ShortEmailPassword.fileName = 'ShortEmailPassword'
