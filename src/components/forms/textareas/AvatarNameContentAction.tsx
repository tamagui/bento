import { Avatar } from '../../BentoSkins'
import { File, Share } from '@tamagui/lucide-icons-2'
import { Button, Separator, Text, TextArea, View } from 'tamagui'

/** ------ EXAMPLE ------ */
export function AvatarNameContentAction() {
  return (
    <View
      borderWidth={1}
      borderColor="color6"
      rounded="true"
      background="background"
      p="true"
      width={500}
      maxW="100%"
      gap="4"
      my="@sm/window:6"
    >
      <View flexDirection="row" items="center" justify="flex-start" gap="2">
        <Button variant="quiet" circular>
          <Avatar circular size="10">
            <Avatar.Image aria-label="user photo" src="https://i.pravatar.cc/123" />
            <Avatar.Fallback background="color9" />
          </Avatar>
        </Button>
        <View flexDirection="column">
          <Text fontSize="4" fontWeight="2">
            Kimberly Doe
          </Text>
          <Text fontSize="3" fontWeight="1" theme="level2">
            @doe
          </Text>
        </View>
      </View>
      <TextArea
        placeholderTextColor="color8"
        bg="transparent"
        borderWidth={0}
        size="4"
        fontWeight="300"
        px={0}
        height={100}
        rounded={0}
        placeholder="Write your comment"
      />
      <Separator theme="level2" mx="-3" />
      <View flexDirection="row" theme="accent" justify="space-between">
        <View gap="2" flexDirection="row">
          <Button size="3" variant="quiet">
            <Button.Icon>
              <Share size="1" color="color4" />
            </Button.Icon>
          </Button>
          <Button size="3" variant="quiet">
            <Button.Icon>
              <File size="1" color="color4" />
            </Button.Icon>
          </Button>
        </View>
        <Button size="3">
          <Button.Text>Comment</Button.Text>
        </Button>
      </View>
    </View>
  )
}

AvatarNameContentAction.fileName = 'AvatarNameContentAction'
