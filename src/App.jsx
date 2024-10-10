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
import Feed from './Components/Feed';
import Connections from './Components/Connections';
function App() {
  return (
    <>
    <Provider store={AppStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={
            <Body />
          }>
            <Route path='/feed' element={<Feed/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/connection' element={<Connections/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
