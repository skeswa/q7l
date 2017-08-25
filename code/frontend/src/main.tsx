import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AdminAppBundle from 'admin/components/AdminAppBundle'
import { NotFoundPage } from 'common/error/components/NotFoundPage'
import AppPaths from 'common/nav/constants/AppPaths'
import { registerServiceWorker } from 'common/util/serviceWorker'
import ExternalAppBundle from 'external/components/ExternalAppBundle'
import StudentAppBundle from 'student/components/StudentAppBundle'

// Renders the a specific app depending on the requested path.
render(
  <Router>
    <main>
      <Switch>
        <Route path={AppPaths.Admin} component={AdminAppBundle} />
        <Route path={AppPaths.Student} component={StudentAppBundle} />
        <Route path={AppPaths.External} component={ExternalAppBundle} />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  </Router>,
  document.getElementById('root')
)

// Registers and initializes the service worker.
registerServiceWorker()
