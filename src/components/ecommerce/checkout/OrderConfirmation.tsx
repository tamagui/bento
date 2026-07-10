import { Check, Mail, PackageCheck, Truck } from '@tamagui/lucide-icons-2'
import { Button, Paragraph, Text, View, XStack, YStack } from 'tamagui'

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

export function OrderConfirmation() {
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
          <Check size={30} color="$green11" />
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
          <Mail size={15} color="$color9" />
          <Text fontWeight="700">Order #BN-20481</Text>
        </XStack>
      </YStack>
      <YStack
        p="$5"
        rounded="$8"
        borderWidth={1}
        borderColor="$borderColor"
        bg="$background"
      >
        {timeline.map((event, index) => {
          const Icon = event.icon
          return (
            <XStack key={event.title} minH={92} gap="$4">
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
                  <Icon size={17} color={event.done ? 'white' : '$color9'} />
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
      <Button self="center">View order details</Button>
    </YStack>
  )
}

OrderConfirmation.fileName = 'OrderConfirmation'
