"use client";

import Image from "next/image";
import addRoundShapeIcon from "../../../../public/images/add-rounded-shape.svg";
import logOutIcon from "../../../../public/images/logout.svg";
import { useEffect, useState } from "react";
import { AuthService } from "@/Services/AuthService";
import { MovieList } from "@/interface";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/context/useAuthContext";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function MoviesList() {
    const [allMovies, setAllMovies] = useState<MovieList[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12);
    const router = useRouter();
    const { setisAuthenticated } = useAuthContext();

    useEffect(() => {
        const getMovies = async () => {
            if (allMovies.length >= 0) {
                router.push('/')
            } else {
                const response: any = await AuthService.getMovies();
                setAllMovies(response?.data?.movies)
            }
        }
        getMovies();
    }, [])


    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        setisAuthenticated(null);
        router.push('/signIn')
    }

    const handleCreateMovies = () => {
        router.push('movies/createMovie')
    }

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    const searchParams = useSearchParams()

    const handleEdit = async (id: string) => {
        router.push(`/movies/createMovie?id=${id}`)
    }

    const handleDelete = async (id: string) => {
        const response: any = await AuthService.deleteMovie(id)
        console.log('response--------', response)
    }

    const totalPages = Math.ceil(allMovies.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems = allMovies.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-[#0a3440] relative">
            <div className="md:p-[120px] p-[24px] max-md:pt-[80px] md:pb-[150px] pb-[0px]">
                <div className="flex items-center justify-between lg:pb-[120px] pb-[80px]">
                    <div className="flex items-center gap-3">
                        <h5 className="text-white text-[48px] max-md:text-[32px] leading-[56px] max-md:leading-[40px] font-semibold">
                            My Movies
                        </h5>
                        <Image
                            src={addRoundShapeIcon}
                            alt="addRoundShapeIcon"
                            className="cursor-pointer"
                            onClick={handleCreateMovies}
                        ></Image>
                    </div>
                    <div className="flex items-center gap-3 cursor-pointer"
                        onClick={handleLogout}
                    >
                        <p className="text-white text-[16px] leading-[24px] font-bold  max-md:hidden"></p>
                        <Image src={logOutIcon} alt="logOutIcon"></Image>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-6 max-sm:gap-5">

                    {currentItems?.map((items, index) => {
                        return (
                            <div key={index} className="bg-[#092C39] relative rounded-[8px] 2xl:col-span-2 lg:col-span-3 md:col-span-4 col-span-6 p-2 max-sm:p-0">
                                <div className="flex justify-center items-center absolute right-3 top-3 h-[30px] w-[30px] bg-[#00000070] rounded-[30px]">
                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            <button className="flex justify-center items-center">
                                                <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                                </svg>
                                            </button>
                                        </AlertDialogTrigger>

                                        {/* Dialog Content */}
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Do you really want to delete this movie?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                {/* Cancel button */}
                                                <AlertDialogCancel>
                                                    <button> No
                                                    </button>
                                                </AlertDialogCancel>

                                                {/* Confirm button */}
                                                <AlertDialogAction>
                                                    <button onClick={() => handleDelete(items?.id)}>
                                                        Yes
                                                    </button>
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                                <button onClick={() => handleEdit(items?.id)}
                                    className="flex justify-center items-center absolute right-12 top-3 h-[30px] w-[30px] bg-[#00000070] rounded-[30px]">
                                    <svg className="w-5 h-5 text-gray-800 dark:text-green" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                    </svg>
                                </button>
                                <Image
                                    src={"http://192.168.1.57:13000/media/" + items?.media?.sys_filename}
                                    alt="movieImage1" width={800} height={400}
                                    className="rounded-lg h-[400px] max-sm:h-[246px] object-cover"
                                ></Image>
                                <div className="pl-4 pb-2">
                                    <p className="text-white text-[20px] max-md:text-[16px] leading-[32px] max-md:leading-[24px] font-normal pb-2 pt-4">
                                        {items?.title}
                                    </p>
                                    <p className="text-white text-[14px] leading-[24px] font-normal">
                                        {items?.publishing_year}
                                    </p>
                                </div>
                            </div>
                        )
                    })}

                </div>
                <div className="text-white py-[120px] w-full text-center">
                    <button onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}>
                        Previous Page
                    </button>
                    <label className="mx-3">
                        {currentPage} / {totalPages}
                    </label>
                    <button onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}>
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    )
}