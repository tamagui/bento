import { Bell, Menu } from '@tamagui/lucide-icons'
import type { StackProps, TabLayout, TabsTabProps } from 'tamagui'

import { useState } from 'react'
import {
  Anchor,
  AnimatePresence,
  Avatar,
  Button,
  Image,
  Popover,
  PopoverTrigger,
  Separator,
  Tabs,
  Text,
  View,
  isWeb,
  styled,
  useEvent,
} from 'tamagui'
import { useGroupMedia } from '../../hooks/useGroupMedia'

import { useContainerDim } from '../../hooks/useContainerDim'
import { Drawer } from '../common/Drawer'

// how to use with URL params:
// import { createParam } from 'solito'
// const { useParam, useParams } = createParam()

const links = [
  {
    title: 'Products',
    slug: 'products',
  },
  {
    title: 'People',
    slug: 'people',
  },
  {
    title: 'Company',
    slug: 'company',
  },
  {
    title: 'Blog',
    slug: 'blog',
  },
  {
    title: 'Contact',
    slug: 'contact',
  },
]

const useTabs = () => {
  const [tabState, setTabState] = useState<{
    currentTab: string
    /**
     * Layout of the Tab user might intend to select (hovering / focusing)
     */
    intentAt: TabLayout | null
    /**
     * Layout of the Tab user selected
     */
    activeAt: TabLayout | null
    /**
     * Used to get the direction of activation for animating the active indicator
     */
    prevActiveAt: TabLayout | null
  }>({
    activeAt: null,

    currentTab: 'tab1',

    intentAt: null,

    prevActiveAt: null,
  })
  const setCurrentTab = (currentTab: string) => setTabState({ ...tabState, currentTab })

  const setIntentIndicator = (intentAt: TabLayout | null) =>
    setTabState({ ...tabState, intentAt })

  const setActiveIndicator = (activeAt: TabLayout | null) =>
    setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt })

  const { activeAt, intentAt, currentTab } = tabState
  /**

   * -1: from left

   *  0: n/a

   *  1: from right

   */

  const handleOnInteraction: TabsTabProps['onInteraction'] = (type, layout) => {
    if (type === 'select') {
      setActiveIndicator(layout)
    } else {
      setIntentIndicator(layout)
    }
  }

  // Note: the following code is very important
  // const params = useParams()
  // useEffect(() => {
  //   /**
  //    * Note: read the current tab from the url and then set it as the current tab
  //    */
  //   setCurrentTab(params.tab)
  // }, [params])

  return {
    currentTab,
    setCurrentTab,
    activeAt,
    intentAt,
    handleOnInteraction,
  }
}

