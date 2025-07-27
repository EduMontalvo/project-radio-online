import { Outlet } from "react-router-dom"
const Layout = () => {
  return (
    <>
      <div className="h-screen w-screen">
        <header className="text-white font-bold p-2  ">
          <h1 className="text-2xl text-black">Radio</h1>
        </header>
        <Outlet />
      </div>
    </>
  )
}

export default Layout