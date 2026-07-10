import { Github, Twitter } from '@tamagui/lucide-icons-2'
import { Anchor, Separator, Text, View, XStack, YStack } from 'tamagui'

const columns = [
  {
    title: 'Product',
    links: ['Components', 'Pricing', 'Changelog', 'Roadmap'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Guides', 'Blog', 'Showcase'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Contact', 'Press kit'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'License'],
  },
]

/** ------ EXAMPLE ------ */
export function FooterColumns() {
  return (
    <YStack width="100%" maxW={980} gap="$6" py="$8" px="$4">
      <XStack flexWrap="wrap" gap="$8" justify="space-between">
        <YStack gap="$3" maxW={220}>
          <Text fontSize="$6" fontWeight="800" color="$color12">
            Bento
          </Text>
          <Text fontSize="$3" color="$color10" lineHeight="$4">
            Premium universal components for teams that ship.
          </Text>
          <XStack gap="$3" pt="$1">
            <Anchor
              href="#"
              aria-label="GitHub"
              color="$color10"
              hoverStyle={{ color: '$color12' }}
            >
              <Github size={18} />
            </Anchor>
            <Anchor
              href="#"
              aria-label="Twitter"
              color="$color10"
              hoverStyle={{ color: '$color12' }}
            >
              <Twitter size={18} />
            </Anchor>
          </XStack>
        </YStack>
        {columns.map((col) => (
          <YStack key={col.title} gap="$2.5" minW={120}>
            <Text
              fontSize="$2"
              fontWeight="700"
              color="$color10"
              letterSpacing={1}
              textTransform="uppercase"
            >
              {col.title}
            </Text>
            {col.links.map((l) => (
              <Anchor
                key={l}
                href="#"
                fontSize="$3"
                color="$color11"
                textDecorationLine="none"
                hoverStyle={{ color: '$color12' }}
              >
                {l}
              </Anchor>
            ))}
          </YStack>
        ))}
      </XStack>
      <Separator />
      <XStack justify="space-between" flexWrap="wrap" gap="$3">
        <Text fontSize="$2" color="$color9">
          © 2026 Tamagui LLC. All rights reserved.
        </Text>
        <Text fontSize="$2" color="$color9">
          Made with Tamagui
        </Text>
      </XStack>
    </YStack>
  )
}

FooterColumns.fileName = 'FooterColumns'
