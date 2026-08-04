import { Check, X } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { ScrollView, Text, XStack, YStack, isWeb } from 'tamagui'
import { useGroupMedia } from '../../hooks/useGroupMedia'
import { Table } from '../../elements/tables/common/tableParts'
import { SegmentedFrame } from '../../elements/segmented-controls/common/SegmentedFrame'

const planNames = ['Starter', 'Studio', 'Scale'] as const

const rows = [
  {
    feature: 'Active projects',
    starter: '3',
    studio: 'Unlimited',
    scale: 'Unlimited',
  },
  { feature: 'Storage', starter: '5 GB', studio: '100 GB', scale: 'Unlimited' },
  { feature: 'Team analytics', starter: false, studio: true, scale: true },
  { feature: 'SAML SSO', starter: false, studio: false, scale: true },
  { feature: 'Priority support', starter: false, studio: true, scale: true },
] as const

function Value({ value }: { value: boolean | string }) {
  if (typeof value === 'string') return <Text color="color10">{value}</Text>
  return value ? (
    <Check size={18} color="green-600" aria-label="Included" />
  ) : (
    <X size={18} color="color7" aria-label="Not included" />
  )
}

const firstColumn = { position: 'sticky' as const, left: 0 }

const valueFor = (row: (typeof rows)[number], plan: string) =>
  plan === 'Starter' ? row.starter : plan === 'Studio' ? row.studio : row.scale

/** narrow containers compare one plan at a time instead of pinning a
 * 240px column inside a 296px viewport */
function ComparisonCards() {
  const [plan, setPlan] = useState<string>('Studio')
  return (
    <YStack gap="3">
      <SegmentedFrame
        label="Compare plan"
        options={planNames.map((name) => ({ label: name, value: name }))}
        value={plan}
        onValueChange={setPlan}
      />
      <YStack
        rounded="7"
        borderWidth={1}
        borderColor="border-color"
        overflow="hidden"
        bg="background"
      >
        {rows.map((row, index) => (
          <XStack
            key={row.feature}
            justify="space-between"
            items="center"
            gap="3"
            px="4"
            minH={54}
            borderTopWidth={index === 0 ? 0 : 1}
            borderColor="border-color"
          >
            <Text fontWeight="600" letterSpacing={0} flex={1}>
              {row.feature}
            </Text>
            <Value value={valueFor(row, plan)} />
          </XStack>
        ))}
      </YStack>
    </YStack>
  )
}

export function PricingComparison() {
  const { sm } = useGroupMedia('window')
  return (
    <YStack width="100%" maxW={920} self="center" gap="4">
      <Text fontSize="8" fontWeight="900" letterSpacing={-0.5}>
        Compare every feature
      </Text>
      {sm ? (
        <ComparisonCards />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator>
          <Table
            aria-label="Pricing feature comparison"
            minW={760}
            width={760}
            borderWidth={1}
            borderColor="border-color"
            rounded="7"
            overflow="hidden"
            cellHeight={58}
          >
            <Table.Head>
              <Table.Row bg="color2">
                <Table.HeaderCell
                  width={240}
                  minW={240}
                  shrink={0}
                  px="3"
                  bg="color2"
                  z={3}
                  style={firstColumn}
                >
                  <Text fontWeight="700">Features</Text>
                </Table.HeaderCell>
                {planNames.map((plan) => (
                  <Table.HeaderCell key={plan} width={170} minW={170} shrink={0} px="3">
                    <Text fontWeight="700">{plan}</Text>
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {rows.map((row) => (
                <Table.Row
                  key={row.feature}
                  borderTopWidth={1}
                  borderColor="border-color"
                >
                  {/* row header semantics: feature names label their row */}
                  <Table.HeaderCell
                    render={isWeb ? <th scope="row" /> : undefined}
                    width={240}
                    minW={240}
                    shrink={0}
                    px="3"
                    bg="background"
                    z={2}
                    style={firstColumn}
                  >
                    <Text fontWeight="600" letterSpacing={0}>
                      {row.feature}
                    </Text>
                  </Table.HeaderCell>
                  <Table.Cell width={170} minW={170} shrink={0} px="3">
                    <Value value={row.starter} />
                  </Table.Cell>
                  <Table.Cell width={170} minW={170} shrink={0} px="3">
                    <Value value={row.studio} />
                  </Table.Cell>
                  <Table.Cell width={170} minW={170} shrink={0} px="3">
                    <Value value={row.scale} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </ScrollView>
      )}
    </YStack>
  )
}

PricingComparison.fileName = 'PricingComparison'
