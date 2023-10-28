console.log(self)
const cacheVersion='v1'

self.addEventListener("install", (event) => {

	console.log('installing serviceWorker')
	  event.waitUntil((async function(){
	  	const cache= await caches.open(cacheVersion)
	  	return cache.addAll(["./offline.html"])

	  })())
})




self.addEventListener('fetch', event=>{
		const {destination}=event.request
		console.log(event.request)

		if(destination=='image' ){
			console.log('destination: image')
			console.log(event.request)
	
			event.respondWith(
				caches.match(event.request)
				.then(match=>{
					if(match==undefined){ 
						throw new Error('source is not cached') 
					}
					else{
						console.log('match was found')
						return match	
					}
				})
				.catch(err=>{
					//when request does  not exist in the cache
					console.log(err)
					return fetch(event.request)
					.then(res=>{
						console.log('res: ', res)
						const response=res.clone()
						if(res.ok){
							caches.open(cacheVersion)
							.then(cache=>{
								cache.put(event.request, res)
							});
							return response
						}
						throw new Error(res.statusText)
						// return caches.match('/offline.html').then(match=>match)
					})
					.catch(err=>{
						console.error(err)
						return new Response() // this syntax has not been looked into properly
					})
						
				})
			)

		}
})


self.addEventListener('activate', ()=>{
	console.log('activating serviceworker')
	caches.keys()
	.then(cacheNames=>{
		return Promise.all(cacheNames.map(item=>item!=cacheVersion?caches.delete(item):null))
	})

})



