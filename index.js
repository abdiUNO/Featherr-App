import 'react-native-gesture-handler'
import './App/Config/ReactotronConfig'
import {AppRegistry} from 'react-native'
import App from './App/Containers/App'
import bgMessaging from './App/Containers/bgMessaging' // <-- Import the file you created in (2)

AppRegistry.registerComponent('Featherr', () => App)

AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessagingService',
  () => bgMessaging,
)