/** ------ EXAMPLE ------ */
export function TopNavBarWithLogo() {
  const { currentTab, setCurrentTab, activeAt, intentAt, handleOnInteraction } = useTabs()
  const [triggerOpen, setTriggerOpen] = useState(false)
  const closeTrigger = useEvent(() => {
    setTriggerOpen(false)
  })
  const { sm } = useGroupMedia('window')

  return (
    <View
      flexDirection="column"
      width="100%"
      height={610}
      $group-window-gtXs={{ height: 800 }}
    >
      <View
        flexDirection="row"
        theme="accent"
        p="$2"
        minW="100%"
        tag="nav"
        items="center"
        justify="space-between"
        bg="$background"
      >
        {sm ? (
          <SideBar />
        ) : (
          <View flexDirection="row" p="$2" items="center" bg="#FFFF00" rounded={1000_000}>
            <Image
              objectFit="contain"
              width={25}
              height={25}
              $group-window-sm={{ width: 15, height: 15 }}
              src="/tamagui-icon.svg"
              alt="Bento logo"
            />
          </View>
        )}
        {!sm && (
          <Tabs value={currentTab} onValueChange={setCurrentTab} orientation="horizontal">
            <View position="relative" flexDirection="column">
              <AnimatePresence>
                {intentAt && (
                  <TabsRovingIndicator
                    rounded="$4"
                    width={intentAt.width}
                    height={intentAt.height}
                    x={intentAt.x}
                    y={intentAt.y}
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeAt && (
                  <TabsRovingIndicator
                    theme="accent"
                    rounded="$4"
                    width={activeAt.width}
                    height={activeAt.height}
                    x={activeAt.x}
                    y={activeAt.y}
                  />
                )}
              </AnimatePresence>
              <Tabs.List
                disablePassBorderRadius
                loop={false}
                aria-label="Manage your account"
                gap="$3"
                backgroundColor="transparent"
              >
                {links.map((link, index) => (
                  <Tabs.Tab
                    key={link.title}
                    unstyled
                    value={link.slug}
                    onInteraction={handleOnInteraction}
                    paddingHorizontal="$4"
                  >
                    <NavLink
                      key={index}
                      // Note: replace href with /bento/shells/navbars/${link.slug}
                      href={`/bento/shells/navbars/#`}
                    >
                      {link.title}
                    </NavLink>
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </View>
          </Tabs>
        )}
        <View flexDirection="row" items="center" gap="$3">
          <Button circular chromeless p={0} size="$3">
            <Button.Icon>
              <Bell size="$1" />
            </Button.Icon>
          </Button>
          <ProfileDropdown
            triggerOpen={triggerOpen}
            setTriggerOpen={setTriggerOpen}
            closeTrigger={closeTrigger}
          />
        </View>
      </View>
      {!sm && <View flexDirection="row" bg="$background" height="100%" />}
    </View>
  )
}

TopNavBarWithLogo.fileName = 'TopNavBarWithLogo'

function ProfileDropdown({
  triggerOpen,
  setTriggerOpen,
  closeTrigger,
}: {
  triggerOpen: boolean
  setTriggerOpen: (open: boolean) => void
  closeTrigger: () => void
}) {
  return (
    <Popover
      offset={{
        mainAxis: 5,
      }}
      placement="bottom-end"
      open={triggerOpen}
      onOpenChange={setTriggerOpen}
    >
      <PopoverTrigger asChild>
        <Button circular chromeless>
          <Avatar circular size="$3">
            <Avatar.Image
              pointerEvents="none"
              aria-label="user photo"
              src="https://i.pravatar.cc/123"
            />
            <Avatar.Fallback bg="$color10" />
          </Avatar>
        </Button>
      </PopoverTrigger>
      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        bg="$color1"
        p={0}
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        elevation={5}
        overflow="hidden"
      >
        <DropDownItem onPress={closeTrigger}>
          <DropDownText>Accounts</DropDownText>
        </DropDownItem>
        <DropDownItem onPress={closeTrigger}>
          <DropDownText>Settings</DropDownText>
        </DropDownItem>
        <DropDownItem onPress={closeTrigger}>
          <DropDownText>Sign Out</DropDownText>
        </DropDownItem>
      </Popover.Content>
    </Popover>
  )
}

const DropDownItem = styled(View, {
  bg: '$background',
  width: '100%',
  hoverStyle: {
    bg: '$backgroundHover',
  },
  pressStyle: {
    bg: '$backgroundPress',
  },
  cursor: 'pointer',
  px: '$4',
  py: '$2',
  items: 'center',
  justify: 'center',
  '$group-window-xs': {
    px: '$2',
    py: '$1',
  },
})

const DropDownText = styled(Text, {
  fontWeight: '$2',
  lineHeight: '$2',
  fontSize: '$2',
  '$group-window-xs': {
    fontWeight: '$1',
    fontSize: '$1',
    lineHeight: '$1',
  },
})

const NavLink = View.styleable<{ href: string }>(
  ({ children, href = '#', ...rest }, ref) => {
    return (
      <View ref={ref} rounded={5} py="$2" items="center" justify="center" {...rest}>
        <Anchor href={href}>
          <Text
            opacity={0.9}
            fontSize="$5"
            fontWeight="$5"
            lineHeight="$5"
            color="$color12"
            hoverStyle={{
              opacity: 1,
            }}
          >
            {children}
          </Text>
        </Anchor>
      </View>
    )
  }
)

/** SIDEBAR */
function SideBar() {
  const [open, setOpen] = useState(false)
  const toggle = useEvent(() => setOpen(!open))
  return (
    <View
      position="relative"
      flexDirection="row"
      {...(isWeb && {
        onKeyDown: (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            setOpen(false)
          }
        },
      })}
    >
      <Button circular chromeless onPress={toggle}>
        <Button.Icon>
          <Menu size="$1" />
        </Button.Icon>
      </Button>
      <SideBarContent open={open} onOpenChange={() => setOpen(false)} />
    </View>
  )
}

function SideBarContent({
  onOpenChange,
  open,
}: { onOpenChange: () => void; open: boolean }) {
  const { activeAt, currentTab, handleOnInteraction, intentAt, setCurrentTab } = useTabs()
  const { height, width } = useContainerDim('window')

  return (
    <View flexDirection="column" position="absolute" mx={-12} my="$-2">
      <Drawer open={open} onOpenChange={onOpenChange}>
        <Drawer.Portal>
          <Drawer.Overlay
            height={height}
            width={width + 100}
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Drawer.Swipeable>
            <Drawer.Content
              py="$2"
              height={height}
              width={240}
              items="flex-start"
              justify="flex-start"
              bg="$background"
              x={-30}
              pl={30}
              gap="$4"
              enterStyle={{ x: -240 }}
              exitStyle={{ x: -260 }}
            >
              <View
                flexDirection="row"
                p="$2"
                mt="$2"
                items="center"
                bg="#FFFF00"
                rounded={1000_000}
                ml="$5"
              >
                <Image
                  objectFit="contain"
                  width={30}
                  height={30}
                  $group-window-sm={{ width: 15, height: 15 }}
                  src="/tamagui-icon.svg"
                  alt="Bento logo"
                />
              </View>
              <Separator width="100%" />
              <View flexDirection="column" width="100%" tag="ul" gap="$2">
                <Tabs
                  value={currentTab}
                  onValueChange={setCurrentTab}
                  orientation="vertical"
                >
                  <View position="relative" flexDirection="column" width="100%">
                    <AnimatePresence>
                      {intentAt && (
                        <TabsRovingIndicator
                          width={intentAt.width}
                          height={intentAt.height}
                          x={intentAt.x}
                          y={intentAt.y}
                        />
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {activeAt && (
                        <TabsRovingIndicator
                          width={activeAt.width}
                          height={activeAt.height}
                          x={activeAt.x}
                          y={activeAt.y}
                        />
                      )}
                    </AnimatePresence>
                    <Tabs.List
                      disablePassBorderRadius
                      loop={false}
                      aria-label="Manage your account"
                      gap="$1"
                      width="100%"
                      backgroundColor="transparent"
                    >
                      {links.map((link, index) => (
                        <Tabs.Tab
                          key={link.title}
                          unstyled
                          width="100%"
                          value={link.slug}
                          onInteraction={handleOnInteraction}
                          alignItems="flex-start"
                          justifyContent="flex-start"
                        >
                          <NavLink
                            key={index}
                            // Note: replace href with /bento/shells/navbars/${link.slug}
                            href={`/bento/shells/navbars/#`}
                            px="$5"
                            mr="auto"
                            justify="flex-start"
                          >
                            {link.title}
                          </NavLink>
                        </Tabs.Tab>
                      ))}
                    </Tabs.List>
                  </View>
                </Tabs>
              </View>
            </Drawer.Content>
          </Drawer.Swipeable>
        </Drawer.Portal>
      </Drawer>
    </View>
  )
}

const TabsRovingIndicator = ({ active, ...props }: { active?: boolean } & StackProps) => {
  return (
    <View
      flexDirection="column"
      position="absolute"
      backgroundColor="$color8"
      opacity={0.7}
      animation="100ms"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: '$color8',
        opacity: 0.6,
      })}
      {...props}
    />
  )
}
