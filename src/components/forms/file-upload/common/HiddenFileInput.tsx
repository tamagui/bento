import { createElement, useEffect, useRef, type ChangeEvent, type ReactNode } from 'react'
import { Platform } from 'react-native'

export type PickedFile = {
  id: string
  name: string
  /** bytes */
  size: number
  type: string
  /** object URL on web; bundled/sample uri elsewhere */
  uri?: string
}

export type FileLimits = {
  /** lowercase extensions without dots, e.g. ['pdf', 'png'] */
  extensions?: string[]
  maxBytes?: number
  maxFiles?: number
}

export const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** enforce the limits the UI claims — for drops and browsing alike */
export function validateFiles(
  files: PickedFile[],
  limits: FileLimits,
  currentCount: number
) {
  const accepted: PickedFile[] = []
  const rejected: string[] = []
  for (const file of files) {
    const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
    if (limits.extensions && !limits.extensions.includes(extension)) {
      rejected.push(
        `${file.name}: only ${limits.extensions.join(', ').toUpperCase()} allowed`
      )
      continue
    }
    if (limits.maxBytes && file.size > limits.maxBytes) {
      rejected.push(`${file.name}: larger than ${formatBytes(limits.maxBytes)}`)
      continue
    }
    if (limits.maxFiles && currentCount + accepted.length >= limits.maxFiles) {
      rejected.push(`${file.name}: limit of ${limits.maxFiles} files reached`)
      continue
    }
    accepted.push(file)
  }
  return { accepted, rejected }
}

let nativePickCounter = 0

/**
 * cross-platform picker. web renders a real hidden input; native falls back
 * to sample files so every action still works — swap in
 * expo-document-picker / expo-image-picker in your app.
 */
export function useFilePicker({
  accept,
  multiple,
  onFiles,
}: {
  accept?: string
  multiple?: boolean
  onFiles: (files: PickedFile[]) => void
}): { pick: () => void; inputElement: ReactNode } {
  const inputRef = useRef<HTMLInputElement | null>(null)

  if (Platform.OS !== 'web') {
    return {
      pick: () => {
        nativePickCounter += 1
        const image = accept?.includes('image')
        onFiles([
          {
            id: `native-sample-${nativePickCounter}`,
            name: image
              ? `photo-${nativePickCounter}.jpg`
              : `document-${nativePickCounter}.pdf`,
            size: 1_400_000 + nativePickCounter * 250_000,
            type: image ? 'image/jpeg' : 'application/pdf',
            uri: image
              ? `https://picsum.photos/seed/upload${nativePickCounter}/400/300`
              : undefined,
          },
        ])
      },
      inputElement: null,
    }
  }

  return {
    pick: () => inputRef.current?.click(),
    inputElement: createElement('input', {
      ref: inputRef,
      type: 'file',
      accept,
      multiple,
      'aria-hidden': true,
      tabIndex: -1,
      style: { display: 'none' },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        onFiles(Array.from(event.target.files ?? []).map(toPickedFile))
        event.target.value = ''
      },
    }),
  }
}

export const toPickedFile = (file: File): PickedFile => ({
  id: `${file.name}-${file.lastModified}-${file.size}`,
  name: file.name,
  size: file.size,
  type: file.type,
  uri: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
})

/** revoke object URLs when previews are removed or the component unmounts */
export function useObjectUrlCleanup(uris: (string | undefined)[]) {
  const previous = useRef<Set<string>>(new Set())
  useEffect(() => {
    const current = new Set(uris.filter((u): u is string => !!u?.startsWith('blob:')))
    for (const uri of previous.current) {
      if (!current.has(uri)) URL.revokeObjectURL(uri)
    }
    previous.current = current
  }, [uris])
  useEffect(
    () => () => {
      for (const uri of previous.current) URL.revokeObjectURL(uri)
    },
    []
  )
}
