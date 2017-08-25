import React, { StatelessComponent } from 'react'

import ExternalPageLayout from '../ExternalPageLayout'
import * as styles from './index.css'

const AboutPage: StatelessComponent = () =>
  <ExternalPageLayout>
    <div className={styles.main}>This is the about page</div>
  </ExternalPageLayout>

export default AboutPage
