import { Paperclip, Send } from '@tamagui/lucide-icons-2'
import { useState } from 'react'
import { Button, Separator, Tabs, Text, TextArea, View, styled } from 'tamagui'

/** ------ EXAMPLE ------ */
export function WritePreviewAction() {
  const [activeTab, setActiveTab] = useState('write')
  const [comment, setComment] = useState<string>()

  return (
    <Tabs
      width={500}
      maxW="100%"
      value={activeTab}
      onValueChange={setActiveTab}
      $group-window-sm={{
        py: '$6',
      }}
    >
      <View
        width="100%"
        overflow="hidden"
        bg="$background"
        borderColor="$borderColor"
        borderWidth={1}
        rounded="$4"
      >
        <View flexDirection="row">
          <Tabs.List width="100%" backgroundColor="$color5" rounded={0}>
            <StyledTab
              borderBottomLeftRadius={0}
              borderBottomRightRadius={0}
              value="write"
              tabSelected={activeTab === 'write'}
            >
              <Text fontSize="$3" lineHeight="$3" fontWeight="$3">
                Write
              </Text>
            </StyledTab>
            <StyledTab
              borderBottomLeftRadius={0}
              borderBottomRightRadius={0}
              borderTopRightRadius={0}
              value="preview"
              tabSelected={activeTab === 'preview'}
            >
              <Text fontSize="$3" lineHeight="$3" fontWeight="$3">
                Preview
              </Text>
            </StyledTab>
          </Tabs.List>
        </View>
        <Tabs.Content value="write" bg="$color1" minHeight={200}>
          <StyledTextArea
            size="$4"
            p="$4"
            flex={1}
            fontWeight="300"
            rows={5}
            placeholder="Your comment here..."
            placeholderTextColor="$placeholderColor"
            color="$color12"
            bg="$color1"
            defaultValue={comment}
            onChange={(e: any) => setComment(e.target?.value ?? e.nativeEvent?.text ?? '')}
          />
        </Tabs.Content>
        <Tabs.Content bg="$color1" value="preview" minHeight={200}>
          <Text
            fontSize="$3"
            lineHeight="$3"
            fontWeight="300"
            borderColor="$color1"
            p="$3"
            flex={1}
          >
            {comment ?? 'Your text preview'}
          </Text>
        </Tabs.Content>
        <Separator />
        <View flexDirection="row" px="$3" py="$2" justify="space-between" items="center">
          <View flexDirection="row">
            <Button size="$2" chromeless>
              <Button.Icon>
                <Paperclip color="$color10" size="$1" />
              </Button.Icon>
            </Button>
          </View>
          <Button theme="accent" self="flex-end" size="$4" rounded="$10">
            <Button.Icon>
              <Send />
            </Button.Icon>
            <Button.Text>Post</Button.Text>
          </Button>
        </View>
      </View>
    </Tabs>
  )
}

WritePreviewAction.fileName = 'WritePreviewAction'

const StyledTab = styled(Tabs.Tab, {
  unstyled: true,
  borderColor: 'transparent',
  padding: '$2.5',
  paddingHorizontal: '$4.5',

  hoverStyle: {
    backgroundColor: '$background04',
  },

  variants: {
    tabSelected: {
      true: {
        backgroundColor: '$color1',
        borderColor: '$borderColor',
        borderBottomWidth: 0,
        hoverStyle: {
          backgroundColor: '$color1',
        },
      },
      false: {
        opacity: 0.6,
      },
    },
  } as const,
})

const StyledTextArea = styled(TextArea, {
  height: 200,
  p: '$3',
  rounded: 0,
  borderWidth: 0,

  focusStyle: {
    rounded: 0,
    borderWidth: 1,
    outlineWidth: 0,
    outlineColor: 'transparent',
  },
})
