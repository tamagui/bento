import { File, Share } from '@tamagui/lucide-icons'
import { Avatar, Button, Separator, Text, TextArea, View } from 'tamagui'

/** ------ EXAMPLE ------ */
export function AvatarNameContentAction() {
  return (
    <View
      borderWidth={1}
      borderColor="$color7"
      rounded="$true"
      background="$background"
      p="$true"
      width={500}
      maxW="100%"
      gap="$3.5"
      $group-window-sm={{
        my: '$6',
      }}
    >
      <View flexDirection="row" items="center" justify="flex-start" gap="$2">
        <Button chromeless circular>
          <Avatar circular size="$3.5">
            <Avatar.Image aria-label="user photo" src="https://i.pravatar.cc/123" />
            <Avatar.Fallback background="$color10" />
          </Avatar>
        </Button>
        <View flexDirection="column">
          <Text fontSize="$4" fontWeight="$2">
            Kimberly Doe
          </Text>
          <Text fontSize="$3" fontWeight="$1" theme="alt1">
            @doe
          </Text>
        </View>
      </View>
      <TextArea
        unstyled
        size="$4"
        fontWeight="300"
        px={0}
        height={100}
        rounded={0}
        placeholder="Write your comment"
      />
      <Separator theme="alt1" mx="$-3" />
      <View flexDirection="row" theme="accent" justify="space-between">
        <View gap="$2" flexDirection="row">
          <Button size="$3" chromeless>
            <Button.Icon>
              <Share size="$1" color="$color4" />
            </Button.Icon>
          </Button>
          <Button size="$3" chromeless>
            <Button.Icon>
              <File size="$1" color="$color4" />
            </Button.Icon>
          </Button>
        </View>
        <Button size="$3">
          <Button.Text>Comment</Button.Text>
        </Button>
      </View>
    </View>
  )
}

AvatarNameContentAction.fileName = 'AvatarNameContentAction'
