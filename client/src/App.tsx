import { RouterProvider } from 'react-router-dom'
import { APP_ROUTES } from './routes/routes';

function App() {

  return (
    <RouterProvider router={APP_ROUTES} />
  );
}

export default App;
