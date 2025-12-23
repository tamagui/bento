import { Image, Text, XStack, YStack } from 'tamagui'
import { insets } from '../constant'

type BottomViewProps = {
  title: string
}

const SIZE = 20
const SPACE = 4

export function BottomView({ title }: BottomViewProps) {
  return (
    <>
      <YStack position="absolute" p="$4" pb={insets.paddingBottom} b={0} l={0} r={0}>
        <YStack justify="center" items="center" gap="$3">
          <Text fontWeight="bold" textTransform="uppercase" fontFamily="$silkscreen">
            {title} BY
          </Text>

          <XStack self="center">
            <XStack
              gap={SPACE}
              data-tauri-drag-region
              position="relative"
              justify="center"
              items="center"
              mx={SPACE}
            >
              {logoWords.map((image, index) => (
                <ImageWord key={`path-${index}`} image={image} />
              ))}
            </XStack>
          </XStack>
        </YStack>
      </YStack>
    </>
  )
}

const ImageWord = ({ image }: { image: string }) => {
  return <Image objectFit="contain" src={image} width={SIZE} height={SIZE} />
}

const logoWords = [
  require('../assets/T.png'),
  require('../assets/A.png'),
  require('../assets/M.png'),
  require('../assets/A1.png'),
  require('../assets/G.png'),
  require('../assets/U.png'),
  require('../assets/I.png'),
]
