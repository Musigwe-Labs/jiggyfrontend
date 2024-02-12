import mSoftLogo from '/src/assets/microsoft.png'
export default function MSoftButton (){
	return(
		<button className="flex justify-center items-center  border py-2 px-2 gap-x-2 w-36  rounded-lg border-slate-500">
			<img className=" " src={mSoftLogo} alt="google logo"  />
			<p>Microsoft</p>
		</button>
	)
}