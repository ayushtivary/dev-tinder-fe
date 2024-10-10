const ProfileCards = (data, isProfile) => {
    // const { firstName, lastName, age, gender, about, photoUrl } = data?.data
    return (
        <div className="flex justify-center text-center">
            <div className="card bg-slate-200 w-96 h-[31.5rem] shadow-xl">
                <figure className="w-full h-48 rounded-full"> {/* Adjusting height for the image container */}
                    <img className=" object-contain rounded-bl-btn" src={data?.data?.photoUrl} alt="Profile" /> {/* Use object-contain to prevent cropping */}
                </figure>
                <div className="card-body">
                    <p className="text-black text-2xl font-semibold justify-center">{data?.data?.firstName + " " + data?.data?.lastName}</p>
                    <p className="text-cyan-700 text-lg font-medium justify-center">{data?.data?.gender + " " + data?.data?.age}</p>
                    <p className="text-cyan-700 text-md bg-slate-100 p-2 rounded-lg font-medium justify-start break-words overflow-y-auto h-24 custom-scrollbar text-justify">
                        {data?.data?.about}
                    </p>
                    {data.isProfile != 'requests' && data.isProfile != 'profile' &&
                        <div className="card-actions justify-center text-center mt-5">
                            <button className="btn w-4/12 btn-primary">Ignore</button>
                            <button className="btn w-4/12 btn-primary">Interested</button>
                        </div>
                    }
                    {data.isProfile == 'requests' &&
                        <div className="card-actions justify-center text-center mt-5">
                            <button className="btn w-4/12 btn-primary">Accept</button>
                            <button className="btn w-4/12 btn-primary">Reject</button>
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}

export default ProfileCards