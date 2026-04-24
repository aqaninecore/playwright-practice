import { readFileSync } from 'fs'

export function getSidForUser(user: string): string {
  const storageStatePath = `../../test-data/states/${user}.json`
  const storageState = JSON.parse(readFileSync(storageStatePath, 'utf-8')) as {
    cookies?: Array<{ name?: string; value?: string }>
  }

  if (!Array.isArray(storageState.cookies)) {
    throw new Error(`Storage state for user "${user}" does not contain a valid cookies array`)
  }

  const sidCookie = storageState.cookies.find((cookie) => cookie.name === 'sid')

  if (!sidCookie?.value) {
    throw new Error(`Storage state for user "${user}" does not contain a sid cookie`)
  }

  return sidCookie.value
}
