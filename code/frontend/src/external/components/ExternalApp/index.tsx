import React, { StatelessComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

import { NotFoundPage } from 'common/error/components/NotFoundPage'
import AppPath from 'common/nav/constants/AppPath'
import { ExternalPagePath } from 'common/nav/constants/PagePath'
import { buildRoutePath } from 'common/nav/util'

import AboutPage from '../AboutPage'
import ContactUsPage from '../ContactUsPage'
import LoginPage from '../LoginPage'
import RegisterPage from '../RegisterPage'
import SplashPage from '../SplashPage'

const ExternalApp: StatelessComponent = () =>
  <Switch>
    <Route
      path={buildRoutePath(AppPath.External, ExternalPagePath.About)}
      component={AboutPage}
    />
    <Route
      path={buildRoutePath(AppPath.External, ExternalPagePath.ContactUs)}
      component={ContactUsPage}
    />
    <Route
      path={buildRoutePath(AppPath.External, ExternalPagePath.Login)}
      component={LoginPage}
    />
    <Route
      path={buildRoutePath(AppPath.External, ExternalPagePath.Register)}
      component={RegisterPage}
    />
    <Route
      path={buildRoutePath(AppPath.External, ExternalPagePath.Splash)}
      component={SplashPage}
    />
    <Route component={NotFoundPage} />
  </Switch>

export default ExternalApp
