import React, { StatelessComponent } from 'react'

import Bundle from 'common/nav/components/Bundle'
import BundleLoadingIndicator from 'common/nav/components/BundleLoadingIndicator'

const AdminAppBundle: StatelessComponent = () =>
  <Bundle
    load={() => System.import('../AdminApp')}
    component={AdminApp => <AdminApp />}
    placeholder={() => <BundleLoadingIndicator />}
  />

export default AdminAppBundle
