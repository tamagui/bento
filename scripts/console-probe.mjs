import { chromium } from 'playwright'

const base = process.env.BENTO_URL || 'http://localhost:9000'
const skipped = new Set(['switches', 'animation-buttons'])
const requested = process.argv.slice(2)
const browser = await chromium.launch()
const index = await browser.newPage()

await index.goto(base, { waitUntil: 'networkidle', timeout: 60_000 })
const discovered = await index.evaluate(() =>
  Array.from(document.querySelectorAll('a[href^="/?group="]'), (link) =>
    new URL(link.href).searchParams.get('group')
  ).filter(Boolean)
)
await index.close()

const groups = (requested.length ? requested : discovered).filter(
  (group) => !skipped.has(group)
)

for (const group of groups) {
  for (const theme of ['light', 'dark']) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
    const issues = []

    page.on('pageerror', (error) => issues.push(`pageerror ${error.stack || error}`))
    page.on('console', async (message) => {
      if (!['warning', 'error'].includes(message.type())) return
      const args = await Promise.all(
        message.args().map(async (argument) => {
          try {
            return await argument.jsonValue()
          } catch {
            return argument.toString()
          }
        })
      )
      issues.push(`${message.type()} ${JSON.stringify(args)}`)
    })
    page.on('response', (response) => {
      if (response.status() >= 400)
        issues.push(`http ${response.status()} ${response.url()}`)
    })

    await page.goto(`${base}/?group=${group}&theme=${theme}`, {
      waitUntil: 'networkidle',
      timeout: 60_000,
    })
    await page.waitForTimeout(500)
    console.log(`${group}\t${theme}\t${issues.length}`)
    for (const issue of [...new Set(issues)]) console.log(`  ${issue}`)
    await page.close()
  }
}

await browser.close()
