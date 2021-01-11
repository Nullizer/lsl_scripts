const { fetchScalewayJson } = require('./utils')
const { region, LB_ID } = require('./config')

;(async () => {
  const response = await fetchScalewayJson(`https://api.scaleway.com/lb/v1/regions/${region}/lbs/${LB_ID}/backends`)

  /** @type {Array<{id: string, name: string, pool: string[]}>} */
  const backends = response.backends
  const results = backends.map(backend => {
    return fetchScalewayJson(
      `https://api.scaleway.com/lb/v1/regions/${region}/backends/${backend.id}/servers`, {
        method: 'delete',
        body: JSON.stringify({ server_ip: backend.pool })
      }
    )
  })
  await Promise.all(results)
})()
