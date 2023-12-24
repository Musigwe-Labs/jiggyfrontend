

export  function setScrollPosition(tab){
    const scrollPosition =sessionStorage.getItem(tab + '-scroll-position')
    console.log('scroll position', scrollPosition )
    window.scrollTo(0, scrollPosition? scrollPosition : 0)
}


export  function saveScrollPosition(tab, pos){
    sessionStorage.setItem(tab, pos)
}

export function getScrollPosition(tab){
    return sessionStorage.getItem(tab)
}

export function getScrollOptions (tab){
    return {left:0, top:sessionStorage.getItem(tab), behavior:'smooth'}
}

export function mountScrollListener (tab){
    window.onscroll=()=>{
        saveScrollPosition(tab, window.scrollY)
    }
}

export function unmountScrollListener (){
    window.onscroll=null
}