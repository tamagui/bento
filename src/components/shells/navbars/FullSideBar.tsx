import { Bell, Menu } from '@tamagui/lucide-icons'
import { RovingFocusGroup } from '@tamagui/roving-focus'
import { useState } from 'react'
import {
  Anchor,
  Avatar,
  Button,
  H4,
  Popover,
  PopoverTrigger,
  Text,
  View,
  isWeb,
  styled,
  useEvent,
} from 'tamagui'
import { useContainerDim } from '../../hooks/useContainerDim'
import { useGroupMedia } from '../../hooks/useGroupMedia'
import { Drawer } from '../common/Drawer'

const Link = styled(Anchor, {
  textTransform: 'none',
  display: 'flex',
  textDecorationLine: 'none',
  items: 'center',
  py: '$3',
  hoverStyle: {
    bg: '$backgroundHover',
  },
  focusStyle: {
    bg: '$backgroundPress',
  },
  pressStyle: {
    bg: '$backgroundPress',
  },
  variants: {
    active: {
      true: {
        backgroundColor: '$backgroundPress',
      },
    },
  },
  '$group-window-xs': {
    py: '$2.5',
  },
})

/** ------ EXAMPLE ------ */
export function FullSideBar() {
  const [triggerOpen, setTriggerOpen] = useState(false)
  const closeTrigger = useEvent(() => {
    setTriggerOpen(false)
  })
  const [openDrawer, setOpenDrawer] = useState(false)
  const { sm } = useGroupMedia('window')
  return (
    <View position="relative" flexDirection="column" height={610} width="100%" mt="$2">
      <View flexDirection="row" height="100%" width="100%">
        {!sm && <Sidebar />}
        <View
          flexDirection="row"
          px={12}
          py="$2"
          render="nav"
          items="center"
          bg="$background"
          shadowColor="$color5"
          shadowOffset={{
            width: 0,
            height: 1,
          }}
          shadowOpacity={0.18}
          shadowRadius={1.0}
          elevationAndroid={1}
          $group-window-sm={{ px: 8 }}
          flex={1}
          height={'$5'}
        >
          {sm && (
            <View
              flexDirection="row"
              {...(isWeb && {
                onKeyDown: (e: React.KeyboardEvent) => {
                  if (e.key === 'Escape') {
                    setOpenDrawer(false)
                  }
                },
              })}
            >
              <Button circular chromeless onPress={() => setOpenDrawer(!openDrawer)}>
                <Button.Icon>
                  <Menu size="$1" />
                </Button.Icon>
              </Button>
            </View>
          )}
          <View flexDirection="row" ml="auto" items="center" gap="$2">
            <Button theme="accent" circular chromeless p={0} size="$3">
              <Button.Icon>
                <Bell color="$color" size="$1" />
              </Button.Icon>
            </Button>
            <ProfileDropdown
              triggerOpen={triggerOpen}
              setTriggerOpen={setTriggerOpen}
              closeTrigger={closeTrigger}
            />
          </View>
        </View>
      </View>
      {sm && <FloatingSideBar open={openDrawer} setOpen={setOpenDrawer} />}
    </View>
  )
}

FullSideBar.fileName = 'FullSideBar'

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
        py="$1.5"
        px="$3.5"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        transition={[
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
        <DropDownItem
          hoverStyle={{
            bg: '$backgroundFocus',
          }}
          onPress={closeTrigger}
        >
          <DropDownText>Accounts</DropDownText>
        </DropDownItem>
        <DropDownItem
          hoverStyle={{
            bg: '$backgroundFocus',
          }}
          onPress={closeTrigger}
        >
          <DropDownText>Settings</DropDownText>
        </DropDownItem>
        <DropDownItem
          hoverStyle={{
            bg: '$backgroundFocus',
          }}
          onPress={closeTrigger}
        >
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
  items: 'flex-start',
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

/** SIDEBAR AND DRAWER */
function Sidebar() {
  return (
    <View
      flexDirection="column"
      height="100%"
      width={300}
      borderRightWidth={1}
      borderRightColor="$color5"
      shadowColor="$shadowColor"
    >
      <SideBarContent />
    </View>
  )
}

function FloatingSideBar({
  open,
  setOpen,
}: { open: boolean; setOpen: (open: boolean) => void }) {
  const { height, width } = useContainerDim('window')
  return (
    <View
      flexDirection="column"
      {...(isWeb && {
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Escape') {
            setOpen(false)
          }
        },
      })}
      mx={-12}
      my="$-2"
      position="absolute"
    >
      <Drawer open={open} onOpenChange={setOpen}>
        <Drawer.Overlay
          height={height + 12}
          width={width + 12}
          transition="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          z={1000000}
        />
        <Drawer.Swipeable>
          <Drawer.Content
            x={-30}
            pl={30}
            width={220}
            height={height + 20}
            enterStyle={{ x: -240 }}
            exitStyle={{ x: -260 }}
          >
            <SideBarContent />
          </Drawer.Content>
        </Drawer.Swipeable>
      </Drawer>
    </View>
  )
}

