import { ImagePlus, Trash2 } from '@tamagui/lucide-icons-2'
import { useRef, useState } from 'react'
import { Button, Image, Text, View, XStack, YStack } from 'tamagui'
import { HiddenFileInput } from './common/HiddenFileInput'

type Preview = {
  id: string
  name: string
  source?: string
  color: '$blue6' | '$orange6' | '$purple6' | '$color4'
}

const initial: Preview[] = [
  { id: 'one', name: 'Ocean blue', color: '$blue6' },
  { id: 'two', name: 'Warm coral', color: '$orange6' },
  { id: 'three', name: 'Soft violet', color: '$purple6' },
]

export function UploadMultiple() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [previews, setPreviews] = useState(initial)
  const addImages = (files: File[]) =>
    setPreviews((current) => [
      ...current,
      ...files.map((file) => ({
        id: `${file.name}-${file.lastModified}`,
        name: file.name,
        source: URL.createObjectURL(file),
        color: '$color4' as const,
      })),
    ])

  return (
    <YStack width="100%" maxW={700} self="center" gap="$4">
      <YStack gap="$1">
        <Text fontSize="$6" fontWeight="700" letterSpacing={0}>
          Gallery images
        </Text>
        <Text color="$color9" letterSpacing={0}>
          Add up to eight product photos.
        </Text>
      </YStack>
      <XStack flexWrap="wrap" gap="$3">
        {previews.map((preview) => (
          <View
            key={preview.id}
            width={148}
            height={128}
            rounded="$6"
            overflow="hidden"
            bg={preview.color}
          >
            {preview.source ? (
              <Image src={preview.source} width="100%" height="100%" objectFit="cover" />
            ) : (
              <View flex={1} items="center" justify="center">
                <ImagePlus size={28} color="$color11" />
                <Text mt="$2" fontSize="$2" color="$color11" letterSpacing={0}>
                  {preview.name}
                </Text>
              </View>
            )}
            <Button
              position="absolute"
              t="$2"
              r="$2"
              circular
              size="$2.5"
              icon={Trash2}
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
          rounded="$6"
          borderWidth={2}
          borderStyle="dashed"
          borderColor="$color6"
          bg="transparent"
          icon={ImagePlus}
          aria-label="Add gallery images"
          onPress={() => inputRef.current?.click()}
        >
          Add images
        </Button>
      </XStack>
      <HiddenFileInput
        inputRef={inputRef}
        accept="image/*"
        multiple
        onFiles={addImages}
      />
    </YStack>
  )
}

UploadMultiple.fileName = 'UploadMultiple'
