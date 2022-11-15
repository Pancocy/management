import React from 'react'
import {Routes,Route} from 'react-router-dom'
//引入子路由
import Home from './goodSonPages/home'
import Add from './goodSonPages/add'
import Detail from './goodSonPages/detail'
import Update from './goodSonPages/update'
export default function Goods() {
  return (
    <Routes>
        <Route path='/*' element={<Home/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/add' element={<Add/>}></Route>
        <Route path='/detail' element={<Detail/>}></Route>
        <Route path='/update' element={<Update/>}></Route>
    </Routes>
  )
}
