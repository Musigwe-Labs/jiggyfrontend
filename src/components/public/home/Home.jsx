/* eslint-disable react/prop-types */
import { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import HomeHeader from "./homeHeader";
import HomeTabs from "./homeTabs";
import CreatePostBtn from "./createPostBtn";
import CreatePostPage from "./createPostPage";
import { Profile } from "../../private/dashboard/Profile";
import HomeFooter from "./homeFooter";
import Trending from "./trending/Trending";
import Comment from "./comments";
import Posts from "./posts";
import axios from "../../../services/axios";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FiBookOpen, FiGlobe, FiPhone } from "react-icons/fi";
import { GiDualityMask } from "react-icons/gi";
import { BsCheckCircleFill, BsFileWordFill } from "react-icons/bs";
import Spinner from '../../common/Spinner'
import { useAuthContext } from "../../../contexts/AuthContext";
import { useErrorContext } from "../../../contexts/ErrorContext";
import ChatCircle from "../../../assets/chatCircle.svg"
import Connect from "../../../assets/Connect.svg"
import FireSimple from "../../../assets/fireSimple.svg"
import Eye from "../../../assets/Eye.svg"

import { useQuery, useQueryClient, QueryClient} from '@tanstack/react-query'
import { getPosts, getUser } from "../../../utils/user";
import { saveScrollPosition, setScrollPosition, getScrollOptions, mountScrollListener, unmountScrollListener } from "../../../utils/scrollPage";
import RestoreScroll from "../../../utils/restoreScroll";
import { useHomeTabContext } from "../../../contexts/homeTabContext";

