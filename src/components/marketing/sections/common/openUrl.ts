import { Linking } from 'react-native'
import { isWeb } from 'tamagui'

export const openUrl = (url: string) => {
  if (isWeb) {
    window.open(url, '_blank', 'noopener')
  } else {
    Linking.openURL(url)
  }
}
