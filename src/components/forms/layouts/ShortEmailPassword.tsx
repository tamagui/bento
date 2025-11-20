import { Button, Theme, View } from 'tamagui'
import { Mail, Lock } from '@tamagui/lucide-icons'
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
              <Input.Area secureTextEntry pl={0} placeholder="Password" />
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
          <Theme inverse>
            <Button flex={1} flexBasis={0}>
              <Button.Text>Continue</Button.Text>
            </Button>
          </Theme>
        </View>
      </View>
    </FormCard>
  )
}

ShortEmailPassword.fileName = 'ShortEmailPassword'
