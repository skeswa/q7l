import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AdminAppBundle from 'admin/components/AdminAppBundle'
import { NotFoundPage } from 'common/error/components/NotFoundPage'
import AppPath from 'common/nav/constants/AppPath'
import { buildRoutePath } from 'common/nav/util'
import { registerServiceWorker } from 'common/network/serviceWorker'
import ExternalAppBundle from 'external/components/ExternalAppBundle'
import StudentAppBundle from 'student/components/StudentAppBundle'

// Renders the a specific app depending on the requested path.
render(
  <Router>
    <main>
      <Switch>
        <Route
          path={buildRoutePath(AppPath.Admin)}
          component={AdminAppBundle}
        />
        <Route
          path={buildRoutePath(AppPath.Student)}
          component={StudentAppBundle}
        />
        <Route
          path={buildRoutePath(AppPath.External)}
          component={ExternalAppBundle}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  </Router>,
  document.getElementById('root')
)

// Registers and initializes the service worker.
registerServiceWorker()
