import React from 'react'
import { Text, type TextProps } from 'tamagui'

type AnimatedTextProps = TextProps & {
  children: string | number
}

const AnimatedText = ({ children, ...props }: AnimatedTextProps) => (
  <Text {...props}>{children}</Text>
)

export default React.memo(AnimatedText)
