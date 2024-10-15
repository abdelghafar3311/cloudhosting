import React from 'react'

function LoadingUtils() {
    return (
        <div className="fixed top-0 left-0 flex justify-center items-center bg-slate-800 bg-opacity-20 w-full h-full">
            <span className="w-[25px] h-[25px] border rounded-full border-slate-800 border-t-slate-200 animate-spin"></span>
        </div>
    )
}

export default LoadingUtils
