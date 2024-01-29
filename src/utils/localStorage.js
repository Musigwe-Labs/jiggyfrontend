


export function getUSerLoginToken(){
    //returns the userlogin token from local storage //{key: token}
    const token=JSON.parse(localStorage.getItem('login')) || ''
    return token?.key || null
  }
  


export function removeFieldFromLS(item){
    localStorage.removeItem(item)
  }