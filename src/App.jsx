import './App.css'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Body from './Components/Body';
import Login from './Components/Login';
import Profile from './Components/Profile';
import { Provider } from 'react-redux';
import AppStore from './Store/AppStore';
function App() {
  return (
    <>
    <Provider store={AppStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={
            <Body />
          }>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
