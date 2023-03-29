import Constants from 'expo-constants'
import { seriesDataMapper } from './mappers'

export async function fetchPopularSeries (page: number) {
  const API_KEY = Constants.expoConfig?.extra?.tmdbApiKey
  await wait(3000)

  return fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
  )
    .then(seriesDataPreprocessor)
}

export async function fetchRecommendedSeries (page: number) {
  const API_KEY = Constants.expoConfig?.extra?.tmdbApiKey
  await wait(2000)

  return fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`,
  )
    .then(seriesDataPreprocessor)
}

// waaaait helper to introduce delay in async functions
export async function wait (ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function seriesDataPreprocessor (res: Response) {
  const data = await res.json()
  if (data.success === false) throw new Error(data.status_message)
  return data.results.map(seriesDataMapper)
}
