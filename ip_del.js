const { fetchScalewayJson } = require('./utils')
const { region, LB_ID } = require('./config')

;(async () => {
  const response = await fetchScalewayJson(`https://api.scaleway.com/lb/v1/regions/${region}/lbs/${LB_ID}/backends`)
  const backends = response.backends
})()
