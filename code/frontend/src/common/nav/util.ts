import AppPath from './constants/AppPath'
import { PagePath } from './constants/PagePath'

// Regular expression that matches leading whitespace and slashes.
const repeatedSlashesRegex = /^\/{2,}/

// Tells react-router that anything (or nothing) will do.
const anyNumberOfUnnamedParameters = '(.*)*'

/**
 * Assembles and returns a route path.
 * @param appPath the app path.
 * @param pagePath the optional page path.
 * @param subPaths any path parts that should follow the page and app.
 * @return a route path based on the provided path parts.
 */
export function buildRoutePath(
  appPath: AppPath,
  pagePath?: PagePath,
  ...subPaths: string[]
): string {
  const parts: string[] = [appPath.trim()]

  if (pagePath) {
    parts.push(pagePath.trim())
  }

  if (subPaths.length > 0) {
    subPaths.forEach(subPath => parts.push(subPath.trim()))
  }

  // True if building app-level route paths
  const shouldPathBeImprecise = !pagePath && subPaths.length < 1
  if (shouldPathBeImprecise) {
    parts.push(anyNumberOfUnnamedParameters)
  }

  // Compine all the parts and remove weirdness.
  const path = parts.join('/').replace(repeatedSlashesRegex, '/')

  // Ensure that the path begins with precisely one '/'.
  return path.startsWith('/') ? path : '/' + path
}
