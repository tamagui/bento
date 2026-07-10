import { FileText, RefreshCw, Trash2, UploadCloud, X } from '@tamagui/lucide-icons-2'
import type { DragEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { Button, Text, View, XStack, YStack, isWeb } from 'tamagui'
import {
  formatBytes,
  toPickedFile,
  useFilePicker,
  validateFiles,
  type PickedFile,
} from './common/HiddenFileInput'

const LIMITS = {
  extensions: ['pdf', 'png', 'jpg', 'jpeg', 'zip'],
  maxBytes: 20 * 1024 * 1024,
  maxFiles: 8,
}

type UploadStatus = 'uploading' | 'complete' | 'failed'
type UploadFile = PickedFile & { progress: number; status: UploadStatus }

const initialFiles: UploadFile[] = [
  {
    id: 'brief',
    name: 'project-brief.pdf',
    size: 1_800_000,
    type: 'application/pdf',
    progress: 100,
    status: 'complete',
  },
]

export function DropZone() {
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState(initialFiles)
  const [rejections, setRejections] = useState<string[]>([])
  // dragenter/leave fire per child; a depth counter stops flicker
  const dragDepth = useRef(0)
  const uploadCount = useRef(0)

  const addFiles = (incoming: PickedFile[]) => {
    const { accepted, rejected } = validateFiles(incoming, LIMITS, files.length)
    setRejections(rejected)
    if (!accepted.length) return
    setFiles((current) => [
      ...current,
      ...accepted.map((file) => ({ ...file, progress: 0, status: 'uploading' as const })),
    ])
  }

  // mock upload engine: files progress to done; every third one fails so
  // the retry path is demonstrable
  useEffect(() => {
    if (!files.some((f) => f.status === 'uploading')) return
    const timer = setInterval(() => {
      setFiles((current) =>
        current.map((file) => {
          if (file.status !== 'uploading') return file
          const next = Math.min(100, file.progress + 16)
          if (next >= 60 && file.progress < 60) {
            uploadCount.current += 1
            if (uploadCount.current % 3 === 0) return { ...file, status: 'failed' }
          }
          return next >= 100
            ? { ...file, progress: 100, status: 'complete' }
            : { ...file, progress: next }
        })
      )
    }, 220)
    return () => clearInterval(timer)
  }, [files])

  const retry = (id: string) =>
    setFiles((current) =>
      current.map((file) =>
        file.id === id ? { ...file, progress: 0, status: 'uploading' } : file
      )
    )

  const remove = (id: string) =>
    setFiles((current) => current.filter((item) => item.id !== id))

  const picker = useFilePicker({ multiple: true, onFiles: addFiles })

  const webDropProps =
    Platform.OS === 'web'
      ? {
          onDragEnter: (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault()
            dragDepth.current += 1
            setDragging(true)
          },
          onDragOver: (event: DragEvent<HTMLDivElement>) => event.preventDefault(),
          onDragLeave: () => {
            dragDepth.current = Math.max(0, dragDepth.current - 1)
            if (dragDepth.current === 0) setDragging(false)
          },
          onDrop: (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault()
            dragDepth.current = 0
            setDragging(false)
            addFiles(Array.from(event.dataTransfer.files).map(toPickedFile))
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
        style={
          isWeb
            ? { transition: 'background-color 180ms ease, border-color 180ms ease' }
            : undefined
        }
      >
        <UploadCloud
          size={38}
          color={dragging ? '$accentColor' : '$color10'}
          aria-hidden
        />
        <YStack items="center" gap="$1">
          <Text fontSize="$6" fontWeight="700" letterSpacing={0}>
            {isWeb ? 'Drop files here' : 'Add your files'}
          </Text>
          <Text color="$color9" text="center" letterSpacing={0}>
            PDF, PNG, JPG or ZIP up to 20 MB · max 8 files
          </Text>
        </YStack>
        <Button onPress={picker.pick} aria-label="Choose files to upload">
          Choose files
        </Button>
        {picker.inputElement}
      </YStack>
      {rejections.length > 0 && (
        <YStack
          role="alert"
          gap="$1"
          p="$3"
          rounded="$5"
          borderWidth={1}
          borderColor="$red7"
          bg="$red2"
        >
          {rejections.map((reason) => (
            <Text key={reason} fontSize="$2" color="$red10">
              {reason}
            </Text>
          ))}
        </YStack>
      )}
      <YStack gap="$2" role={isWeb ? 'list' : undefined} aria-label="Uploads">
        {files.map((file) => (
          <XStack
            key={file.id}
            role={isWeb ? 'listitem' : undefined}
            items="center"
            gap="$3"
            p="$3"
            rounded="$5"
            borderWidth={1}
            borderColor={file.status === 'failed' ? '$red7' : '$borderColor'}
            bg="$background"
          >
            <FileText
              size={22}
              color={file.status === 'failed' ? '$red10' : '$accentColor'}
              aria-hidden
            />
            <YStack flex={1} gap="$2">
              <XStack justify="space-between" gap="$3">
                <Text flex={1} fontWeight="600" numberOfLines={1} letterSpacing={0}>
                  {file.name}
                </Text>
                <Text
                  fontSize="$2"
                  color={file.status === 'failed' ? '$red10' : '$color9'}
                >
                  {file.status === 'failed'
                    ? 'Upload failed'
                    : file.status === 'uploading'
                      ? `${file.progress}%`
                      : formatBytes(file.size)}
                </Text>
              </XStack>
              <View
                role="progressbar"
                aria-label={`Uploading ${file.name}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={file.progress}
                height={5}
                rounded={999}
                bg="$color4"
                overflow="hidden"
              >
                <View
                  height="100%"
                  width={`${file.progress}%`}
                  rounded={999}
                  bg={file.status === 'failed' ? '$red9' : '$accentColor'}
                />
              </View>
            </YStack>
            {file.status === 'failed' && (
              <Button
                circular
                size="$2.5"
                chromeless
                icon={RefreshCw}
                hitSlop={isWeb ? undefined : 10}
                aria-label={`Retry ${file.name}`}
                onPress={() => retry(file.id)}
              />
            )}
            <Button
              circular
              size="$2.5"
              chromeless
              icon={file.status === 'uploading' ? X : Trash2}
              hitSlop={isWeb ? undefined : 10}
              aria-label={
                file.status === 'uploading'
                  ? `Cancel ${file.name}`
                  : `Remove ${file.name}`
              }
              onPress={() => remove(file.id)}
            />
          </XStack>
        ))}
      </YStack>
    </YStack>
  )
}

DropZone.fileName = 'DropZone'
