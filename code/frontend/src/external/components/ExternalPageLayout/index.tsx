import React, { StatelessComponent } from 'react'
import * as styles from './index.css'

const ExternalPageLayout: StatelessComponent = ({ children }) =>
  <div className={styles.main}>
    {children}
  </div>

export default ExternalPageLayout
