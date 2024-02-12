import { useLocation } from "react-router-dom"
import { useEffect, useLayoutEffect, useRef } from "react"
import { useHomeTabContext } from '../contexts/homeTabContext'
import {mountScrollListener, unmountScrollListener, scrollPage} from './scrollPage'
export default function RestoreScroll({children, tab='', deps=[]}){
    const location= useLocation()
    const { selectedTab }= useHomeTabContext()
    let path=location.pathname
    path= path=='/'? 'home' : path.slice(1)
    path= path + (tab?  '-' + tab : '') 
    return <> {children} </>
 }
export function useRestoreScroll(tab){
    useLayoutEffect(()=>{
        scrollPage(tab)       
        mountScrollListener(tab)
        return ()=>{ unmountScrollListener() }
  }, [tab])
 }