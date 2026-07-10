import { SearchX, X } from '@tamagui/lucide-icons-2'
import { Button, H3, Paragraph, YStack } from 'tamagui'

export function EmptyStateSearch() {
  const query = 'quarterly roadmap'

  return (
    <YStack
      render="output"
      aria-label={`No results for ${query}`}
      width="100%"
      maxW={560}
      self="center"
      items="center"
      gap="$3"
      p="$7"
    >
      <SearchX size={40} color="$color9" />
      <H3 text="center">No results for “{query}”</H3>
      <Paragraph text="center" color="$color10">
        Try a shorter phrase, check the spelling, or clear the current search.
      </Paragraph>
      <Button
        mt="$2"
        variant="outlined"
        icon={X}
        aria-label={`Clear search for ${query}`}
      >
        Clear search
      </Button>
    </YStack>
  )
}

EmptyStateSearch.fileName = 'EmptyStateSearch'
