
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { NavLink } from 'react-router-dom';
import Clock from 'react-live-clock'

const navigation = [
  { name: 'watchlist', href: '/watchlist', current: true },
  { name: 'top gainers', href: '/gainers', current: false },
  { name: 'top losers', href: '/losers', current: false },
]

const Header = ({ logout }) => {

  let inactiveStyle = 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium tracking-wider'
  let activeStyle = 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium tracking-wider'

  return (
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    {/* <img
                      className="block lg:hidden h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    /> */}
                    <img
                      className="hidden lg:block h-8 w-auto"
                    //   src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                      src="tickerbigcolorfinal.png"
                      alt="theticker"
                    />
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            isActive ? activeStyle : inactiveStyle
                          }
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                  <div className="sm:flex items-center justify-self-end space-x-4 sm:ml-auto">
                    <Clock format="HH:mm:ss" interval={1000} ticking={true} style={{color: '#fff'}} />
                  </div>
                  <button onClick={logout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium tracking-wider ml-3 absolute inset-y-0 right-0 flex items-center sm:static sm:block">logout</button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col items-center">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="NavLink"
                    to={item.href}
                    className={({ isActive }) =>
                      isActive ? activeStyle : inactiveStyle
                    }
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
  )
}

export default Header;