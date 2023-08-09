import Gist from "./gist";
import GistLinks from "./gistLinks";
import HomeHeader from "./homeHeader";
import HomeInfo from "./homeInfo";
import HomeTabs from "./homeTabs";

const Home = () => {
  return (
    <div>
      <HomeHeader />
      <HomeTabs />
      <div className='text-2xl mt-4 text-gray-600'>
        <div className='mx-32 py-4 border-b border-y-[#4B5563]'>
          <HomeInfo />
          <Gist />
          <GistLinks />
        </div>
      </div>
    </div>
  )
}

export default Home
