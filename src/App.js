//映射路由
import React, { Fragment } from 'react'
//引入路由组件
import { Routes, Route } from 'react-router-dom'
//引入组件
import Login from './components/login/login'
import Admin from './components/admin/admin'

import memoryUtils from '../src/utils/memoryUtils'
import storageUtils from '../src/utils/storageUtils'

export default function App() {
  const user =storageUtils.getUser()
  memoryUtils.user=user
  return (
    <Fragment>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='*' element={<Admin />}></Route>
          <Route path='/*' element={<Admin />}></Route>
        </Routes>
    </Fragment>
  )
}

