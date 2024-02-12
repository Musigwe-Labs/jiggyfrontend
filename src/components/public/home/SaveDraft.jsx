export default function SaveDraft({content, setCreatePost, setStatus, setContent } ){	
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
		</div>
	)
}