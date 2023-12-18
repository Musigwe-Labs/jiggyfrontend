

export  function setScrollPosition(tab){
    const scrollPosition =sessionStorage.getItem(tab + '-scroll-position')
    console.log('scroll position', scrollPosition )
    window.scrollTo(0, scrollPosition? scrollPosition : 0)
}



export  function saveScrollPosition(tab){
    sessionStorage.setItem(tab + '-scroll-position', window.scrollY)
}
