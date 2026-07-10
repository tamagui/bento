import { Text, View, XStack, YStack } from 'tamagui'

const brands = ['Vercel', 'Linear', 'Raycast', 'Supabase', 'Expo', 'Shopify']

/** ------ EXAMPLE ------ */
export function LogoCloud() {
  return (
    <YStack gap="$4" items="center" py="$6" width="100%" maxW={880}>
      <Text fontSize="$2" color="$color9" letterSpacing={1} fontWeight="600">
        TRUSTED BY TEAMS AT
      </Text>
      <XStack flexWrap="wrap" gap="$6" justify="center" items="center">
        {brands.map((b) => (
          <View
            key={b}
            opacity={0.55}
            hoverStyle={{ opacity: 1 }}
            transition="200ms"
            py="$2"
          >
            <Text
              fontSize="$6"
              fontWeight="800"
              color="$color11"
              letterSpacing={-0.5}
            >
              {b}
            </Text>
          </View>
        ))}
      </XStack>
    </YStack>
  )
}

LogoCloud.fileName = 'LogoCloud'
