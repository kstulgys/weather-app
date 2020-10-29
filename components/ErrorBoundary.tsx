import * as React from 'react'

interface Props {
  children: React.ReactNode
  render(props: { error: any; errorInfo: any }): JSX.Element
}

interface State {
  hasError: boolean
  error: any
  errorInfo: any
}

declare global {
  interface Window {
    Bugsnag: any
  }
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ hasError: true, error, errorInfo })
    console.log({ error })
    console.log({ errorInfo })
    // mybe report error to some stability monitoring platform like Bugsnag
    if (window.Bugsnag) {
      window.Bugsnag.notify(error)
    }
  }

  public render() {
    const { error, errorInfo } = this.state
    if (this.state.hasError) return this.props.render({ error, errorInfo })
    return this.props.children
  }
}
