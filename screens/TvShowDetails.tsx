import { TvShowView } from '../components/TvShowView'
import { SeriesDataMachineCtx } from '../state/series-data-machine'

export function TvShowDetails ({ route }) {
  const { seriesId } = route.params
  const serieData = SeriesDataMachineCtx.useSelector(({ context }) => {
    const { commonIndex } = context
    return commonIndex[seriesId]
  })
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { name, poster_path, overview } = serieData
  return (
    <TvShowView
        name={name}
        image={poster_path}
        description={overview}
        seasons={2}
    />
  )
}
