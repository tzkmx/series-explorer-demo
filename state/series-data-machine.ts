import { createMachine, assign } from 'xstate'
import { fetchPopularSeries, fetchRecommendedSeries } from '../api_modules/fetchers'

type Series = {
  id: string
  name: string
  description: string
  image: string
}

type SeriesInMemory = Record<string, Series>

type SeriesItemList = Array<Pick<Series, 'id'>>

type SeriesListing = {
  items: SeriesItemList
  currentPage: number
}

type SeriesDataContext = {
  commonIndex: SeriesInMemory
  popular: SeriesListing
  recommended: SeriesListing
  recent: SeriesListing
  airingToday: SeriesListing
  favoritesList: SeriesItemList
  errorMessage?: string
}

type LoadDataEvents = {
  type: 'LOAD_HOME' | 'LOAD_RECENT' | 'LOAD_AIRING_TODAY' | 'LOAD_FAVORITES'
  page: number
}

type SuccessApiFetchEvent = {
  type: 'SUCCESS_API_FETCH'
  data: Series[]
}

type ErrorApiFetchEvent = {
  type: 'ERROR_API_FETCH'
  data: Error
}

type SeriesDataEvents =
| { type: 'LOAD_NEXT_PAGE' }
| LoadDataEvents
| SuccessApiFetchEvent
| ErrorApiFetchEvent

/**
 * State machine that manages the loading of series data.
 * For each screen that needs to display a list of series, we have a state
 * that represents the loading of that list.
 * The state machine is responsible for loading the data from the API and
 * storing it in the context.
 *
 * Recent, airing today and favorites states/screens, have each
 * state, their own substates for loading (invoking the API), error and success.
 *
 * Popular and Recommended will call their substates and services in parallel,
 * because they are consumed in the same screen.
 *
 * We gonna need actions to load the next page of the paginated listings.
 *
 * On the successful fetching of any listing from the API, we gonna merge
 * every series in the commonIndex, so we can use the same object for every
 * listing. This will be done iterating on the array of results, and putting
 * in the commondIndex, with the id as the key, each series object.
 *
 * The commonIndex is a dictionary that maps the series id to the series
 * object. This way, we can use the same object for every listing, so we
 * have a cache of the series data, if it is updated is ok, but for listings
 * as favorites, we'll combine in the view the ids of the favorites with the
 * ids of the series in the commonIndex.
 */
export const seriesDataMachine = createMachine<SeriesDataContext, SeriesDataEvents>(
  {
    id: 'series-data',
    initial: 'idle',
    predictableActionArguments: true,
    context: {
      commonIndex: {},
      popular: { items: [], currentPage: 1 },
      recommended: { items: [], currentPage: 1 },
      recent: { items: [], currentPage: 1 },
      airingToday: { items: [], currentPage: 1 },
      favoritesList: [],
    },
    on: {
      LOAD_HOME: { target: 'home' },
      LOAD_RECENT: { target: 'recent.loading' },
      LOAD_AIRING_TODAY: { target: 'airingToday.loading' },
      LOAD_FAVORITES: { target: 'favorites.loading' },
    },
    states: {
      idle: {},
      home: {
        type: 'parallel',
        states: {
          popular: {
            initial: 'loading',
            states: {
              loading: {
                invoke: {
                  id: 'load-popular',
                  src: 'loadPopular',
                  onDone: 'success',
                  onError: 'error',
                },
              },
              success: {
                entry: [
                  'mergeSeries',
                  'savePopularIdList',
                ],
                on: {
                  LOAD_NEXT_PAGE: { target: 'loading' },
                },
              },
              error: {
                entry: 'setErrorMessage',
              },
            },
          },
          recommended: {
            initial: 'loading',
            states: {
              loading: {
                invoke: {
                  id: 'load-recommended',
                  src: 'loadRecommended',
                  onDone: 'success',
                  onError: 'error',
                },
              },
              success: {
                entry: [
                  'mergeSeries',
                  'saveRecommendedIdList',
                ],
                on: {
                  LOAD_NEXT_PAGE: { target: 'loading' },
                },
              },
              error: {
                entry: 'setErrorMessage',
              },
            },
          },
        },
      },
      recent: {
        initial: 'loading',
        states: {
          loading: {
            invoke: {
              id: 'load-recent',
              src: 'loadRecent',
              onDone: 'success',
              onError: 'error',
            },
          },
          success: {
            on: {
              LOAD_NEXT_PAGE: { target: 'loading' },
            },
          },
          error: {
            entry: 'setErrorMessage',
          },
        },
      },
      airingToday: {
        initial: 'loading',
        states: {
          loading: {
            invoke: {
              id: 'load-airing-today',
              src: 'loadAiringToday',
              onDone: 'success',
              onError: 'error',
            },
          },
          success: {
            on: {
              LOAD_NEXT_PAGE: { target: 'loading' },
            },
          },
          error: {
            entry: 'setErrorMessage',
          },
        },
      },
      favorites: {
        initial: 'loading',
        states: {
          loading: {
            invoke: {
              id: 'load-favorites',
              src: 'loadFavorites',
              onDone: 'success',
              onError: 'error',
            },
          },
          success: {
            on: {
              LOAD_NEXT_PAGE: { target: 'loading' },
            },
          },
          error: {
            entry: 'setErrorMessage',
          },
        },
      },
    },
  },
  {
    services: {
      loadPopular: async (_ctx, { page }: LoadDataEvents) => fetchPopularSeries(page),
      loadRecommended: async (_ctx, { page }: LoadDataEvents) => fetchRecommendedSeries(page),
    },
    actions: {
      mergeSeries: (context, event) => {
        console.log({ mergeSeries: event })
        const data = event?.data || []
        const { commonIndex } = context

        data.forEach((series) => {
          commonIndex[series.id] = series
        })
        return { commonIndex }
      },
      savePopularIdList: assign((ctx, event) => {
        const { data } = event
        const items = data.map((series) => series.id)
        const { popular: { currentPage } } = ctx
        return {
          popular: {
            items,
            currentPage: currentPage + 1,
          },
        }
      }),
      saveRecommendedIdList: assign((ctx, event) => {
        const { data } = event
        const items = data.map((series) => series.id)
        const { recommended: { currentPage } } = ctx
        return {
          recommended: {
            items,
            currentPage: currentPage + 1,
          },
        }
      }),
      setErrorMsg: assign((_ctx, event) => {
        return { errorMessage: event.data?.message }
      }),
      clearError: assign({ errorMessage: undefined }),
    },
  },
)
