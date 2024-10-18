import Chat from './Chat';
import { Provider } from 'react-redux';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Chat />
    </Provider>
  );
};

export default App;
