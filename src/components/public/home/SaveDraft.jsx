//SaveDraft.jsx


export default function SaveDraft({content, setCreatePost, setStatus, setContent } ){
	// const {content, setCreatePost, setStatus } =depes
	console.log({content, setCreatePost, setStatus } )

	function handleSaveDraft(){
		localStorage.setItem('draft', content)
		setStatus('resolved')
		setCreatePost(false)
	}
	function handleCancel(){
		localStorage.setItem('draft', '')
		setStatus('resolved')
		setContent('')
		setCreatePost(false)
	}
	return (
		<div className="save-draft w-full flex flex-col">
			<div className="px-4 flex justify-between items-center bg-white">
				<p className="text-[#F33F5E] font-semibold text-base">Save as drafts?</p>
				<div className="flex gap-3">
					<button className="text-red-500" onClick={handleCancel}>cancel</button>
					<button className=" text-blue-500 font-bold border-blue-500 rounded-lg p-1" onClick={handleSaveDraft}>Save</button>
				</div>
			</div>
			{/*<div className="text-white bg-black">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis vitae ullam nisi impedit quasi consequuntur nam recusandae corporis eaque. Ipsa sunt voluptatum quis, dolores quibusdam, repellendus non veritatis consectetur ipsam. Qui facilis veniam quo saepe tenetur et sit dolorum ullam dolore vel tempore, iusto non tempora placeat atque modi ratione illo doloremque in temporibus magni debitis quae exercitationem aut necessitatibus. Quod, est facere! Sit est fugiat cumque repudiandae natus commodi voluptates maxime dolorum tempore possimus omnis voluptate itaque iste, aliquam, sint perspiciatis deserunt. Similique, commodi hic, fugiat velit minima adipisci odit officia, quasi non odio harum iusto qui consectetur. Eligendi voluptatem quibusdam sequi tenetur, corporis? Illum, quaerat sint voluptates corporis blanditiis perferendis saepe repellendus nobis, asperiores voluptas omnis sed similique eum ut fuga nisi, laudantium dignissimos, praesentium distinctio iste libero. Saepe repudiandae, est totam facere aut id similique repellat vero eveniet blanditiis officia delectus ex quod voluptatum nihil asperiores. Dolorem voluptas itaque dolore, enim doloremque asperiores iste odio, obcaecati rerum adipisci aliquam debitis non fugit aspernatur. Assumenda eius iure, ipsam impedit voluptatem et necessitatibus suscipit vitae ipsum, pariatur, autem deserunt totam at consequuntur similique cupiditate iste, eaque reiciendis ut inventore? Distinctio accusamus ad nam possimus blanditiis magni explicabo repudiandae aliquam, commodi odio cupiditate labore cumque fugiat aspernatur earum culpa velit. Vitae, magnam fugiat asperiores doloribus quos earum, exercitationem eum maiores, rem atque porro aliquid, placeat natus delectus eveniet! Voluptas blanditiis, aliquid magni eligendi eos, error. Veritatis aperiam, itaque in nisi optio ea cumque praesentium sequi perferendis nesciunt, nulla repellat voluptate eaque sit ab commodi. Earum sequi voluptates praesentium harum officiis ipsa eligendi tempora consequuntur provident ut rem facilis illo quidem est repudiandae quia placeat quae tenetur distinctio, quis. Velit modi, dignissimos officiis nisi totam libero, magnam odio exercitationem repellat alias veniam quos sed nemo cum quis commodi delectus odit vitae, deserunt atque placeat, quo distinctio maxime aliquid. Adipisci deserunt reiciendis, soluta ipsum unde eius itaque eaque autem vero quo laboriosam obcaecati facilis, reprehenderit dolorum eum. Id non placeat veritatis, sint cum similique temporibus odit tenetur consequatur earum eaque rem ut voluptatibus quos ad dignissimos fugiat esse modi numquam possimus, rerum facilis voluptatem at. Alias unde necessitatibus, quis expedita. Dolorum hic molestiae tempora adipisci sapiente ex ipsum iusto voluptate nobis sed reiciendis nesciunt vel necessitatibus, excepturi sequi. Ab sit veritatis enim a aliquid aspernatur suscipit ex obcaecati. Perferendis, veritatis, quo dolor labore, possimus voluptatum molestiae voluptas ipsum hic aspernatur nihil reiciendis in facere laudantium. Exercitationem explicabo tenetur error, fugit beatae ipsa autem voluptatem, rerum dolorum suscipit dicta aperiam nesciunt repellendus numquam quidem necessitatibus obcaecati voluptates et, unde quae possimus quam. Eaque eligendi quidem enim itaque odit facilis perferendis hic labore at optio quasi dicta molestiae quis amet ea natus, veritatis obcaecati voluptatem nostrum sequi tempora nisi impedit! Ducimus beatae modi, nam porro deserunt deleniti, cupiditate facilis repudiandae. Facere earum veniam, atque? Atque vitae placeat voluptates iusto magnam, quasi saepe minima voluptatum harum exercitationem officia fugiat, porro autem impedit possimus in inventore beatae? Laboriosam numquam nihil tenetur totam veritatis maiores ipsam deleniti.	</div>	*/}
		</div>
	)
}