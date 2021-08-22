import { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import { getPlacesData } from './api'
import Header from './components/Header'
import List from './components/List'
import Map from './components/Map'

const App = () => {
  const [places, setPlaces] = useState([])

  const [coords, setCoords] = useState({ lng: 0, lat: 0 })
  const [bounds, setBounds] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      setCoords ({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    console.log(coords, bounds)

    // getPlacesData()
    getPlacesData(bounds.sw, bounds.ne)
      .then((data) => {
        console.log(data)
        setPlaces(data)
      })
  }, [coords, bounds])

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={places} ы/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
