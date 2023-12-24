import { useLocation } from "react-router-dom"
import { useEffect, useLayoutEffect, useRef } from "react"
import { getScrollPosition, saveScrollPosition } from "./scrollPage"



export default function RestoreScroll({children, tab='', deps=[]}){
   
    const location= useLocation()
    let path=location.pathname
    path= path=='/'? 'home' : path.slice(1)
    path= path + (tab?  '-' + tab : '') 
    

    const refPath=useRef(path)
    const pageRef=useRef()

    useLayoutEffect(()=>{
        window.scrollTo(0, 234)
    })

    useEffect(()=>{
        const scrollY= sessionStorage.getItem(path+'-scroll-position')
        // window.scrollTo(0, scrollY)
        window.scroll(0, 52)
        // console.log(path, 'scrollY: ' + scrollY)
        console.log('scrollHeight', window.scrollHeight)

        // window.scrollTo(0, scrollY)
    //     pageRef.current=window
    //     console.log(path, sessionStorage.getItem(path + '-scroll-position') );
    //     pageRef.current.scrollTo(0, Number(sessionStorage.getItem(path + '-scroll-position')))
    //   sessionStorage.setItem('tab', tab)
    //   sessionStorage.setItem('path', path+ '-scroll-position')

        window.onscroll=()=>{
            saveScrollPosition(path , window.scrollY)
      }
      window.onload=()=>{
        console.log('page loaded')
      }

     // .scrollTo(0, 164)
      return ()=>{
        window.onscroll=null
      } 
    
    })
  
    return <> { children } </>
  }
  


// export default function RestoreScroll({children, tab='', deps=[]}){
//     const location= useLocation()
//     let path=location.pathname.slice()
//     path=='/'? 'home' : path.slice(1)
//     path + (tab? '-'+ tab : '')

//     const refPath=useRef(path)
//     const pageRef=useRef()

//     useEffect(()=>{
//         pageRef.current=window
//         pageRef.current.scrollTo(0, sessionStorage.getItem(refPath.current + '-scroll-position' || 0) || 0)
   
//         return (selectedTab)=> {
//             console.log('unmounting: ', pageRef.current.scrollY)
//             saveScrollPosition(refPath.current, pageRef.current.scrollY)
//         }   
  
//     }, [...deps])
  
//     return <> { children } </>
//   }