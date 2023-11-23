import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru'
import de from 'javascript-time-ago/locale/de'
import es from 'javascript-time-ago/locale/es'
import en from 'javascript-time-ago/locale/en'


function timeAgo(){
   return  function useTime (ISODateTime){
        const time=new Date(ISODateTime) 
        
        // console.log((Date.now()-time.getTime())/(24*60*60*1000), ISODateTime)
        //add supported language list to the Timeago class
        // TimeAgo.addLocale(ru)
        // TimeAgo.addLocale(de)
        // TimeAgo.addLocale(es)
        TimeAgo.setDefaultLocale(en)// set english as the default language on the TimeAgo class.
    
        const userDefaultLang=navigator.language // get the user default browser language
        const timepast= new TimeAgo('en-US') //instantiate the TimeAgo class with the user default language
        const formatedTime=timePast.format(time.getTime())

        return String(formatedTime)
    }
}

export {timeAgo}