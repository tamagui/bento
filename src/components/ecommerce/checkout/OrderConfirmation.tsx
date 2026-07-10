import { Check, ChevronDown, Mail, PackageCheck, Truck } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Paragraph, Separator, Text, View, XStack, YStack, isWeb } from 'tamagui'

const timeline = [
  {
    title: 'Order confirmed',
    detail: 'We received your payment.',
    icon: Check,
    done: true,
  },
  {
    title: 'Preparing shipment',
    detail: 'Your items are being packed.',
    icon: PackageCheck,
    done: false,
  },
  {
    title: 'Out for delivery',
    detail: 'Tracking will appear here.',
    icon: Truck,
    done: false,
  },
]

const orderDetails = [
  { label: 'Contour desk lamp · Graphite', value: '$128.00' },
  { label: 'Wool desk mat · Stone', value: '$46.00' },
  { label: 'Shipping (Standard)', value: 'Free' },
  { label: 'Total charged', value: '$187.92' },
]

export function OrderConfirmation() {
  const [showDetails, setShowDetails] = useState(false)
  const currentIndex = timeline.findIndex((event) => !event.done)

  return (
    <YStack width="100%" maxW={620} self="center" gap="$6" p="$5">
      <YStack items="center" gap="$3">
        <View
          width={64}
          height={64}
          rounded={999}
          bg="$green4"
          items="center"
          justify="center"
        >
          <Check size={30} color="$green11" aria-hidden />
        </View>
        <YStack items="center" gap="$1">
          <Text fontSize="$9" fontWeight="900" text="center" letterSpacing={-0.5}>
            Thanks for your order
          </Text>
          <Paragraph text="center" color="$color10">
            Confirmation was sent to maya@example.com.
          </Paragraph>
        </YStack>
        <XStack px="$3" py="$2" rounded={999} bg="$color3" gap="$2" items="center">
          <Mail size={15} color="$color9" aria-hidden />
          <Text fontWeight="700">Order #BN-20481</Text>
        </XStack>
      </YStack>
      <YStack
        p="$5"
        m={0}
        rounded="$8"
        borderWidth={1}
        borderColor="$borderColor"
        bg="$background"
        aria-label="Order progress"
        render={isWeb ? <ol style={{ listStyleType: 'none' }} /> : undefined}
      >
        {timeline.map((event, index) => {
          const Icon = event.icon
          return (
            <XStack
              key={event.title}
              render={isWeb ? <li /> : undefined}
              aria-current={index === currentIndex ? 'step' : undefined}
              minH={92}
              gap="$4"
            >
              <YStack items="center">
                <View
                  width={34}
                  height={34}
                  rounded={999}
                  items="center"
                  justify="center"
                  bg={event.done ? '$green9' : '$color3'}
                  borderWidth={1}
                  borderColor={event.done ? '$green9' : '$color6'}
                >
                  <Icon size={17} color={event.done ? '$white1' : '$color9'} aria-hidden />
                </View>
                {index < timeline.length - 1 ? (
                  <View width={2} flex={1} bg={event.done ? '$green8' : '$color5'} />
                ) : null}
              </YStack>
              <YStack flex={1} pt="$1" gap="$1">
                <Text fontWeight="800" color={event.done ? '$color12' : '$color10'}>
                  {event.title}
                </Text>
                <Text color="$color9">{event.detail}</Text>
              </YStack>
            </XStack>
          )
        })}
      </YStack>
      <Button
        self="center"
        aria-expanded={showDetails}
        iconAfter={ChevronDown}
        onPress={() => setShowDetails((current) => !current)}
      >
        {showDetails ? 'Hide order details' : 'View order details'}
      </Button>
      {showDetails && (
        <YStack
          gap="$2.5"
          p="$4"
          rounded="$6"
          borderWidth={1}
          borderColor="$borderColor"
          bg="$color1"
        >
          {orderDetails.map((row, index) => (
            <YStack key={row.label} gap="$2.5">
              {index === orderDetails.length - 1 && <Separator />}
              <XStack justify="space-between" gap="$3">
                <Text color={index === orderDetails.length - 1 ? '$color12' : '$color10'} fontWeight={index === orderDetails.length - 1 ? '800' : '400'}>
                  {row.label}
                </Text>
                <Text fontWeight={index === orderDetails.length - 1 ? '900' : '600'}>
                  {row.value}
                </Text>
              </XStack>
            </YStack>
          ))}
        </YStack>
      )}
    </YStack>
  )
}

OrderConfirmation.fileName = 'OrderConfirmation'
