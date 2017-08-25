import React, { StatelessComponent } from 'react'

import Bundle from 'common/nav/components/Bundle'
import BundleLoadingIndicator from 'common/nav/components/BundleLoadingIndicator'

const StudentAppBundle: StatelessComponent = () =>
  <Bundle
    load={() => System.import('../StudentApp')}
    component={StudentApp => <StudentApp />}
    placeholder={() => <BundleLoadingIndicator />}
  />

export default StudentAppBundle
