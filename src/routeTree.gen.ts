/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as StakeImport } from './routes/stake'
import { Route as DepositImport } from './routes/deposit'
import { Route as ClaimImport } from './routes/claim'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const StakeRoute = StakeImport.update({
  path: '/stake',
  getParentRoute: () => rootRoute,
} as any)

const DepositRoute = DepositImport.update({
  path: '/deposit',
  getParentRoute: () => rootRoute,
} as any)

const ClaimRoute = ClaimImport.update({
  path: '/claim',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/claim': {
      id: '/claim'
      path: '/claim'
      fullPath: '/claim'
      preLoaderRoute: typeof ClaimImport
      parentRoute: typeof rootRoute
    }
    '/deposit': {
      id: '/deposit'
      path: '/deposit'
      fullPath: '/deposit'
      preLoaderRoute: typeof DepositImport
      parentRoute: typeof rootRoute
    }
    '/stake': {
      id: '/stake'
      path: '/stake'
      fullPath: '/stake'
      preLoaderRoute: typeof StakeImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  ClaimRoute,
  DepositRoute,
  StakeRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/claim",
        "/deposit",
        "/stake"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/claim": {
      "filePath": "claim.tsx"
    },
    "/deposit": {
      "filePath": "deposit.tsx"
    },
    "/stake": {
      "filePath": "stake.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
