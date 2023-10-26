console.log(JSON.stringify(self))


self.addEventListener("install", (event) => {
	  event.waitUntil((async function(){
	  	const cache= await caches.open("v1")
	  	return cache.addAll(["./offline.html"])

	  })())
})




self.addEventListener('fetch', event=>{
	console.log('fecth triggered')

	event.respondWith((async function(){

		console.log('watcing fetch')
		try{
			const matches= await caches.match(event.request)
			console.log(matches)
		 // fetch(event.request)
		}catch(err){
			console.log(err)
			// return fetch(event.request)
		}
	})())
})





    
//       .then((cache) =>
//         cache.addAll([
//           "/src/components/offline.html",
//         ]),
//       ),
//   );
// });
// }