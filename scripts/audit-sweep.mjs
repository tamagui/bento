// screenshot every gallery group across themes and widths for the audit.
// usage: node scripts/audit-sweep.mjs [groupId ...]  (default: all groups)
// output: audit/screenshots/<group>-<theme>-<width>.png + console error report
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = process.env.BENTO_URL || 'http://localhost:9000'
const WIDTHS = [360, 1280]
const THEMES = ['light', 'dark']

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 })
const groups =
  process.argv.length > 2
    ? process.argv.slice(2)
    : await page.evaluate(() =>
        Array.from(document.querySelectorAll('a[href^="/?group="]')).map((a) =>
          new URL(a.href).searchParams.get('group')
        )
      )

mkdirSync('audit/screenshots', { recursive: true })
const report = []

for (const group of groups) {
  for (const theme of THEMES) {
    for (const width of WIDTHS) {
      const p = await browser.newPage({ viewport: { width, height: 1400 } })
      const errs = []
      p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)))
      p.on('console', (m) => {
        if (m.type() === 'error') errs.push(`console: ${m.text().slice(0, 200)}`)
      })
      try {
        await p.goto(`${BASE}/?group=${group}&theme=${theme}`, {
          waitUntil: 'networkidle',
          timeout: 45000,
        })
        await p.waitForTimeout(900)
        await p.screenshot({
          path: `audit/screenshots/${group}-${theme}-${width}.png`,
          fullPage: true,
        })
        // horizontal overflow check at mobile width
        const overflow = await p.evaluate(
          () =>
            document.documentElement.scrollWidth - document.documentElement.clientWidth
        )
        report.push({ group, theme, width, errs, overflowPx: overflow })
        process.stdout.write(
          `✓ ${group} ${theme} ${width}${overflow > 2 ? ` OVERFLOW ${overflow}px` : ''}${errs.length ? ` ERRS ${errs.length}` : ''}\n`
        )
      } catch (e) {
        report.push({ group, theme, width, fatal: String(e).slice(0, 200) })
        process.stdout.write(`✗ ${group} ${theme} ${width}: ${String(e).slice(0, 80)}\n`)
      }
      await p.close()
    }
  }
}

writeFileSync('audit/sweep-report.json', JSON.stringify(report, null, 1))
console.log(`\nwrote audit/sweep-report.json (${report.length} entries)`)
await browser.close()
