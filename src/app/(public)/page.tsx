"use client";

import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const handleCreateMovie = () => {
        router.push('/movies/createMovie')
    }

    return (
        <>
            {/* <h5>Home</h5> */}
            <div className="min-h-screen bg-[#0a3440] flex flex-col justify-center items-center relative overflow-hidden">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                    Your movie list is empty
                </h2>
                <button onClick={handleCreateMovie} className="bg-[#2bcfbf] text-white px-6 py-3 rounded-md hover:bg-[#25b4a2] transition duration-300">
                    Add a new movie
                </button>
                <div className="absolute bottom-0 w-full">
                    <svg
                        viewBox="0 0 1440 320"
                        className="w-full h-32 sm:h-48"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#133544"
                            fillOpacity="1"
                            d="M0,160L60,154.7C120,149,240,139,360,149.3C480,160,600,192,720,176C840,160,960,96,1080,69.3C1200,43,1320,53,1380,58.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                        />
                    </svg>
                </div>
            </div>
        </>
    )
}