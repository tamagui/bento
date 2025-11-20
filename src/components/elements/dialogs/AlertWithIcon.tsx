import { AlertDialog, Button, Separator, View, createContext, useEvent } from 'tamagui'
import type { AlertDialogContentProps, ThemeName, ThemeTokens } from 'tamagui'
import { isValidElement, useState } from 'react'
import { Info } from '@tamagui/lucide-icons'

type AlertButton = {
  title: string
  action: () => void
  style: 'active' | 'cancel'
}

type AlertParam = {
  title: string
  message: string
  buttons: AlertButton[]
  theme?: ThemeName
  icon?: React.ReactNode
}

interface AlertDialogContextProps {
  alert: (param: AlertParam) => void
}

const [AlertProvider, useAlert] = createContext<AlertDialogContextProps>('Alert', {
  alert: () => {},
})

type AlertProps = AlertDialogContentProps & {
  children: React.ReactNode
}

const renderComponent = (Component: any) => {
  if (!Component) return null
  if (isValidElement(Component)) return Component
  return <Component />
}

const Alert = ({ children, ...rest }: AlertProps) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [buttons, setButtons] = useState<AlertButton[]>([])
  const [icon, setIcon] = useState<React.ReactNode>()
  const [theme, setTheme] = useState<ThemeName>()

  const alert = useEvent(({ title, message, buttons, icon, theme }: AlertParam) => {
    setTitle(title)
    setMessage(message)
    setButtons(buttons)
    setOpen(true)
    setIcon(renderComponent(icon))
    setTheme(theme)
  })

  const closeDialog = useEvent(() => {
    setOpen(false)
  })

  return (
    <AlertProvider alert={alert}>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            onPress={closeDialog}
            key="overlay"
            animation="quick"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            backgroundColor="rgba(0,0,0,0.5)"
          />
          <AlertDialog.Content
            theme={theme}
            p="$3"
            px="$4"
            bg="$color1"
            rounded="$8"
            gap="$3"
            key="content"
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -10, opacity: 0, scale: 0.95 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            $theme-dark={{
              borderColor: '$color2',
              borderWidth: 1,
            }}
            {...rest}
          >
            <View pb="$1" flexDirection="row" gap="$3">
              {icon}
              <View shrink={1}>
                <AlertDialog.Title fontWeight="500" fontSize={20} letterSpacing={1}>
                  {title}
                </AlertDialog.Title>
                <AlertDialog.Description opacity={0.8} shrink={1}>
                  {message}
                </AlertDialog.Description>
              </View>
            </View>
            <Separator borderColor="$color6" />
            <View flexDirection="row" gap="$5" justify="flex-end" items="center" px="$2">
              {buttons.map((button, index) => {
                const Base =
                  button.style === 'cancel' ? AlertDialog.Cancel : AlertDialog.Action
                const color = button.style === 'active' ? '$color10' : '$color'
                return (
                  <Base key={index} asChild>
                    <Button unstyled rounded={1000_000} onPress={button.action}>
                      <Button.Text
                        opacity={0.8}
                        color={color}
                        hoverStyle={{
                          opacity: 1,
                        }}
                        fontSize={15}
                      >
                        {button.title}
                      </Button.Text>
                    </Button>
                  </Base>
                )
              })}
            </View>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
      {children}
    </AlertProvider>
  )
}

const AlertDialogTest = (props: any) => {
  const { alert } = useAlert('AlertTest')

  const buttons: AlertButton[] = [
    {
      title: 'No',
      style: 'cancel',
      action: () => {
        // do some
      },
    },
    {
      title: 'Yes',
      style: 'active',
      action: () => {
        // do some
      },
    },
  ]

  return (
    <Button
      onPress={() => {
        alert({
          title: 'Warning',
          message: 'Are you sure you want to delete all your data?',
          buttons,
          icon: (
            <View y={6}>
              <Info size="$2" color="$color10" />
            </View>
          ),
          theme: 'red',
        })
      }}
    >
      Open Alert
    </Button>
  )
}

/** ---------- EXAMPLE --------- */
export const AlertWithIcon = () => {
  return (
    <Alert width={300}>
      <AlertDialogTest />
    </Alert>
  )
}

AlertWithIcon.fileName = 'AlertWithIcon'