const SideBarContent = View.styleable((props, ref) => {
  return (
    <View
      flexDirection="column"
      bg="$background"
      ref={ref}
      height="100%"
      width="100%"
      {...props}
    >
      <View
        flexDirection="column"
        pl="$4"
        py="$1.5"
        justify="center"
        width="100%"
        $group-window-sm={{
          py: '$4',
        }}
      >
        <View flexDirection="row" items="center" gap="$2.5">
          <Avatar rounded="$true" size="$4" padding="$4">
            <Avatar.Image scale={0.6} src="/favicon.svg" />
            <Avatar.Fallback bg="$color11" borderColor="$color11" />
          </Avatar>
          <H4 fontSize="$6" color="$color12">
            Hi User!
          </H4>
        </View>
      </View>
      <View flexDirection="column" grow={1} bg="$background">
        <View
          bg="$backgroundFocus"
          p="$2.5"
          pl="$5"
          $group-window-gtXs={{
            pl: '$5',
          }}
        >
          <Text fontSize="$5" lineHeight="$5" fontWeight="400" color="$color12">
            Auth
          </Text>
        </View>
        <View flexDirection="column">
          <RovingFocusGroup>
            {['Sign In', 'Sign Up', 'Forgot Password', 'Reset Password'].map(
              (item, index) => (
                <RovingFocusGroup.Item key={index} focusable>
                  <NavLink pl="$5" href="#">
                    {item}
                  </NavLink>
                </RovingFocusGroup.Item>
              )
            )}
          </RovingFocusGroup>
        </View>
        <View bg="$backgroundFocus" p="$2.5" pl="$5">
          <Text fontSize="$5" lineHeight="$5" fontWeight="400" color="$color12">
            User
          </Text>
        </View>
        <View flexDirection="column">
          <RovingFocusGroup loop>
            {['Profile', 'Settings', 'Feed'].map((item, index) => (
              <RovingFocusGroup.Item key={index} focusable>
                <NavLink select="none" pl="$5" href="#">
                  {item}
                </NavLink>
              </RovingFocusGroup.Item>
            ))}
          </RovingFocusGroup>
        </View>
      </View>
    </View>
  )
})

const NavLink = Link.styleable(({ children, href = '#', onPress, ...rest }, ref: any) => {
  /**
   * use the following logic in to check if the route is active
   * const router = useRouter();
   * const currentPath = router.pathname;
   * const isActive = href === currentPath;
   */
  const isActive = false

  return (
    <Link
      ref={ref}
      onPress={(e) => {
        // Prevent page from jumping to the top on Safari when clicking a link with href="#"
        if (href === '#') e.preventDefault()
        if (onPress) onPress(e)
      }}
      href={href}
      active={isActive}
      rounded={5}
      /** uncomment this line in your app */
      // active={isActive}
      //@ts-ignore
      group="navLink"
      draggable={false}
      {...rest}
    >
      <Text
        fontSize="$5"
        fontWeight="$5"
        lineHeight="$5"
        color="$color11"
        opacity={0.7}
        // opacity={isActive ? 1 : 0.9}
        $group-navLink-hover={{
          opacity: 1,
        }}
        $group-navLink-focus={{
          opacity: 1,
        }}
        $group-window-xs={{
          fontSize: '$3',
          fontWeight: '$3',
          lineHeight: '$3',
        }}
      >
        {children}
      </Text>
    </Link>
  )
})
