const ProfileCards = (data) => {
    const { firstName, lastName, age, gender, about, photoUrl } = data.data
    return (
        <div className="flex justify-center">
            <div className="card bg-slate-200 w-96 shadow-xl h-[31.5rem]">
                <figure className="w-full">
                    <img className="w-full" src={photoUrl} alt="Shoes" />
                </figure>
                <div className="card-body">
                    <p className="text-black text-2xl font-semibold justify-center">{firstName + " " + lastName}</p>
                    <p className="text-cyan-700 text-lg font-medium justify-center">{gender + " " + age}</p>
                    <p className="text-cyan-700 text-md font-medium justify-start break-words overflow-y-auto h-24 custom-scrollbar text-justify">
                        {about}
                    </p>
                    <div className="card-actions justify-center text-center mt-5">
                        <button className="btn btn-primary">Ignore</button>
                        <button className="btn btn-primary">Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCards