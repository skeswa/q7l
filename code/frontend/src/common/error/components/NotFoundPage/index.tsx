import React, { StatelessComponent } from 'react'
import * as styles from './index.css'

export const pageId = '404'

export const NotFoundPage: StatelessComponent = () =>
  <div className={styles.main}>This is the 404 page</div>
