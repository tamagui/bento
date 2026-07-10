import { Check, X } from '@tamagui/lucide-icons-2'
import { ScrollView, Text, YStack } from 'tamagui'
import { useGroupMedia } from '../../hooks/useGroupMedia'
import { Table } from '../../elements/tables/common/tableParts'

const rows = [
  { feature: 'Active projects', starter: '3', studio: 'Unlimited', scale: 'Unlimited' },
  { feature: 'Storage', starter: '5 GB', studio: '100 GB', scale: 'Unlimited' },
  { feature: 'Team analytics', starter: false, studio: true, scale: true },
  { feature: 'SAML SSO', starter: false, studio: false, scale: true },
  { feature: 'Priority support', starter: false, studio: true, scale: true },
] as const

function Value({ value }: { value: boolean | string }) {
  if (typeof value === 'string') return <Text color="$color11">{value}</Text>
  return value ? (
    <Check size={18} color="$green10" aria-label="Included" />
  ) : (
    <X size={18} color="$color8" aria-label="Not included" />
  )
}

const firstColumn = { position: 'sticky' as const, left: 0 }

export function PricingComparison() {
  const { sm } = useGroupMedia('window')
  return (
    <YStack width="100%" maxW={920} self="center" gap="$4">
      <Text fontSize="$8" fontWeight="900" letterSpacing={-0.5}>
        Compare every feature
      </Text>
      {sm && (
        <Text fontSize="$2" color="$color9">
          Swipe sideways to compare all plans
        </Text>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <Table
          aria-label="Pricing feature comparison"
          minW={760}
          width={760}
          cellHeight={58}
          borderWidth={1}
          borderColor="$borderColor"
          rounded="$7"
          overflow="hidden"
        >
          <Table.Head>
            <Table.Row bg="$color2">
              <Table.HeaderCell
                width={240}
                minW={240}
                shrink={0}
                px="$3"
                bg="$color2"
                style={firstColumn}
                z={3}
              >
                <Text fontWeight="700">Features</Text>
              </Table.HeaderCell>
              {['Starter', 'Studio', 'Scale'].map((plan) => (
                <Table.HeaderCell key={plan} width={170} minW={170} shrink={0} px="$3">
                  <Text fontWeight="700">{plan}</Text>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row.feature} borderTopWidth={1} borderColor="$borderColor">
                <Table.Cell
                  width={240}
                  minW={240}
                  shrink={0}
                  px="$3"
                  bg="$background"
                  style={firstColumn}
                  z={2}
                >
                  <Text fontWeight="600" letterSpacing={0}>
                    {row.feature}
                  </Text>
                </Table.Cell>
                <Table.Cell width={170} minW={170} shrink={0} px="$3">
                  <Value value={row.starter} />
                </Table.Cell>
                <Table.Cell width={170} minW={170} shrink={0} px="$3">
                  <Value value={row.studio} />
                </Table.Cell>
                <Table.Cell width={170} minW={170} shrink={0} px="$3">
                  <Value value={row.scale} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </ScrollView>
    </YStack>
  )
}

PricingComparison.fileName = 'PricingComparison'
