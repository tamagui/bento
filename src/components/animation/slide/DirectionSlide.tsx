import { Text, ToggleGroup, View, styled } from 'tamagui'

const Item = styled(ToggleGroup.Item, {
  flex: 1,
  width: '100%',
  focusStyle: {
    backgroundColor: '$color12',
  },
})

const directions = ['left', 'right', 'top', 'bottom'] as const
type Direction = (typeof directions)[number]

export function DirectionSlide({
  direction,
  setDirection,
}: {
  direction: Direction
  setDirection: (direction: Direction) => void
}) {
  return (
    <View flexDirection="row" gap="$2">
      <ToggleGroup
        orientation="horizontal"
        type="single"
        disableDeactivation={true}
        value={direction}
        onValueChange={(value) => setDirection(value as Direction)}
        width="100%"
      >
        {directions.map((dir) => {
          const active = dir === direction
          return (
            <Item
              theme={active ? 'accent' : undefined}
              value={dir}
              aria-label={dir}
              key={dir}
            >
              <Text
                fontFamily="$mono"
                color={active ? '$color1' : '$color12'}
                fontWeight="600"
                textTransform="capitalize"
              >
                {dir}
              </Text>
            </Item>
          )
        })}
      </ToggleGroup>
    </View>
  )
}
