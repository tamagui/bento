import { Search, SearchX, X } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, H3, Paragraph, YStack, isWeb } from 'tamagui'

export function EmptyStateSearch({ initialQuery = 'quarterly roadmap' }) {
  const [query, setQuery] = useState<string | null>(initialQuery)

  if (query === null) {
    return (
      <YStack
        render={isWeb ? 'section' : undefined}
        aria-label="Search cleared"
        width="100%"
        maxW={560}
        self="center"
        items="center"
        gap="3"
        p="7"
      >
        <Search size={40} color="color8" aria-hidden />
        <H3 text="center" aria-live="polite">
          Search cleared
        </H3>
        <Paragraph text="center" color="color9">
          Type a new phrase to search your workspace.
        </Paragraph>
        <Button mt="2" variant="outlined" onPress={() => setQuery(initialQuery)}>
          Show the empty result again
        </Button>
      </YStack>
    )
  }

  return (
    <YStack
      render={isWeb ? 'section' : undefined}
      aria-label={`No results for ${query}`}
      width="100%"
      maxW={560}
      self="center"
      items="center"
      gap="3"
      p="7"
    >
      <SearchX size={40} color="color8" aria-hidden />
      <H3 text="center">No results for “{query}”</H3>
      <Paragraph text="center" color="color9">
        Try a shorter phrase, check the spelling, or clear the current search.
      </Paragraph>
      <Button
        mt="2"
        variant="outlined"
        icon={X}
        aria-label={`Clear search for ${query}`}
        onPress={() => setQuery(null)}
      >
        Clear search
      </Button>
    </YStack>
  )
}

EmptyStateSearch.fileName = 'EmptyStateSearch'
