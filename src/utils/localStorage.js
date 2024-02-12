export function getUSerLoginToken(){
    const token=JSON.parse(localStorage.getItem('login')) || ''
    return token?.key || null
  }
export function removeFieldFromLS(item){
    localStorage.removeItem(item)
  }