const Home = () => {
  const [createPost, setCreatePost] = useState(false);
  const [profilePage, setProfilePage] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [isAll, setIsAll] = useState(false);
  const [initialPosts, setInitialPosts] = useState([]);
 const {selectedTab}= useHomeTabContext()
 console.log(selectedTab)
  // const { isRecievedData, setIsRecievedData } = useWebSocket();
  // const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState("");
  // const [userDetails, setUserDetails] = useState();
  const [selectedSchool, setSelectedSchool] = useState("ALL");
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(undefined);

  const navigate = useNavigate();
  const { key } =useAuthContext()
  const {setAppError} = useErrorContext()
  
  //using react-query to handle fetching posts 
const {isPending:isLoading, data:postsResult, error }=useQuery({
    queryKey:['posts', currentPageIndex], 
    queryFn:getPosts
  })
  
  //memoized destructured data to prevent infinite rerender issue
  const posts = useMemo(() => (postsResult? [...postsResult.data.results] : postsResult) , [postsResult]); 
  

    //using react-query to handle fetching userdetails 
  const { data:userDataResult, error:userDetailsError }=useQuery({
    queryKey:['userDetails', key], 
    queryFn:getUser
  })
    //memoized destructured data to prevent infinite rerender issue
  const userDetails= useMemo(() => (userDataResult? {...userDataResult.data} : userDataResult) , [userDataResult]); 


  const handlePostClick = (post, index) => {
    setSelectedPost(post);
    setSelectedPostIndex(post);
  };

  useLayoutEffect(()=>{
    console.log('scrolling layoue') 
    sessionStorage.setItem('tab', selectedTab)

  }, [selectedTab])
    
  //mount and unmount scroll Listener
  useEffect(()=>{
    const scrollOptions=getScrollOptions('home-'+ selectedTab)
    window.scrollTo(getScrollOptions)
    mountScrollListener('home-' + selectedTab)
    return ()=>{ unmountScrollListener() }
  },[selectedTab])

  useEffect(() => {

    
    
      if(key==null){
        navigate('/login')
      }
      const fetchPosts = async () => {
        try {
          const response = await axios.get(
            `annon/posts/paginated/?page=${currentPageIndex}`
            );
          setAppError(null)
          setInitialPosts([...initialPosts, ...response.data.results]);
          // setPosts([...posts, ...response.data.results]);
          setHasMorePosts(Boolean(response.data.next));
          // setIsRecievedData(false);init
          // setIsLoading(false);
        } catch (err) {
          console.log('%c error in loading paginated posts in useEffect', err )
          // setError(err.message);
          setAppError(err)
        }
      }
    

    if(userDetails!=null && !error){
      // fetchPosts()
    } 

    if(Boolean(posts)){
      //The posts is fetched and its stored in state using the tanstack/react-query Api
      setInitialPosts([...initialPosts, ...posts]);
      setHasMorePosts(Boolean(postsResult))
      setAppError(null)
    }else if(error){
      setAppError(error)
    } 

    if(Boolean(userDetails)){
    }else if(userDetailsError){
      setAppError(userDetailsError)
    }

  }, [currentPageIndex, key, userDetails, error, selectedTab]);

  //Ajax
  const reloadPosts = () => {
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://jiggybackend.com.ng/annon/posts?page=${currentPageIndex}`,
      true
    );
    xhr.onload = function () {
      if (xhr.status === 200) {
        let response = JSON.parse(this.response);
        setPosts(response.results);
      }
    };
    xhr.send();
  };

  //School filtering
  let handleSchoolFilter = (school) => {
    setSelectedSchool(school.toUpperCase());
    if (school !== "all" && initialPosts.length > 0) {
      let schoolPosts = initialPosts.filter(
        (post) =>
          post.user.school &&
          post.user.school.school_acronym.toLowerCase() === school.toLowerCase()
      );
      setPosts(schoolPosts);
    } else setPosts(initialPosts);
  };

  if(!key){
    return <Spinner />
  }

  if (createPost) {
    return (
      <CreatePostPage
        reloadPosts={reloadPosts}
        setCreatePost={setCreatePost}
      />
    );
  }

  return (
    <>
      {
        !key? <Spinner />
        :createPost? <CreatePostPage
        reloadPosts={reloadPosts}
        setCreatePost={setCreatePost}
        />
      :<>
            <div className="grow">
            {profilePage ? (
              <Profile setProfilePage={setProfilePage} userDetails={userDetails} />
            ) : (
              ""
            )}
            <div className="sticky top-0 bg-black">
              <HomeHeader
                setProfilePage={setProfilePage}
                userDetails={userDetails}
              />
              <HomeTabs />

              {userDetails && (
                <div className="my-2 ml-4 flex relative">
                  <span
                    className="flex items-center border-b-2 px-1 border-y-[#00CCCC]"
                    onClick={() => setIsAll(!isAll)}
                  >
                    <p className="text-[#00CCCC] font-bold mr-1">
                      {selectedSchool}
                    </p>
                    {isAll ? (
                      <FaAngleUp color="gray" size={17} />
                    ) : (
                      <FaAngleDown color="gray" size={17} />
                    )}
                  </span>
                  <div
                    className={`border rounded-3xl rounded-tl-none absolute top-full transition-[all_.3s_ease] bg-[linear-gradient(0deg,_#000000d3,_#000000d3),linear-gradient(0deg,_#490A0Ad3,_#490A0Ad3)] w-32 overflow-hidden ${
                      !isAll ? "h-0 border-transparent" : "h-24 border-[#490A0A]"
                    }`}
                  >
                    <div
                      className="flex justify-between p-2 cursor-pointer items-center"
                      onClick={() => handleSchoolFilter("all")}
                    >
                      <FiGlobe size={20} color="#752626" />
                      <p
                        className="opacity-70"
                        style={{ textShadow: "0 0 2px #490A0A" }}
                      >
                        ALL
                      </p>
                      <BsCheckCircleFill
                        fill="#8D6666"
                        className="border-[1px] border-solid border-[#490A0A] rounded-full"
                      />
                    </div>
                    <div
                      onClick={() =>
                        handleSchoolFilter(userDetails.user.school.school_acronym)
                      }
                      className="flex justify-between p-2 cursor-pointer items-center mb-2"
                    >
                      <FiBookOpen size={20} fill="#752626" />
                      <p
                        className="opacity-70"
                        style={{ textShadow: "0 0 2px #490A0A" }}
                      >
                        {userDetails && userDetails.user.school.school_acronym}
                      </p>
                      <BsCheckCircleFill
                        fill="#BA3131"
                        className="border-[1px] border-solid border-[#490A0A] rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* test here */}
          {/* <div className="mx-4  md:mx-16 p-3 transition-all duration-300 ease-linear  border-b border-y-[#4B5563]">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img className="w-6 rounded-3xl mr-3" src="/src/assets/profile_pics/pic1.png" alt="profile-img" />
                <h4 className="text-white mr-2 text-base font-bold">Richard_763</h4>
                <span className="border border-gray-400"></span>
                <p className="px-1 text-sm text-gray-400">RSU</p>
                <span className="border border-gray-400"></span>
                <span className="text-sm text-gray-400 ml-2">2ds</span>
                </div>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M456 231a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 280a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 280a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"></path></svg>
                </div>
                <p className="text-base text-[7.5px] w-fit mt-2 border-[2px] font-semibold px-2 rounded-full Question">Question</p>
                <a href="/comment/112">
                  <div>
                    <p className="cursor-pointer break-words false text-white mt-3  overflow-scroll">hello Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio consequatur voluptatibus quae culpa incidunt necessitatibus eos error vero reiciendis rerum? Impedit labore laboriosam,
                    </p>
                  </div>
                </a>
                <div className="more flex justify-between items-center ">
                  <img src={ChatCircle} width={15} height={15} alt="comments" />
                  
                  {/* <img src={FireSimple} width={17} height={20} alt="votes" /> */}
                  {/* <img src={Eye} height={20} alt="views" />
                  <img src={Connect} width={15} height={15} alt="share" />

                </div>
          
        
          </div> */} 
              {selectedTab === "all" ? (
                  // <Posts
                  //   posts={posts || []}
                  //   error={error}
                  //   setError={null}
                  //   onPostClick={handlePostClick}
                  //   isLoading={isLoading}
                  //   setCurrentPageIndex={setCurrentPageIndex}
                  //   selectedSchool={selectedSchool}
                  //   hasMorePosts={hasMorePosts}
                  // />
                  <div class="test">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ad at ullam cupiditate sequi numquam? Voluptatem iusto labore dignissimos libero error minima excepturi laborum, tenetur qui iure suscipit tempora voluptates deleniti vitae. Officia odio quo aspernatur! Consectetur deserunt saepe, illo esse delectus provident cum voluptatem sapiente quod aspernatur sequi repudiandae facere quidem, blanditiis assumenda distinctio, dicta repellendus odio! Repellat cupiditate officia placeat quibusdam, similique itaque illo! Fugiat minus magni quos.</p>
    
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum voluptates repellat optio qui aperiam, consequuntur laborum odit, ipsa placeat inventore deserunt! Eum, nesciunt in? Animi repellat totam hic tempore qui veritatis quos vel, et aut doloremque repellendus id quisquam quas magni, provident sed repudiandae illo adipisci architecto dolorem numquam, ducimus non modi! Quia numquam repellat eos tempora, illo iste voluptatibus! Architecto ab amet expedita? Eligendi veniam commodi soluta reiciendis nobis ex minima blanditiis. Possimus nulla facilis labore incidunt similique saepe enim voluptatum, officiis obcaecati nihil a, necessitatibus minus optio tenetur assumenda distinctio libero iusto impedit soluta in, doloribus voluptatibus quas? Praesentium unde, ullam autem itaque explicabo veritatis quae consequuntur aperiam nihil, aspernatur, quibusdam sed reprehenderit mollitia! Quos obcaecati quam in repellat cupiditate porro, esse quisquam inventore est incidunt natus similique, sequi reiciendis quasi delectus ad deserunt voluptas quis consectetur quod ullam vero totam iusto debitis. Quasi ea vel beatae, delectus quibusdam esse porro asperiores tenetur animi voluptas unde dolor inventore a amet sapiente tempora nulla commodi hic corrupti nemo! Rem, modi repudiandae. Expedita suscipit in totam ut ex ab veritatis cum aliquid magni sapiente iure rerum voluptatem molestiae quae voluptas doloribus, autem quos quis possimus magnam. Neque tempora rerum vero necessitatibus in aut consectetur porro enim est voluptatum nulla, reiciendis sed excepturi, asperiores quidem nemo illo dignissimos placeat dolorum ex minima expedita, at ut. Odio dolore corrupti quibusdam quisquam soluta qui consequatur in repudiandae, exercitationem consequuntur reiciendis sed fuga distinctio voluptatum commodi dolores dolor pariatur quia eveniet nisi nemo, a cum ad! Quis, nemo sint quisquam, minima aliquam quae accusamus aspernatur maiores modi iste blanditiis eaque. Quas blanditiis recusandae asperiores dolorum! Nostrum alias ut nesciunt quo dolore voluptatem modi tempore at mollitia velit quos ab labore nisi ullam cumque quasi, ipsum fugiat suscipit numquam voluptatibus quod iste quisquam beatae minus. Atque animi voluptas aut tenetur eligendi, quod in debitis blanditiis illo, quibusdam minima repudiandae perspiciatis laboriosam, minus ipsam placeat quia dignissimos provident est voluptate nulla. Facilis sunt distinctio aliquam est quisquam eum animi id temporibus. Nesciunt culpa, quam vero totam illo eaque repellat labore illum perspiciatis numquam sapiente provident a odit vitae fuga repellendus ut soluta sint aperiam! Praesentium accusantium totam ut! A, laborum quae quis, aperiam minus, inventore totam pariatur veniam animi eos cumque asperiores quam eius non porro soluta nostrum. Sed voluptatem id cum hic, at sapiente temporibus. Officiis quas atque, voluptatum dolor voluptate voluptates suscipit odio eveniet quos autem unde dicta alias totam quo deserunt aut placeat obcaecati saepe quia praesentium corrupti, culpa nulla! Quidem, distinctio deleniti fuga expedita autem ab suscipit ea accusantium possimus ipsum reiciendis a quae eaque fugiat, doloremque rem rerum omnis! Consectetur, veniam sint! Earum culpa ullam rem facilis in, voluptates asperiores et eos magnam optio dolore vero, unde quod nam sit cum debitis voluptas at nihil? Impedit, neque totam. Esse perspiciatis non nam ad neque laborum. Necessitatibus iusto facilis veniam dicta incidunt provident repudiandae officiis voluptatem dolor eius earum laudantium nesciunt deleniti possimus quam nobis ipsam, vitae ducimus delectus perspiciatis! Eveniet accusamus aut repellat debitis voluptate delectus nesciunt consequuntur, aspernatur deleniti pariatur perspiciatis odit voluptatem ex ducimus id nisi! Debitis quo eius, porro repudiandae accusantium culpa laudantium quos aut earum, facilis quisquam odio rem magni quasi sunt, non commodi? Est omnis vero accusantium, ad dicta commodi corporis cumque, possimus quod ipsam, et praesentium minima saepe inventore tempora non voluptas doloribus voluptatum veniam voluptate aliquid a! Enim sunt aliquam aliquid dolor rerum natus tempora explicabo. Totam sint quisquam sit quam officiis laudantium modi quibusdam accusantium ab, nesciunt ipsa quo placeat assumenda adipisci fugiat fugit blanditiis alias dolores voluptatibus, voluptatum rerum. Id quod quo nemo mollitia, illo sunt perspiciatis assumenda sint est, totam similique. Earum tempora vitae sequi architecto amet nam obcaecati ratione ipsam veritatis repudiandae, molestiae autem officiis deleniti adipisci similique esse nisi vel mollitia a suscipit consequatur voluptatem beatae! Eius ex maiores eveniet, repudiandae labore consectetur, esse iste, id iusto corporis ea mollitia optio dolores cupiditate harum. Impedit saepe consequatur necessitatibus, earum temporibus a enim repellendus mollitia ipsam, similique dolorem beatae, dolorum eveniet? Debitis unde eius iste, quod dolore labore adipisci nobis ullam qui quis dolorum! Alias incidunt omnis dignissimos dolorem possimus rerum quis libero fugiat consequatur, sint dolore, velit dolorum iure!
  </div>
                
              ) : (
                  // <Trending posts={posts} />
                  <div class="test">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ad at ullam cupiditate sequi numquam? Voluptatem iusto labore dignissimos libero error minima excepturi laborum, tenetur qui iure suscipit tempora voluptates deleniti vitae. Officia odio quo aspernatur! Consectetur deserunt saepe, illo esse delectus provident cum voluptatem sapiente quod aspernatur sequi repudiandae facere quidem, blanditiis assumenda distinctio, dicta repellendus odio! Repellat cupiditate officia placeat quibusdam, similique itaque illo! Fugiat minus magni quos.</p>
    
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum voluptates repellat optio qui aperiam, consequuntur laborum odit, ipsa placeat inventore deserunt! Eum, nesciunt in? Animi repellat totam hic tempore qui veritatis quos vel, et aut doloremque repellendus id quisquam quas magni, provident sed repudiandae illo adipisci architecto dolorem numquam, ducimus non modi! Quia numquam repellat eos tempora, illo iste voluptatibus! Architecto ab amet expedita? Eligendi veniam commodi soluta reiciendis nobis ex minima blanditiis. Possimus nulla facilis labore incidunt similique saepe enim voluptatum, officiis obcaecati nihil a, necessitatibus minus optio tenetur assumenda distinctio libero iusto impedit soluta in, doloribus voluptatibus quas? Praesentium unde, ullam autem itaque explicabo veritatis quae consequuntur aperiam nihil, aspernatur, quibusdam sed reprehenderit mollitia! Quos obcaecati quam in repellat cupiditate porro, esse quisquam inventore est incidunt natus similique, sequi reiciendis quasi delectus ad deserunt voluptas quis consectetur quod ullam vero totam iusto debitis. Quasi ea vel beatae, delectus quibusdam esse porro asperiores tenetur animi voluptas unde dolor inventore a amet sapiente tempora nulla commodi hic corrupti nemo! Rem, modi repudiandae. Expedita suscipit in totam ut ex ab veritatis cum aliquid magni sapiente iure rerum voluptatem molestiae quae voluptas doloribus, autem quos quis possimus magnam. Neque tempora rerum vero necessitatibus in aut consectetur porro enim est voluptatum nulla, reiciendis sed excepturi, asperiores quidem nemo illo dignissimos placeat dolorum ex minima expedita, at ut. Odio dolore corrupti quibusdam quisquam soluta qui consequatur in repudiandae, exercitationem consequuntur reiciendis sed fuga distinctio voluptatum commodi dolores dolor pariatur quia eveniet nisi nemo, a cum ad! Quis, nemo sint quisquam, minima aliquam quae accusamus aspernatur maiores modi iste blanditiis eaque. Quas blanditiis recusandae asperiores dolorum! Nostrum alias ut nesciunt quo dolore voluptatem modi tempore at mollitia velit quos ab labore nisi ullam cumque quasi, ipsum fugiat suscipit numquam voluptatibus quod iste quisquam beatae minus. Atque animi voluptas aut tenetur eligendi, quod in debitis blanditiis illo, quibusdam minima repudiandae perspiciatis laboriosam, minus ipsam placeat quia dignissimos provident est voluptate nulla. Facilis sunt distinctio aliquam est quisquam eum animi id temporibus. Nesciunt culpa, quam vero totam illo eaque repellat labore illum perspiciatis numquam sapiente provident a odit vitae fuga repellendus ut soluta sint aperiam! Praesentium accusantium totam ut! A, laborum quae quis, aperiam minus, inventore totam pariatur veniam animi eos cumque asperiores quam eius non porro soluta nostrum. Sed voluptatem id cum hic, at sapiente temporibus. Officiis quas atque, voluptatum dolor voluptate voluptates suscipit odio eveniet quos autem unde dicta alias totam quo deserunt aut placeat obcaecati saepe quia praesentium corrupti, culpa nulla! Quidem, distinctio deleniti fuga expedita autem ab suscipit ea accusantium possimus ipsum reiciendis a quae eaque fugiat, doloremque rem rerum omnis! Consectetur, veniam sint! Earum culpa ullam rem facilis in, voluptates asperiores et eos magnam optio dolore vero, unde quod nam sit cum debitis voluptas at nihil? Impedit, neque totam. Esse perspiciatis non nam ad neque laborum. Necessitatibus iusto facilis veniam dicta incidunt provident repudiandae officiis voluptatem dolor eius earum laudantium nesciunt deleniti possimus quam nobis ipsam, vitae ducimus delectus perspiciatis! Eveniet accusamus aut repellat debitis voluptate delectus nesciunt consequuntur, aspernatur deleniti pariatur perspiciatis odit voluptatem ex ducimus id nisi! Debitis quo eius, porro repudiandae accusantium culpa laudantium quos aut earum, facilis quisquam odio rem magni quasi sunt, non commodi? Est omnis vero accusantium, ad dicta commodi corporis cumque, possimus quod ipsam, et praesentium minima saepe inventore tempora non voluptas doloribus voluptatum veniam voluptate aliquid a! Enim sunt aliquam aliquid dolor rerum natus tempora explicabo. Totam sint quisquam sit quam officiis laudantium modi quibusdam accusantium ab, nesciunt ipsa quo placeat assumenda adipisci fugiat fugit blanditiis alias dolores voluptatibus, voluptatum rerum. Id quod quo nemo mollitia, illo sunt perspiciatis assumenda sint est, totam similique. Earum tempora vitae sequi architecto amet nam obcaecati ratione ipsam veritatis repudiandae, molestiae autem officiis deleniti adipisci similique esse nisi vel mollitia a suscipit consequatur voluptatem beatae! Eius ex maiores eveniet, repudiandae labore consectetur, esse iste, id iusto corporis ea mollitia optio dolores cupiditate harum. Impedit saepe consequatur necessitatibus, earum temporibus a enim repellendus mollitia ipsam, similique dolorem beatae, dolorum eveniet? Debitis unde eius iste, quod dolore labore adipisci nobis ullam qui quis dolorum! Alias incidunt omnis dignissimos dolorem possimus rerum quis libero fugiat consequatur, sint dolore, velit dolorum iure!
  </div>
             
              )}
            

            {userDetails && <CreatePostBtn setCreatePost={setCreatePost} />}
          </div>
          <HomeFooter />
       </>
      }
      
    </>
  );
};

export default Home;
