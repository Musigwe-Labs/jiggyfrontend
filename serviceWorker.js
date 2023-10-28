const cacheVersion='v1'
const cacheList=[
	"./src/components/offline/offline.html",
	"./src/components/offline/Inter-Regular.ttf", 
	  "./src/assets/pwa/logo.png"
]

self.addEventListener("install", (event) => {
	// console.log('installing serviceWorker')
	  event.waitUntil((async function(){
	  	const cache= await caches.open(cacheVersion)
	  	return cache.addAll(cacheList)
	  })())
})

self.addEventListener('fetch', (event)=>{
	// console.log(event.request)
	const {destination}=event.request
	event.respondWith(
		fetch(event.request)
		.then(res=>{
			const response=res.clone()
			if(!res.ok){
				// console.log(res)
			}
			return response
		})
		.catch((err)=>{
			// console.log('error: ', event.request)
			return caches.match(event.request)
			.then(match=>{
				if(match!=undefined) return match;
				return caches.match("./src/components/offline/offline.html")
			})
		})
	)
})


self.addEventListener('activate', ()=>{
	console.log('activating serviceworker')
	caches.keys()
	.then(cacheNames=>{
		return Promise.all(cacheNames.map(item=>item!=cacheVersion?caches.delete(item):null))
	})

})



