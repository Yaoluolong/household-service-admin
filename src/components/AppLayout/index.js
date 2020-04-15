import AppContainer from './AppContainer'
import AppBlock from './AppBlock'
import AppItem from './AppItem'

const AppLayout = {
  install: Vue => {
    Vue.component('AppContainer', AppContainer)
    Vue.component('AppBlock', AppBlock)
    Vue.component('AppItem', AppItem)
  }
}
export default AppLayout
