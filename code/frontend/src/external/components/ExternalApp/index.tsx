import React, { StatelessComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

import { NotFoundPage } from 'common/error/components/NotFoundPage'
import AppPaths from 'common/nav/constants/AppPaths'

import PagePaths from '../../constants/PagePaths'
import AboutPage from '../AboutPage'
import ContactUsPage from '../ContactUsPage'
import LoginPage from '../LoginPage'
import RegisterPage from '../RegisterPage'
import SplashPage from '../SplashPage'

const ExternalApp: StatelessComponent = () =>
  <Switch>
    <Route
      path={`${AppPaths.External}${PagePaths.About}`}
      component={AboutPage}
    />
    <Route
      path={`${AppPaths.External}${PagePaths.ContactUs}`}
      component={ContactUsPage}
    />
    <Route
      path={`${AppPaths.External}${PagePaths.Login}`}
      component={LoginPage}
    />
    <Route
      path={`${AppPaths.External}${PagePaths.Register}`}
      component={RegisterPage}
    />
    <Route
      path={`${AppPaths.External}${PagePaths.Splash}`}
      component={SplashPage}
    />
    <Route component={NotFoundPage} />
  </Switch>

export default ExternalApp
