import { Camera, UserRound } from '@tamagui/lucide-icons-2'
import { useRef, useState } from 'react'
import { Avatar, Button, Text, View, YStack } from 'tamagui'
import { HiddenFileInput } from './common/HiddenFileInput'

export function UploadAvatar() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [source, setSource] = useState<string>()
  const addImage = ([file]: File[]) => {
    if (file) setSource(URL.createObjectURL(file))
  }
  return (
    <YStack width="100%" maxW={420} self="center" items="center" gap="$4" p="$5">
      <View position="relative">
        <Avatar circular size="$10" borderWidth={1} borderColor="$borderColor">
          {source ? <Avatar.Image src={source} aria-label="Uploaded profile" /> : null}
          <Avatar.Fallback items="center" justify="center" bg="$color3">
            <UserRound size={42} color="$color9" />
          </Avatar.Fallback>
        </Avatar>
        <Button
          position="absolute"
          inset={0}
          circular
          opacity={0.82}
          bg="$color12"
          color="$color1"
          icon={Camera}
          aria-label="Upload profile photo"
          onPress={() => inputRef.current?.click()}
          hoverStyle={{ opacity: 0.95 }}
        />
      </View>
      <YStack items="center" gap="$1">
        <Text fontSize="$6" fontWeight="700" letterSpacing={0}>
          Profile photo
        </Text>
        <Text color="$color9" text="center" letterSpacing={0}>
          Square JPG or PNG, at least 400 × 400 px
        </Text>
      </YStack>
      <Button onPress={() => inputRef.current?.click()}>Choose photo</Button>
      <HiddenFileInput inputRef={inputRef} accept="image/*" onFiles={addImage} />
    </YStack>
  )
}

UploadAvatar.fileName = 'UploadAvatar'
