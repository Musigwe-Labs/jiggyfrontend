//components import
import "./App.css"
import ErrorFallBack from "./components/error/ErrorFallBack";
import SharePost from "./components/public/home/sharePost";

//context usgae
import { AuthContextProvider } from "./contexts/AuthContext";
import { ErrorContextProvider } from "./contexts/ErrorContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PostSharingContextProvider } from "./contexts/postSharingContext";
import { HomeTabContextProvider } from "./contexts/homeTabContext";
import { WebSocketProvider } from "./contexts/webSocketContext";

export const queryClient= new QueryClient()

export const  AllContextProvider=({children})=>{

  return (
    <div className="bg-black text-white min-h-screen">
      <QueryClientProvider client={queryClient} >
        <WebSocketProvider>
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
        </WebSocketProvider>
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