import { Info } from '@tamagui/lucide-icons-2'
import { Button, Label, Text, TextArea, View } from 'tamagui'

/** ------ EXAMPLE ------ */
export function TitleContentMessage() {
  return (
    <View
      flexDirection="column"
      width={400}
      maxW="100%"
      gap="$1"
      $group-window-sm={{
        py: '$6',
      }}
    >
      <Label htmlFor="title-content" size="$3">
        Title of Text Area
      </Label>
      <TextArea
        id="title-content"
        size="$3"
        fontWeight="300"
        height={180}
        placeholder="Your text here"
      />
      <View flexDirection="row" theme="alt1" mt="$2.5" items="center" gap="$2">
        <Info size={15} />
        <Text fontWeight="300" theme="alt2" fontSize="$2">
          some hints or info about text area
        </Text>
      </View>

      <Button theme="accent" mt="$3">
        <Button.Text>Submit</Button.Text>
      </Button>
    </View>
  )
}

TitleContentMessage.fileName = 'TitleContentMessage'
