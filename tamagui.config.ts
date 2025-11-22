import { createTamagui } from 'tamagui'
import { config } from './config/tamagui.dev.config'

const tamaConf = createTamagui(config)

export type Conf = typeof tamaConf

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}

  interface TypeOverride {
    groupNames(): 'card' | 'takeoutBody' | 'content' | 'item' | 'window'
  }
}

export default tamaConf
