import {useState} from 'react'
import './home.css'

const HomeTabs = () => {
    const [isAll , setIsAll] = useState(true)
    const [isTrending , setIsTrending] = useState(false)
    return (
            <div className='text-white border-b border-y-[#4B5563] flex justify-between px-20 mt-2'>
                <h2 
                    onClick={()=>{
                        setIsAll(true)
                        setIsTrending(false)
                    }}
                    className={isAll ? 'hometab border-y-[#43fff6]':'hometab border-transparent'}>All</h2>
                <h2 
                    onClick={()=>{
                        setIsTrending(true)
                        setIsAll(false)
                    }}
                    className={isTrending ? 'hometab border-y-[#43fff6]':'hometab border-transparent'}>Trending</h2>
            </div>
    )
  }
  
  export default HomeTabs