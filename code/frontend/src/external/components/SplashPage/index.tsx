import React, { StatelessComponent } from 'react'

import ExternalPageLayout from '../ExternalPageLayout'
import * as styles from './index.css'

const SplashPage: StatelessComponent = () =>
  <ExternalPageLayout>
    <div className={styles.main}>This is the splash page</div>
  </ExternalPageLayout>

export default SplashPage
