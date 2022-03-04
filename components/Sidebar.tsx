import React from 'react'

const Sidebar = () => {
  return (
    <div className="flex h-screen flex-col border-r pl-6 w-72">
      <div className="mt-5 flex flex-col gap-5">
        <div>
          <span className="text-3xl font-bold text-slate-800">
            <span className="underline decoration-indigo-500 underline-offset-2">
              Chaster
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
