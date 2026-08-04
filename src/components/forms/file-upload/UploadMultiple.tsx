import { ImagePlus, Trash2 } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Image, Text, View, XStack, YStack, isWeb } from 'tamagui'
import {
  useFilePicker,
  useObjectUrlCleanup,
  validateFiles,
  type PickedFile,
} from './common/HiddenFileInput'

const LIMITS = { maxFiles: 8 }

type Preview = {
  id: string
  name: string
  source?: string
  color: 'blue-300' | 'orange-300' | 'purple-300' | 'color4'
}

const initial: Preview[] = [
  { id: 'one', name: 'Ocean blue', color: 'blue-300' },
  { id: 'two', name: 'Warm coral', color: 'orange-300' },
  { id: 'three', name: 'Soft violet', color: 'purple-300' },
]

export function UploadMultiple() {
  const [previews, setPreviews] = useState(initial)
  const [rejection, setRejection] = useState('')

  // revoke object URLs when previews are removed or on unmount
  useObjectUrlCleanup(previews.map((p) => p.source))

  const addImages = (files: PickedFile[]) => {
    const { accepted, rejected } = validateFiles(files, LIMITS, previews.length)
    setRejection(rejected[0] ?? '')
    setPreviews((current) => [
      ...current,
      ...accepted.map((file) => ({
        id: file.id,
        name: file.name,
        source: file.uri,
        color: 'color4' as const,
      })),
    ])
  }

  const picker = useFilePicker({
    accept: 'image/*',
    multiple: true,
    onFiles: addImages,
  })

  return (
    <YStack width="100%" maxW={700} self="center" gap="4">
      <YStack gap="1">
        <Text fontSize="6" fontWeight="700" letterSpacing={0}>
          Gallery images
        </Text>
        <Text color="color8" letterSpacing={0}>
          Add up to eight product photos.
        </Text>
      </YStack>
      {!!rejection && (
        <Text role="alert" fontSize="2" color="red-600">
          {rejection}
        </Text>
      )}
      <XStack
        flexWrap="wrap"
        gap="3"
        role={isWeb ? 'list' : undefined}
        aria-label="Gallery previews"
      >
        {previews.map((preview) => (
          <View
            key={preview.id}
            role={isWeb ? 'listitem' : undefined}
            width={148}
            height={128}
            rounded="6"
            overflow="hidden"
            bg={preview.color}
          >
            {preview.source ? (
              <Image
                src={preview.source}
                width="100%"
                height="100%"
                objectFit="cover"
                aria-label={preview.name}
              />
            ) : (
              <View flex={1} items="center" justify="center">
                <ImagePlus size={28} color="color10" aria-hidden />
                <Text mt="2" fontSize="2" color="color10" letterSpacing={0}>
                  {preview.name}
                </Text>
              </View>
            )}
            <Button
              position="absolute"
              t="2"
              r="2"
              circular
              size="8"
              icon={Trash2}
              hitSlop={isWeb ? undefined : 10}
              aria-label={`Remove ${preview.name}`}
              onPress={() =>
                setPreviews((current) => current.filter((item) => item.id !== preview.id))
              }
            />
          </View>
        ))}
        <Button
          width={148}
          height={128}
          rounded="6"
          borderWidth={2}
          borderStyle="dashed"
          borderColor="color6"
          bg="transparent"
          icon={ImagePlus}
          aria-label="Add gallery images"
          onPress={picker.pick}
        >
          Add images
        </Button>
      </XStack>
      {picker.inputElement}
    </YStack>
  )
}

UploadMultiple.fileName = 'UploadMultiple'
