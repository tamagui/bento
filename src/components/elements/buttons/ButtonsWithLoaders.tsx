import { Button, Spinner, View, YStack } from 'tamagui'

/** ------ EXAMPLE ------ */
export function ButtonsWithLoaders() {
  return (
    <YStack gap="$3.5" $group-window-gtSm={{ flexDirection: 'row' }}>
      <View gap="$2">
        <Button theme="blue" gap="$2">
          <Spinner
            transition="bouncy"
            enterStyle={{
              scale: 0,
            }}
            exitStyle={{
              scale: 0,
            }}
          />
          <Button.Text>Themed</Button.Text>
        </Button>

        <Button theme="red" gap="$2">
          <Spinner
            transition="bouncy"
            enterStyle={{
              scale: 0,
            }}
            exitStyle={{
              scale: 0,
            }}
          />
          <Button.Text>Themed</Button.Text>
        </Button>

        <Button theme="green" gap="$2">
          <Spinner
            transition="bouncy"
            enterStyle={{
              scale: 0,
            }}
            exitStyle={{
              scale: 0,
            }}
          />
          <Button.Text>Themed</Button.Text>
        </Button>

        <Button theme="purple" gap="$2">
          <Spinner
            transition="bouncy"
            enterStyle={{
              scale: 0,
            }}
            exitStyle={{
              scale: 0,
            }}
          />
          <Button.Text>Themed</Button.Text>
        </Button>

        <Button theme="pink" gap="$2">
          <Spinner
            transition="bouncy"
            enterStyle={{
              scale: 0,
            }}
            exitStyle={{
              scale: 0,
            }}
          />
          <Button.Text>Themed</Button.Text>{' '}
        </Button>

        <Button theme="yellow" gap="$2">
          <Spinner
            transition="bouncy"
            enterStyle={{
              scale: 0,
            }}
            exitStyle={{
              scale: 0,
            }}
          />
          <Button.Text>Themed</Button.Text>
        </Button>

        <Button theme="orange" gap="$2">
          <Spinner
            transition="bouncy"
            enterStyle={{
              scale: 0,
            }}
            exitStyle={{
              scale: 0,
            }}
          />
          <Button.Text>Themed</Button.Text>
        </Button>
      </View>

      <View gap="$2">
        <Button gap="$2">
          <Spinner
            transition="bouncy"
            enterStyle={{
              scale: 0,
            }}
            exitStyle={{
              scale: 0,
            }}
          />
          <Button.Text>Active</Button.Text>
        </Button>

        <Button disabled opacity={0.5} gap="$2">
          <Spinner
            transition="bouncy"
            enterStyle={{
              scale: 0,
            }}
            exitStyle={{
              scale: 0,
            }}
          />
          <Button.Text>Disabled</Button.Text>
        </Button>

        <Button theme="accent" gap="$2">
          <Spinner
            transition="bouncy"
            enterStyle={{
              scale: 0,
            }}
            exitStyle={{
              scale: 0,
            }}
          />
          <Button.Text>Theme inverse</Button.Text>
        </Button>

        <Button variant="outlined" gap="$2">
          <Spinner
            transition="bouncy"
            enterStyle={{
              scale: 0,
            }}
            exitStyle={{
              scale: 0,
            }}
          />
          <Button.Text>Outlined</Button.Text>
        </Button>

        <Button chromeless gap="$2">
          <Spinner
            transition="bouncy"
            enterStyle={{
              scale: 0,
            }}
            exitStyle={{
              scale: 0,
            }}
          />
          <Button.Text>Chromeless</Button.Text>{' '}
        </Button>
      </View>

      <View gap="$2">
        <Button size="$3" gap="$2">
          <Spinner
            transition="bouncy"
            enterStyle={{
              scale: 0,
            }}
            exitStyle={{
              scale: 0,
            }}
          />
          <Button.Text>Small</Button.Text>{' '}
        </Button>

        <Button gap="$2">
          <Spinner
            transition="bouncy"
            enterStyle={{
              scale: 0,
            }}
            exitStyle={{
              scale: 0,
            }}
          />
          <Button.Text>Normal</Button.Text>
        </Button>

        <Button size="$6" gap="$2">
          <Spinner
            transition="bouncy"
            enterStyle={{
              scale: 0,
            }}
            exitStyle={{
              scale: 0,
            }}
          />
          <Button.Text>Big</Button.Text>
        </Button>
      </View>
    </YStack>
  )
}

ButtonsWithLoaders.fileName = 'ButtonsWithLoaders'
