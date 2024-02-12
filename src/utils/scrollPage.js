export function mountScrollListener (tab){
    window.onscroll=()=>{
        saveScrollPosition(tab, window.scrollY)
    }
}
export function unmountScrollListener (){
    window.onscroll=null
}
export function scrollPage(tab){
    const top= sessionStorage.getItem(tab)
    window.requestAnimationFrame(()=>{
        window.scrollTo(0, top)
  })
}
export  function setScrollPosition(tab){
    const scrollPosition =sessionStorage.getItem(tab + '-scroll-position')
    window.scrollTo(0, scrollPosition? scrollPosition : 0)
}
export  function saveScrollPosition(tab, pos){
    sessionStorage.setItem(tab, pos)
}
export function getScrollPosition(tab){
    return sessionStorage.getItem(tab)
}