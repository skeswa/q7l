import React, { Component } from 'react'

/** Internal state for the `Bundle` component. */
type State = {
  moduleComponent?: Component
}

/** Properties for the `Bundle` component. */
type Props = {
  /** Function that loads the bundle module. */
  load: () => Promise<any>

  /**
   * Function that renders the placeholder. The placeholder is the element
   * shown while the bundle is loading.
   */
  placeholder: () => JSX.Element

  /** Function that renders the component being loaded. */
  component: (componentModule: any) => JSX.Element
}

/** Component used to dynamically load parts of the app. */
class Bundle extends Component<Props, State> {
  componentWillMount() {
    this.load(this.props)
  }

  async load(props: Props) {
    // Reset the module component.
    this.setState({ moduleComponent: null })

    const loadedModule = await props.load()
    this.setState({
      // Handle both es imports and common js.
      moduleComponent: loadedModule.default
        ? loadedModule.default
        : loadedModule,
    })
  }

  render() {
    return this.state.moduleComponent
      ? this.props.component(this.state.moduleComponent)
      : this.props.placeholder()
  }
}

export default Bundle
