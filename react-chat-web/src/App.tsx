import './App.scss';
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

function App() {
  return (
    <div className="App">
      {/* 使用 RouterProvider 提供的路由器对象 */}
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
