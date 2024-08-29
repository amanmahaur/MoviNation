import React from "react";

import { Link, NavLink } from "react-router-dom"
function Footer() {
    return (
        <footer className="shadow sticky z-50 bottom-0 bg-gray-500 bg-opacity-30 backdrop-blur-md ">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-2 lg:py-2">
                
                <div className="md:flex block items-center justify-between sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-black sm:text-center">

                        <p className="hover:underline">
                            © amankumarmahaur. All Rights Reserved.
                        </p>

                    </span>
                    <div className="flex justify-center mt-4 space-x-5 sm:justify-center sm:mt-0">
                        {/* <Link to="https://www.facebook.com/aman.mahaur.77" className="text-gray-500 hover:text-gray-900">
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 8 19"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="sr-only">Facebook page</span>
                        </Link> */}
                       

                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer