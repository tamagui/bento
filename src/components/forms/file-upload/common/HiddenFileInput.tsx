import { createElement, type ChangeEvent, type RefObject } from 'react'
import { Platform } from 'react-native'

export function HiddenFileInput({
  accept,
  inputRef,
  multiple,
  onFiles,
}: {
  accept?: string
  inputRef: RefObject<HTMLInputElement | null>
  multiple?: boolean
  onFiles: (files: File[]) => void
}) {
  if (Platform.OS !== 'web') return null
  return createElement('input', {
    ref: inputRef,
    type: 'file',
    accept,
    multiple,
    'aria-hidden': true,
    tabIndex: -1,
    style: { display: 'none' },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      onFiles(Array.from(event.target.files ?? []))
      event.target.value = ''
    },
  })
}
