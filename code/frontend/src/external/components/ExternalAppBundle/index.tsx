import React, { StatelessComponent } from 'react'

import Bundle from 'common/nav/components/Bundle'
import BundleLoadingIndicator from 'common/nav/components/BundleLoadingIndicator'

const ExternalAppBundle: StatelessComponent = () =>
  <Bundle
    load={() => System.import('../ExternalApp')}
    component={ExternalApp => <ExternalApp />}
    placeholder={() => <BundleLoadingIndicator />}
  />

export default ExternalAppBundle
