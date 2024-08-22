"use client";

import { useAuthContext } from "@/context/useAuthContext";
import { LoginUser } from "@/interface";
import { AuthService } from "@/Services/AuthService";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from 'next/image';
import bottomWaveShape from "../../../../public/images/wave-shape.png";


export default function SignIn() {
    const { setisAuthenticated, setUserId } = useAuthContext();

    const formik = useFormik<LoginUser>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().min(10).max(50).required("Enter your email"),
            password: Yup.string().required("Enter your password"),
        }),
        onSubmit: async (values: any, { resetForm }) => {

            try {
                const response: any = await AuthService.userLogin(values);
                if (response.success) {
                    const token = response?.data?.token
                    localStorage.setItem('token', token)

                    const id = response?.data?.user?.id
                    localStorage.setItem('userId', id)
                    setisAuthenticated(token);
                    setUserId(id);
                }
            } catch (error) {
                console.error(error)
            }
        }
    })

    return (
        <div className="min-h-screen bg-[#0a3440] flex items-center justify-center relative">
            <div className="p-8 w-full max-w-md mx-4 pb-20">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Sign in</h2>
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-3 rounded-[10px] bg-[#224957] border border-[#183c52] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#2bcfbf] focus:border-transparent"
                            placeholder="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.touched.email && (<p className="text-red-500">{formik.errors.email}</p>)}
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full p-3 rounded-[10px] bg-[#224957] border border-[#183c52] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#2bcfbf] focus:border-transparent"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.touched.email && (<p className="text-red-500">{formik.errors.email}</p>)}
                    </div>

                    <div className="flex items-center justify-center">
                        <label htmlFor="remember-me" className="flex items-center text-sm text-gray-400">
                            <input
                                type="checkbox"
                                name="checked"
                                className="form-checkbox text-[#2bcfbf] bg-[#133544] border-[#183c52] focus:ring-[#2bcfbf]"
                                onChange={(e) => formik.setFieldValue("checked", e.target.checked)}
                                onBlur={formik.handleBlur}
                            />
                            <span className="ml-2">Remember me</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#2BD17E] text-white p-3 rounded-[10px] hover:bg-[#35bc66] transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
            <div className="fixed bottom-0 left-0 z-10 w-full">
                <Image src={bottomWaveShape} alt="image" className="w-full" priority />
            </div>
        </div>
    )
}