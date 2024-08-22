"use client";

import Image from "next/image";
import bottomWaveShape from "../../../../../public/images/wave-shape.png";
import downloadIcon from "../../../../../public/images/download-icon.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthService } from "@/Services/AuthService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";


export default function CreateMovie() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchParamsId = searchParams?.get("id");

    // Initialize form values
    const formik = useFormik({
        initialValues: {
            image: null,
            title: '',
            publishing_year: '',
        },
        validationSchema: Yup.object({
            image: Yup.mixed().required('Please upload your movie image'),
            title: Yup.string().min(2).max(50).required('Enter your movie title'),
            publishing_year: Yup.string().length(4, 'Year must be 4 digits').required('Enter your movie publish year'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            if (values.image) {
                formData.append('image', values.image as File);
            }
            formData.append('title', values.title);
            formData.append('publishing_year', values.publishing_year);

            try {
                let response: any;
                if (searchParamsId) {
                    // If searchParamsId is available, update the movie
                    response = await AuthService.updateMovie(searchParamsId, formData);
                    router.push('/movies');
                } else {
                    // If searchParamsId is not available, create a new movie
                    response = await AuthService.createMovie(formData);
                    if (response.success) {
                        router.push('/movies');
                    } else {
                        console.error('Failed to create movie:', response.message);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });

    useEffect(() => {
        if (searchParamsId) {
            // Fetch movie data for editing
            const fetchMovieData = async () => {
                try {
                    const response: any = await AuthService.getMovieById(searchParamsId);
                    const movie = response.data;
                    formik.setValues({
                        title: movie.title,
                        publishing_year: movie.publishing_year,
                        image: movie.media.sys_filename
                    });
                    setImageSrc(movie.media.sys_filename);
                } catch (error) {
                    console.error('Error fetching movie data:', error);
                }
            };

            fetchMovieData();
        }
    }, [searchParamsId]);

    const handleDragOver = (event: any) => {
        event.preventDefault();
    };

    const handleDrop = (event: any) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        setImageSrc(e.target.result as string);
                        formik.setFieldValue('image', file);
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setImageSrc(e.target.result as string);
                    formik.setFieldValue('image', file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBoxClick = () => {
        fileInputRef.current?.click();
    };

    const handleCancel = () => {
        router.push('/movies')
    }

    return (
        <div className="min-h-screen bg-[#0a3440] relative">
            <div className="md:p-[120px] p-[24px] max-md:pt-[80px] md:pb-[150px] pb-[0px]">
                <div className=" lg:pb-[120px] pb-[80px]">
                    <h5 className="text-white text-[48px] leading-[56px] font-semibold">
                        {searchParamsId ? 'Edit Movie' : 'Create a new movie'}
                    </h5>
                </div>
                <div className="grid grid-cols-12">
                    <div className="bg-[#224957] border-[2px] border-[#FFFFFF] border-dashed rounded-[10px] flex justify-center items-center h-[372px] lg:h-[504px] md:col-span-5 col-span-12"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={handleBoxClick}
                    >
                        {imageSrc ? (
                            <img src={`${searchParamsId ? `http://192.168.1.57:13000/media/${imageSrc}` : imageSrc}`} alt="Dropped or uploaded image" className="object-contain h-full w-full" />
                        ) : (
                            <div className="flex flex-col justify-center items-center gap-2">
                                <Image src={downloadIcon} alt="downloadIcon" />
                                <div className="text-white text-[14px] leading-[24px] font-normal">
                                    Drop an image here or click to upload
                                </div>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                    <div className="xl:pl-[120px] lg:pl-[80px] md:pl-[30px] md:col-span-5 col-span-12 max-md:pt-6">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div>
                                    <input
                                        type="text"
                                        name="title"
                                        className="w-full p-3 rounded-[10px] bg-[#224957] border border-[#183c52] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#2bcfbf] focus:border-transparent"
                                        placeholder="Title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.title && formik.touched.title && <p className="text-red-500">{formik.errors.title}</p>}
                                </div>
                                <div className="w-[65%]">
                                    <input
                                        type="text"
                                        name="publishing_year"
                                        className="w-full p-3 rounded-[10px] bg-[#224957] border border-[#183c52] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#2bcfbf] focus:border-transparent"
                                        placeholder="Publishing year"
                                        value={formik.values.publishing_year}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.publishing_year && formik.touched.publishing_year && <p className="text-red-500">{formik.errors.publishing_year}</p>}
                                </div>
                            </div>
                            <div className="flex gap-4 mt-[64px]">
                                <button type="reset" onClick={handleCancel} className="w-full border border-[#fff] py-[16px] rounded-[10px] text-[16px] font-bold leading-24px text-white">
                                    Cancel
                                </button>
                                <button type="submit" className="w-full bg-[#2BD17E] py-[16px] rounded-[10px] text-[16px] font-bold leading-24px text-white">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 z-10 w-full">
                <Image src={bottomWaveShape} alt="" className="w-full" />
            </div>
        </div>
    );
}
