import { Cloud, FileText, Sparkles } from '@tamagui/lucide-icons-2'
import { toast } from 'tamagui'
import { Button, H2, Paragraph, View, XStack, YStack, isWeb } from 'tamagui'

export function EmptyStateIllustrated() {
  return (
    <YStack
      render={isWeb ? 'section' : undefined}
      aria-label="Empty workspace"
      width="100%"
      maxW={680}
      self="center"
      items="center"
      gap="4"
      p="8 @xs/window:5"
      rounded="10"
      borderWidth={1}
      borderColor="border-color"
      bg="color1"
      overflow="hidden"
    >
      <View width={220} height={150} items="center" justify="center" position="relative">
        <View
          position="absolute"
          width={180}
          height={110}
          rounded="10"
          bg="color3"
          rotate="-6deg"
        />
        <View
          position="absolute"
          width={180}
          height={110}
          rounded="10"
          borderWidth={1}
          borderColor="border-color"
          bg="background"
          items="center"
          justify="center"
        >
          <Cloud size={48} color="color8" />
          <FileText position="absolute" color="color10" size={28} />
        </View>
        <Sparkles position="absolute" t="1" r="1" color="color9" size={24} />
      </View>
      <H2 text="center">A clean canvas for your next idea</H2>
      <Paragraph text="center" color="color9" maxW={440}>
        Upload a document or start from a blank page. Everything stays organized in one
        workspace.
      </Paragraph>
      <XStack gap="3" flexWrap="wrap" justify="center">
        <Button
          theme="accent"
          onPress={() =>
            toast('New document', {
              description: 'Would open a blank document',
            })
          }
        >
          New document
        </Button>
        <Button
          variant="outlined"
          onPress={() => toast('Upload', { description: 'Would open the file picker' })}
        >
          Upload file
        </Button>
      </XStack>
    </YStack>
  )
}

EmptyStateIllustrated.fileName = 'EmptyStateIllustrated'
