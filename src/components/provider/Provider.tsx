import { ToastProvider, ToastViewport } from '@tamagui/toast'
import type { TamaguiProviderProps } from 'tamagui'
import { TamaguiProvider } from 'tamagui'
import { SchemeProvider } from '@vxrn/color-scheme'

import config from '../../../tamagui.config'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  return (
    <TamaguiProvider config={config} {...rest} defaultTheme="light">
      <SchemeProvider>
        <ToastProvider swipeDirection="horizontal">
          {children}
          <ToastViewport left={0} right={0} top={10} />
        </ToastProvider>
      </SchemeProvider>
    </TamaguiProvider>
  )
}
