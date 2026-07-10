import { Gauge, Moon, Smartphone, Sparkles, Split, Wand2 } from '@tamagui/lucide-icons-2'
import { H2, Text, View, XStack, YStack } from 'tamagui'

const features = [
  {
    icon: Gauge,
    title: 'Compiler-fast',
    body: 'Styles extract to atomic CSS at build time — near-zero runtime.',
  },
  {
    icon: Smartphone,
    title: 'Truly universal',
    body: 'One component tree renders native on iOS, Android, and the web.',
  },
  {
    icon: Moon,
    title: 'Dark mode built in',
    body: 'Token-driven themes swap without a flash, on every platform.',
  },
  {
    icon: Split,
    title: 'Adaptive by design',
    body: 'Dialogs become sheets, menus become action sheets — automatically.',
  },
  {
    icon: Wand2,
    title: 'Animations that feel right',
    body: 'Spring-driven presets shared across CSS, Reanimated, and Moti.',
  },
  {
    icon: Sparkles,
    title: 'Premium components',
    body: 'A growing catalog of composed, production-ready patterns.',
  },
]

/** ------ EXAMPLE ------ */
export function FeatureGrid() {
  return (
    <YStack gap="$6" py="$8" px="$4" width="100%" maxW={980} items="center">
      <YStack gap="$2" items="center" maxW={560}>
        <Text fontSize="$3" fontWeight="700" color="$color10" letterSpacing={1}>
          WHY TAMAGUI
        </Text>
        <H2 size="$9" text="center" color="$color12">
          Everything you need to ship
        </H2>
      </YStack>
      <XStack flexWrap="wrap" gap="$4" justify="center">
        {features.map((f) => (
          <YStack
            key={f.title}
            width={290}
            $group-window-sm={{ width: '100%' }}
            p="$4"
            gap="$3"
            rounded="$6"
            bg="$color1"
            borderWidth={1}
            borderColor="$color4"
            hoverStyle={{ borderColor: '$color6', y: -2 }}
            transition="200ms"
          >
            <View
              width={38}
              height={38}
              rounded="$4"
              bg="$color3"
              items="center"
              justify="center"
            >
              <f.icon size={18} color="$color11" />
            </View>
            <Text fontWeight="700" fontSize="$4" color="$color12">
              {f.title}
            </Text>
            <Text fontSize="$3" lineHeight="$4" color="$color10">
              {f.body}
            </Text>
          </YStack>
        ))}
      </XStack>
    </YStack>
  )
}

FeatureGrid.fileName = 'FeatureGrid'
