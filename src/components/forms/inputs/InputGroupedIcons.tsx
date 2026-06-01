import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from '@tamagui/lucide-icons-2'
import type { SizeTokens } from 'tamagui'
import { View } from 'tamagui'
import { Input } from './components/inputsParts'

/** ------ EXAMPLE ------ */
export function InputGroupedIconsExample({ size = '$4' }: { size?: SizeTokens }) {
  return (
    <View flexDirection="column" justify="center" items="center">
      <Input size={size} minW="100%">
        <Input.Box gap="$1">
          <Input.Section>
            <Input.Button>
              <Input.Icon>
                <ChevronFirst />
              </Input.Icon>
            </Input.Button>
          </Input.Section>

          <Input.Section>
            <Input.Button>
              <Input.Icon>
                <ChevronLeft />
              </Input.Icon>
            </Input.Button>
          </Input.Section>

          <Input.Section>
            <Input.Area
              focusStyle={{
                outlineOffset: 1,
              }}
              placeholder="Page number"
            />
          </Input.Section>

          <Input.Section>
            <Input.Button>
              <Input.Icon>
                <ChevronRight />
              </Input.Icon>
            </Input.Button>
          </Input.Section>

          <Input.Section>
            <Input.Button>
              <Input.Icon>
                <ChevronLast />
              </Input.Icon>
            </Input.Button>
          </Input.Section>
        </Input.Box>
      </Input>
    </View>
  )
}

InputGroupedIconsExample.fileName = 'InputGroupedIcons'
