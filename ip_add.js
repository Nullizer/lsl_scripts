const fetch = require('node-fetch')
const { fetchScalewayJson } = require('./utils')
const { region, LB_ID } = require('./config')

;(async () => {
  const requests = [
    fetch('http://checkip.amazonaws.com').then(r => r.text()),
    fetchScalewayJson(`https://api.scaleway.com/lb/v1/regions/${region}/lbs/${LB_ID}/backends`)
  ]
  let [myip, response] = await Promise.all(requests)
  myip = myip.trim()
  console.log(`My current IP: ${myip}`)

  /** @type {Array<{id: string, name: string, pool: string[]}>} */
  const backends = response.backends
  backends.forEach(backend => {
    if (backend.pool.includes(myip)) {
      console.log(`My IP(${myip}) already in this backend(${backend.name}, ${backend.id})`)
    } else {
      console.log(`My IP(${myip}) NOT in this backend(${backend.name}, ${backend.id}), adding...`)
      add_ip_to_backend(myip, backend.id)
    }
  })
})()

async function add_ip_to_backend (ip, backend_id) {
  await fetchScalewayJson(
    `https://api.scaleway.com/lb/v1/regions/${region}/backends/${backend_id}/servers`, {
      method: 'post',
      body: JSON.stringify({ server_ip: [ip] })
    }
  )
}
