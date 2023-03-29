
type SeriesData = {
  id: number
  name: string
  overview: string
  poster_path: string
  backdrop_path: string
  vote_average: number
}

export function seriesDataMapper (data: SeriesData): SeriesData {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { id, name, overview, poster_path, backdrop_path, vote_average } = data
  const newData = {
    id,
    name,
    overview,
    poster_path: getFullImageUrl(poster_path),
    backdrop_path: getFullImageUrl(backdrop_path),
    vote_average: Math.round(vote_average),
  }
  return newData
}

function getFullImageUrl (path: string, size: string = 'w500') {
  return `https://image.tmdb.org/t/p/${size}${path}`
}

function _seriesDataListBuilder (ids: number[], index: Record<number, SeriesData>): SeriesData[] {
  return ids.map(id => index[id])
}

export function seriesDataListBuilder (state, slice: string) {
  const { context } = state
  return _seriesDataListBuilder(context[slice].items, context.commonIndex)
}
