import { Text, View, XStack, YStack, isWeb } from 'tamagui'

// deliberately fictional placeholder brands — swap in your real,
// permission-cleared customer logos
const brands = ['Acme Co', 'Northwind', 'Globex', 'Initech', 'Umbra', 'Foundry']

/** ------ EXAMPLE ------ */
export function LogoCloud() {
  return (
    <YStack
      render={isWeb ? 'section' : undefined}
      aria-label="Customer logos"
      gap="4"
      items="center"
      py="6"
      width="100%"
      maxW={880}
    >
      <Text fontSize="2" color="color8" letterSpacing={1} fontWeight="600">
        TRUSTED BY PRODUCT TEAMS EVERYWHERE
      </Text>
      <XStack flexWrap="wrap" gap="6" justify="center" items="center">
        {brands.map((b) => (
          <View key={b} opacity={0.55} py="2">
            <Text fontSize="6" fontWeight="800" color="color10" letterSpacing={-0.5}>
              {b}
            </Text>
          </View>
        ))}
      </XStack>
    </YStack>
  )
}

LogoCloud.fileName = 'LogoCloud'
