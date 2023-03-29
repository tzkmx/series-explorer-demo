import { FavoritesList } from '../components/FavoritesList'
import { SeriesDataMachineCtx } from '../state/series-data-machine'

export type FavoriteShowProps = {
  id: string
  name: string
  image: string
  rating: number
}

export function FavoritesScreen () {
  const favoriteShows: FavoriteShowProps[] = SeriesDataMachineCtx.useSelector(({ context }) => {
    const { favorites, favoritesList, commonIndex } = context
    return favoritesList
      .filter((favorite) => favorites[favorite]?.favorited && commonIndex[favorite])
      .map((favorite) => {
        const { id, name, poster_path: image, vote_average: rating, ...rest } = commonIndex[favorite]
        return { id, name, image, rating, ...rest }
      })
  })

  return (<FavoritesList favoriteShows={favoriteShows} />)
}
