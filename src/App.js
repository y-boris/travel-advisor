import { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import { getPlacesData } from './api'
import Header from './components/Header'
import List from './components/List'
import Map from './components/Map'

const App = () => {
  const [places, setPlaces] = useState([])
  const [childClicked, setChildClicked] = useState(null)

  const [coords, setCoords] = useState()
  const [bounds, setBounds] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      setCoords ({ lat: latitude, lng: longitude })
    });
  }, []);

  useEffect(() => {
    setIsLoading(true)

    getPlacesData(bounds.sw, bounds.ne)
      .then((data) => {
        setPlaces(data)
        setIsLoading(false)
      })
  }, [coords, bounds])

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
