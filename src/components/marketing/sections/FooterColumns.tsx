import { Github, Twitter } from '@tamagui/lucide-icons-2'
import { Anchor, Separator, Text, XStack, YStack, isWeb } from 'tamagui'

const site = 'https://tamagui.dev'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Components', href: `${site}/ui/intro` },
      { label: 'Pricing', href: `${site}/bento` },
      {
        label: 'Changelog',
        href: 'https://github.com/tamagui/tamagui/releases',
      },
      { label: 'Roadmap', href: 'https://github.com/tamagui/tamagui/issues' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: `${site}/docs/intro/introduction` },
      { label: 'Guides', href: `${site}/docs/guides/how-to-build-a-button` },
      { label: 'Blog', href: `${site}/blog` },
      { label: 'Showcase', href: `${site}/community` },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: `${site}/community` },
      { label: 'Careers', href: `${site}/community` },
      { label: 'Contact', href: 'mailto:support@tamagui.dev' },
      { label: 'Press kit', href: 'https://github.com/tamagui/tamagui' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: `${site}/privacy` },
      { label: 'Terms', href: `${site}/terms` },
      {
        label: 'License',
        href: 'https://github.com/tamagui/tamagui/blob/main/LICENSE',
      },
    ],
  },
]

/** ------ EXAMPLE ------ */
export function FooterColumns({
  brand = 'Bento',
  legalName = 'Tamagui LLC',
}: {
  brand?: string
  legalName?: string
}) {
  return (
    <YStack
      render={isWeb ? 'footer' : undefined}
      width="100%"
      maxW={980}
      gap="6"
      py="8"
      px="4"
    >
      <XStack flexWrap="wrap" gap="8" justify="space-between">
        <YStack gap="3" maxW={220}>
          <Text fontSize="6" fontWeight="800" color="color11">
            {brand}
          </Text>
          <Text fontSize="3" color="color9" lineHeight="4">
            Premium universal components for teams that ship.
          </Text>
          <XStack gap="2" pt="1">
            <Anchor
              href="https://github.com/tamagui/tamagui"
              target="_blank"
              aria-label="GitHub"
              color="color9 hover:color11"
              p="3"
              m="-2"
            >
              <Github size={18} />
            </Anchor>
            <Anchor
              href="https://x.com/tamagui_js"
              target="_blank"
              aria-label="Twitter"
              color="color9 hover:color11"
              p="3"
              m="-2"
            >
              <Twitter size={18} />
            </Anchor>
          </XStack>
        </YStack>
        {columns.map((col) => (
          <YStack
            key={col.title}
            render={isWeb ? 'nav' : undefined}
            aria-label={col.title}
            gap="2-5"
            minW={120}
          >
            <Text
              fontSize="2"
              fontWeight="700"
              color="color9"
              letterSpacing={1}
              textTransform="uppercase"
            >
              {col.title}
            </Text>
            {col.links.map((link) => (
              <Anchor
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                fontSize="3"
                color="color10 hover:color11"
                py="1"
                textDecorationLine="none"
              >
                {link.label}
              </Anchor>
            ))}
          </YStack>
        ))}
      </XStack>
      <Separator />
      <XStack justify="space-between" flexWrap="wrap" gap="3">
        <Text fontSize="2" color="color8">
          © 2026 {legalName}. All rights reserved.
        </Text>
        <Text fontSize="2" color="color8">
          Made with Tamagui
        </Text>
      </XStack>
    </YStack>
  )
}

FooterColumns.fileName = 'FooterColumns'
