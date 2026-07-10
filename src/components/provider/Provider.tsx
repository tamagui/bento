import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { CurrentToast } from '../feedback/toasts/common/CurrentToast'
import type { TamaguiProviderProps } from 'tamagui'
import { TamaguiProvider } from 'tamagui'
import { SchemeProvider } from '@vxrn/color-scheme'

import config from '../../../tamagui.config'

export function Provider({ children, defaultTheme = 'light', ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  return (
    <TamaguiProvider config={config} defaultTheme={defaultTheme} {...rest}>
      <SchemeProvider>
        <ToastProvider swipeDirection="horizontal">
          {children}
          <CurrentToast />
          <ToastViewport left={0} right={0} top={10} />
        </ToastProvider>
      </SchemeProvider>
    </TamaguiProvider>
  )
}
