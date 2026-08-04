import { Avatar } from '../../BentoSkins'
import { Camera, UserRound } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Text, View, YStack } from 'tamagui'
import {
  useFilePicker,
  useObjectUrlCleanup,
  type PickedFile,
} from './common/HiddenFileInput'

export function UploadAvatar() {
  const [source, setSource] = useState<string>()
  useObjectUrlCleanup([source])

  const addImage = ([file]: PickedFile[]) => {
    if (file?.uri) setSource(file.uri)
  }

  const picker = useFilePicker({ accept: 'image/*', onFiles: addImage })

  return (
    <YStack width="100%" maxW={420} self="center" items="center" gap="4" p="5">
      <View position="relative">
        <Avatar circular size="10" borderWidth={1} borderColor="border-color">
          {source ? <Avatar.Image src={source} aria-label="Uploaded profile" /> : null}
          <Avatar.Fallback items="center" justify="center" bg="color3">
            <UserRound size={42} color="color8" />
          </Avatar.Fallback>
        </Avatar>
        <Button
          position="absolute"
          inset={0}
          opacity="0.82 hover:0.95"
          bg="color11"
          color="color1"
          circular
          icon={Camera}
          aria-label="Upload profile photo"
          onPress={picker.pick}
        />
      </View>
      <YStack items="center" gap="1">
        <Text fontSize="6" fontWeight="700" letterSpacing={0}>
          Profile photo
        </Text>
        <Text color="color8" text="center" letterSpacing={0}>
          Square JPG or PNG, at least 400 × 400 px
        </Text>
      </YStack>
      <Button onPress={picker.pick}>Choose photo</Button>
      {picker.inputElement}
    </YStack>
  )
}

UploadAvatar.fileName = 'UploadAvatar'
