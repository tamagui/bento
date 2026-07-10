import { Text, ToggleGroup, View, styled } from 'tamagui'

const Item = styled(ToggleGroup.Item, {
  flex: 1,
  py: '$2.5',
  hoverStyle: {
    backgroundColor: '$color3',
  },
  pressStyle: {
    backgroundColor: '$color4',
  },
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineStyle: 'solid',
    outlineColor: '$color8',
    outlineOffset: -2,
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
        flexDirection="row"
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
                color={active ? '$color' : '$color11'}
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
