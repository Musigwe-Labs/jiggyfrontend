//components import
import "./App.css"
import ErrorFallBack from "./components/error/ErrorFallBack";
import SharePost from "./components/public/home/sharePost";
// import Alert from "./components/public/Alert";

//context usgae
import { AuthContextProvider, useAuthContext } from "./contexts/AuthContext";
import { ErrorContextProvider, useErrorContext } from "./contexts/ErrorContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PostSharingContextProvider } from "./contexts/postSharingContext";
import { HomeTabContextProvider } from "./contexts/homeTabContext";

export const queryClient= new QueryClient()

export const  AllContextProvider=({children})=>{

  return (
    <div className="bg-black text-white min-h-screen">
      <QueryClientProvider client={queryClient} >
        <ErrorContextProvider>
          <AuthContextProvider>
              <PostSharingContextProvider>
                <HomeTabContextProvider>
                  <ErrorFallBack>
                    {children}
                    <SharePost />
                  </ErrorFallBack>
                </HomeTabContextProvider>
              </PostSharingContextProvider>
          </AuthContextProvider>
        </ErrorContextProvider>
      </QueryClientProvider >
    </div>
  )
}
const App = () => {
    return (
    <>
      
   </>
  )
}
export default App