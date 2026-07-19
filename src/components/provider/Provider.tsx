import { Toast } from '@tamagui/toast'
import { renderBentoToast } from '../feedback/toasts/common/CurrentToast'
import type { TamaguiProviderProps } from 'tamagui'
import { TamaguiProvider, isWeb } from 'tamagui'
import { SchemeProvider } from '@vxrn/color-scheme'

import config from '../../../tamagui.config'

export function Provider({
  children,
  defaultTheme = 'light',
  ...rest
}: Omit<TamaguiProviderProps, 'config'>) {
  return (
    <TamaguiProvider config={config} defaultTheme={defaultTheme} {...rest}>
      <SchemeProvider>
        {/* v3 composable Toast: one root renders the viewport + the styled list;
            callers trigger toasts via the global `toast()`. */}
        <Toast position="top-center" swipeDirection="horizontal">
          {children}
          {/* native needs to clear the status bar / dynamic island */}
          <Toast.Viewport offset={{ top: isWeb ? 10 : 70, left: 0, right: 0 }}>
            <Toast.List renderItem={renderBentoToast} />
          </Toast.Viewport>
        </Toast>
      </SchemeProvider>
    </TamaguiProvider>
  )
}
