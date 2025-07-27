import { Outlet } from "react-router-dom"
const Layout = () => {
  return (
    <>
      <div className="h-screen w-screen bg-black">
        <header className="text-white font-bold p-2 border-b-2 ">
          Radio Online
        </header>
        <Outlet />
      </div>
    </>
  )
}

export default Layout