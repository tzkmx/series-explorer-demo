import { assign, createMachine } from 'xstate'

const hardcodedCredentials = {
  maria: 'password',
  pedro: '123456',
}

type SetUsernameAction = {
  type: 'SET_USERNAME'
  username: string
}

type SetPasswordAction = {
  type: 'SET_PASSWORD'
  password: string
}

type AuthEvents =
| SetUsernameAction
| SetPasswordAction
| { type: 'LOGIN' }

type AuthContext = {
  username?: string
  password?: string
  isLoading: boolean
  error?: Error
}

export const authenticationMachine = createMachine({
  id: 'login',
  initial: 'idle',
  predictableActionArguments: true,
  schema: {
    /* eslint-disable @typescript-eslint/consistent-type-assertions */
    events: {} as AuthEvents,
    context: { isLoading: false } as AuthContext,
    /* eslint-enable @typescript-eslint/consistent-type-assertions */
  },
  context: {
    username: '',
    password: '',
    isLoading: false,
  },
  on: {
    SET_USERNAME: { actions: ['setUsername'] },
    SET_PASSWORD: { actions: ['setPassword'] },
  },
  states: {
    idle: {
      on: {
        LOGIN: { target: 'login_attempt' },
      },
    },
    login_attempt: {
      entry: 'startLoading',
      invoke: {
        id: 'validate',
        src: 'validateCredentials',
        onDone: 'success',
        onError: 'error',
      },
    },
    success: {
      entry: [
        'stopLoading',
        'goHome',
      ],
    },
    error: {
      entry: [
        'stopLoading',
        'setErrorMessage',
      ],
      on: {
        LOGIN: { target: 'login_attempt' },
      },
    },
  },
},
{
  services: {
    validateCredentials: async (context: AuthContext) => {
      const { username, password } = context
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          if ((hardcodedCredentials[username ?? ''] ?? null) === password) {
            console.log('ok')
            resolve('ok')
          } else {
            console.log('error')
            reject(Error('Invalid credentials'))
          }
        }, 1000)
      })
    },
  },
  actions: {
    goHome: () => {
      console.log('go home')
    },
    setUsername: assign(
      (_context, event: SetUsernameAction) => ({ username: event.username }),
    ),
    setPassword: assign(
      (_context, event: SetPasswordAction) => ({ password: event.password }),
    ),
    startLoading: assign({
      isLoading: true,
      error: undefined,
    }),
    stopLoading: assign({
      isLoading: false,
    }),
    setErrorMessage: assign({
      error: (_context, event) => event.data.message,
    }),
  },
},
)