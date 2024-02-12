import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
function timeAgo(){
   return  function useTime (ISODateTime){
        const time=new Date(ISODateTime) 
        TimeAgo.setDefaultLocale(en)// set english as the default language on the TimeAgo class.
        const userDefaultLang=navigator.language // get the user default browser language
        const timepast= new TimeAgo('en-US') //instantiate the TimeAgo class with the user default language
        const formatedTime=timePast.format(time.getTime())
        return String(formatedTime)
    }
}
export {timeAgo}