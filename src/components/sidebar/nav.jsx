const NavBar = ()=>{
    return (
    <>  
<div className="grid grid-cols-12">
        <div className="col-span-2 border h-screen">
            <div className="border px-8 py-3">
                <h1 className="text-center text-lg m-0">Logo</h1>
            </div>
            <div className="flex flex-col">
                <a href="#" className="py-2 px-1 border text-decoration">submenu1</a>
                <a href="#" className="py-2 px-1 border">submenu2</a>
                <a href="#" className="py-2 px-1 border">submenu3</a>
                <a href="#" className="py-2 px-1 border">submenu4</a>
            </div>
        </div>
        <div className="col-span-10 border">
            <div className="border px-8 py-3 bg-gray-100 grid grid-cols-12">
                <div className="border col-span-10 flex justify-start">Nav</div>
                <div className="border col-span-2 flex justify-end">User</div>
            </div>
        </div>
</div>
{/* 
<div className="border px-8 py-3 bg-gray-100 grid grid-cols-12">
    <div className="border col-span-3 flex justify-start"> Logo</div>
    <div className="border col-span-7 flex justify-center">Nav</div>
    <div className="border col-span-2 flex justify-end">User</div>
</div> */}
      {/*  <div cassNameName="bg-gray-800 font-sans leading-normal tracking-normal mt-12">
            <nav cassName="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">

                <div cassName="flex flex-wrap items-center">
                    <div cassName="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
                        <a href="#">
                            <span cassName="text-xl pl-2"><i cassName="em em-grinning"></i></span>
                        </a>
                    </div>

                    <div cassName="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
                        <span cassName="relative w-full">
                            <input type="search" placeholder="Search" cassName="w-full bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal"/>
                        
                            <div cassName="absolute search-icon" style={{top: '1rem', left: '.8rem'}}>
                                <svg cassName="fill-current pointer-events-none text-white w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                                </svg>
                            </div>
                        </span>
                    </div>

                    <div cassName="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
                        <ul cassName="list-reset flex justify-between flex-1 md:flex-none items-center">
                            <li cassName="flex-1 md:flex-none md:mr-3">
                                <a cassName="inline-block py-2 px-4 text-white no-underline" href="#">Active</a>
                            </li>
                            <li cassName="flex-1 md:flex-none md:mr-3">
                                <a cassName="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#">link</a>
                            </li>
                            <li cassName="flex-1 md:flex-none md:mr-3">
                                <div cassName="relative inline-block">
                                    <button onclick="toggleDD('myDropdown')" cassName="drop-button text-white focus:outline-none"> <span cassName="pr-2"><i cassName="em em-robot_face"></i></span> Hi, User <svg cassName="h-3 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg></button>
                                    <div id="myDropdown" cassName="dropdownlist absolute bg-gray-800 text-white right-0 mt-3 p-3 overflow-auto z-30 invisible">
                                        <input type="text" cassName="drop-search p-2 text-gray-600" placeholder="Search.." id="myInput" onkeyup="filterDD('myDropdown','myInput')"/>
                                        <a href="#" cassName="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i cassName="fa fa-user fa-fw"></i> Profile</a>
                                        <a href="#" cassName="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i cassName="fa fa-cog fa-fw"></i> Settings</a>
                                        <div cassName="border border-gray-800"></div>
                                        <a href="#" cassName="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i cassName="fas fa-sign-out-alt fa-fw"></i> Log Out</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
            <div cassName="flex flex-col md:flex-row">

                <div cassName="bg-gray-800 shadow-xl h-16 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48">

                    <div cassName="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
                        <ul cassName="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
                            <li cassName="mr-3 flex-1">
                                <a href="#" cassName="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                                    <i cassName="fas fa-tasks pr-0 md:pr-3"></i><span cassName="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Tasks</span>
                                </a>
                            </li>
                            <li cassName="mr-3 flex-1">
                                <a href="#" cassName="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500">
                                    <i cassName="fa fa-envelope pr-0 md:pr-3"></i><span cassName="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Messages</span>
                                </a>
                            </li>
                            <li cassName="mr-3 flex-1">
                                <a href="#" cassName="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-blue-600">
                                    <i cassName="fas fa-chart-area pr-0 md:pr-3 text-blue-600"></i><span cassName="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Analytics</span>
                                </a>
                            </li>
                            <li cassName="mr-3 flex-1">
                                <a href="#" cassName="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500">
                                    <i cassName="fa fa-wallet pr-0 md:pr-3"></i><span cassName="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Payments</span>
                                </a>
                            </li>
                        </ul>
                    </div>


                </div>
                <div cassName="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
                    <div cassName="bg-gray-800 pt-3">
                        <div cassName="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                            <h3 cassName="font-bold pl-2">Analytics</h3>
                        </div>
                    </div>
                    <div cassName="flex flex-wrap">
                        <div cassName="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div cassName="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                                <div cassName="flex flex-row items-center">
                                    <div cassName="flex-shrink pr-4">
                                        <div cassName="rounded-full p-5 bg-green-600"><i cassName="fa fa-wallet fa-2x fa-inverse"></i></div>
                                    </div>
                                    <div cassName="flex-1 text-right md:text-center">
                                        <h5 cassName="font-bold uppercase text-gray-600">Total Revenue</h5>
                                        <h3 cassName="font-bold text-3xl">$3249 <span cassName="text-green-500"><i cassName="fas fa-caret-up"></i></span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div cassName="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div cassName="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                                <div cassName="flex flex-row items-center">
                                    <div cassName="flex-shrink pr-4">
                                        <div cassName="rounded-full p-5 bg-pink-600"><i cassName="fas fa-users fa-2x fa-inverse"></i></div>
                                    </div>
                                    <div cassName="flex-1 text-right md:text-center">
                                        <h5 cassName="font-bold uppercase text-gray-600">Total Users</h5>
                                        <h3 cassName="font-bold text-3xl">249 <span cassName="text-pink-500"><i cassName="fas fa-exchange-alt"></i></span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div cassName="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
                                <div cassName="flex flex-row items-center">
                                    <div cassName="flex-shrink pr-4">
                                        <div cassName="rounded-full p-5 bg-yellow-600"><i cassName="fas fa-user-plus fa-2x fa-inverse"></i></div>
                                    </div>
                                    <div cassName="flex-1 text-right md:text-center">
                                        <h5 cassName="font-bold uppercase text-gray-600">New Users</h5>
                                        <h3 cassName="font-bold text-3xl">2 <span cassName="text-yellow-600"><i cassName="fas fa-caret-up"></i></span></h3>
                                    </div>
                                </div>
                        </div>
                        <div cassName="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div cassName="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
                                <div cassName="flex flex-row items-center">
                                    <div cassName="flex-shrink pr-4">
                                        <div cassName="rounded-full p-5 bg-blue-600"><i cassName="fas fa-server fa-2x fa-inverse"></i></div>
                                    </div>
                                    <div cassName="flex-1 text-right md:text-center">
                                        <h5 cassName="font-bold uppercase text-gray-600">Server Uptime</h5>
                                        <h3 cassName="font-bold text-3xl">152 days</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div cassName="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div cassName="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
                                <div cassName="flex flex-row items-center">
                                    <div cassName="flex-shrink pr-4">
                                        <div cassName="rounded-full p-5 bg-indigo-600"><i cassName="fas fa-tasks fa-2x fa-inverse"></i></div>
                                    </div>
                                    <div cassName="flex-1 text-right md:text-center">
                                        <h5 cassName="font-bold uppercase text-gray-600">To Do List</h5>
                                        <h3 cassName="font-bold text-3xl">7 tasks</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div cassName="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div cassName="bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500 rounded-lg shadow-xl p-5">
                                <div cassName="flex flex-row items-center">
                                    <div cassName="flex-shrink pr-4">
                                        <div cassName="rounded-full p-5 bg-red-600"><i cassName="fas fa-inbox fa-2x fa-inverse"></i></div>
                                    </div>
                                    <div cassName="flex-1 text-right md:text-center">
                                        <h5 cassName="font-bold uppercase text-gray-600">Issues</h5>
                                        <h3 cassName="font-bold text-3xl">3 <span cassName="text-red-500"><i cassName="fas fa-caret-up"></i></span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div cassName="flex flex-row flex-wrap flex-grow mt-2">
                        <div cassName="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div cassName="bg-white border-transparent rounded-lg shadow-xl">
                                <div cassName="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                    <h5 cassName="font-bold uppercase text-gray-600">Graph</h5>
                                </div>
                                <div cassName="p-5">
                                    <canvas id="chartjs-7" cassName="chartjs" width="undefined" height="undefined"></canvas>                            
                                </div>
                            </div>
                        </div>
                        <div cassName="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div cassName="bg-white border-transparent rounded-lg shadow-xl">
                                <div cassName="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                    <h5 cassName="font-bold uppercase text-gray-600">Graph</h5>
                                </div>
                                <div cassName="p-5">
                                    <canvas id="chartjs-0" cassName="chartjs" width="undefined" height="undefined"></canvas>                            
                                </div>
                            </div>
                        </div>

                        <div cassName="w-full md:w-1/2 xl:w-1/3 p-6">
                        
                            <div cassName="bg-white border-transparent rounded-lg shadow-xl">
                                <div cassName="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                    <h5 cassName="font-bold uppercase text-gray-600">Graph</h5>
                                </div>
                                <div cassName="p-5">
                                    <canvas id="chartjs-1" cassName="chartjs" width="undefined" height="undefined"></canvas>
                                </div>
                            </div>
                            
                        </div>

                        <div cassName="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div cassName="bg-white border-transparent rounded-lg shadow-xl">
                                <div cassName="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                    <h5 cassName="font-bold uppercase text-gray-600">Graph</h5>
                                </div>
                                <div cassName="p-5">
                                    <canvas id="chartjs-4" cassName="chartjs" width="undefined" height="undefined"></canvas>
                                    
                                </div>
                            </div>
                        </div>

                        <div cassName="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div cassName="bg-white border-transparent rounded-lg shadow-xl">
                                <div cassName="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                    <h5 cassName="font-bold uppercase text-gray-600">Graph</h5>
                                </div>
                                <div cassName="p-5">
                                    <table cassName="w-full p-5 text-gray-700">
                                        <thead>
                                            <tr>
                                                <th cassName="text-left text-blue-900">Name</th>
                                                <th cassName="text-left text-blue-900">Side</th>
                                                <th cassName="text-left text-blue-900">Role</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>Obi Wan Kenobi</td>
                                                <td>Light</td>
                                                <td>Jedi</td>
                                            </tr>
                                            <tr>
                                                <td>Greedo</td>
                                                <td>South</td>
                                                <td>Scumbag</td>
                                            </tr>
                                            <tr>
                                                <td>Darth Vader</td>
                                                <td>Dark</td>
                                                <td>Sith</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p cassName="py-2"><a href="#">See More issues...</a></p>

                                </div>
                            </div>
                        </div>

                        <div cassName="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div cassName="bg-white border-transparent rounded-lg shadow-xl">
                                <div cassName="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                    <h5 cassName="font-bold uppercase text-gray-600">Advert</h5>
                                </div>
                                <div cassName="p-5 text-center">


                                    <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CK7D52JJ&placement=wwwtailwindtoolboxcom" id="_carbonads_js"></script>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
    </>
)}
export default NavBar