import { FileText, Trash2, UploadCloud } from '@tamagui/lucide-icons-2'
import type { DragEvent } from 'react'
import { useRef, useState } from 'react'
import { Platform } from 'react-native'
import { Button, Progress, Text, XStack, YStack } from 'tamagui'
import { HiddenFileInput } from './common/HiddenFileInput'

type UploadFile = { id: string; name: string; progress: number; size: string }

const initialFiles: UploadFile[] = [
  { id: 'brief', name: 'project-brief.pdf', progress: 100, size: '1.8 MB' },
  { id: 'assets', name: 'brand-assets.zip', progress: 72, size: '8.4 MB' },
]

function toUploadFile(file: File): UploadFile {
  return {
    id: `${file.name}-${file.lastModified}`,
    name: file.name,
    progress: 100,
    size: `${Math.max(file.size / 1_000_000, 0.1).toFixed(1)} MB`,
  }
}

export function DropZone() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState(initialFiles)
  const addFiles = (incoming: File[]) =>
    setFiles((current) => [...current, ...incoming.map(toUploadFile)])
  const webDropProps =
    Platform.OS === 'web'
      ? {
          onDragEnter: (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault()
            setDragging(true)
          },
          onDragOver: (event: DragEvent<HTMLDivElement>) => event.preventDefault(),
          onDragLeave: () => setDragging(false),
          onDrop: (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault()
            setDragging(false)
            addFiles(Array.from(event.dataTransfer.files))
          },
        }
      : {}

  return (
    <YStack width="100%" maxW={640} self="center" gap="$4">
      <YStack
        {...webDropProps}
        minH={220}
        items="center"
        justify="center"
        gap="$3"
        p="$6"
        rounded="$8"
        borderWidth={2}
        borderStyle="dashed"
        borderColor={dragging ? '$accentColor' : '$color6'}
        bg={dragging ? '$color3' : '$color2'}
        style={{ transition: 'background-color 180ms ease, border-color 180ms ease' }}
      >
        <UploadCloud size={38} color={dragging ? '$accentColor' : '$color10'} />
        <YStack items="center" gap="$1">
          <Text fontSize="$6" fontWeight="700" letterSpacing={0}>
            Drop files here
          </Text>
          <Text color="$color9" text="center" letterSpacing={0}>
            PDF, PNG, JPG or ZIP up to 20 MB
          </Text>
        </YStack>
        <Button
          onPress={() => inputRef.current?.click()}
          aria-label="Choose files to upload"
        >
          Choose files
        </Button>
        <HiddenFileInput inputRef={inputRef} multiple onFiles={addFiles} />
      </YStack>
      <YStack gap="$2">
        {files.map((file) => (
          <XStack
            key={file.id}
            items="center"
            gap="$3"
            p="$3"
            rounded="$5"
            borderWidth={1}
            borderColor="$borderColor"
            bg="$background"
          >
            <FileText size={22} color="$accentColor" />
            <YStack flex={1} gap="$2">
              <XStack justify="space-between" gap="$3">
                <Text flex={1} fontWeight="600" numberOfLines={1} letterSpacing={0}>
                  {file.name}
                </Text>
                <Text fontSize="$2" color="$color9">
                  {file.size}
                </Text>
              </XStack>
              <Progress value={file.progress} height={5} bg="$color4">
                <Progress.Indicator bg="$accentColor" />
              </Progress>
            </YStack>
            <Button
              circular
              size="$2.5"
              chromeless
              icon={Trash2}
              aria-label={`Remove ${file.name}`}
              onPress={() =>
                setFiles((current) => current.filter((item) => item.id !== file.id))
              }
            />
          </XStack>
        ))}
      </YStack>
    </YStack>
  )
}

DropZone.fileName = 'DropZone'
