import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "#", current: false },
  { name: "Leave Tracker", href: "#", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Headers() {
  return (
    <Disclosure as="nav" className="bg-sky-300">
      <div className="max-w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="145"
                height="38"
                fill="none"
                data-testid="brighthr-logo"
                viewBox="0 0 145 38"
                alt="BrightHR logo"
                className="mr-2 hidden text-brand-500 md:block"
              >
                <path
                  fill="currentColor"
                  d="M131.897 2.843V7.09c.688-.878 1.518-1.139 2.372-1.139 2.159 0 3.132 1.471 3.132 3.701v4.01h-1.874V9.676c0-1.4-.736-1.969-1.732-1.969-1.115 0-1.874.949-1.874 2.088v3.89h-1.875V3.77c0-.522.404-.926.926-.926zm8.422 3.203.142.878c.594-.949 1.377-1.091 2.159-1.091.783 0 1.543.308 1.97.735l-.855 1.637c-.379-.332-.735-.498-1.352-.498-.996 0-1.898.522-1.898 1.922v4.01h-1.922V6.971c0-.522.404-.926.926-.926zM39.014 2.891v9.442c.997-1.755 3.796-2.728 5.6-2.728 4.982 0 8.683 3.037 8.683 8.92 0 5.6-3.773 8.921-8.779 8.921-2.064 0-4.175-.688-5.504-2.728l-.284 2.348H34.79V4.694c0-.997.807-1.827 1.827-1.827h2.396zm.285 15.635c0 3.084 2.278 5.005 4.935 5.005 2.704 0 4.84-2.04 4.84-5.005 0-3.085-2.136-4.983-4.84-4.983-2.657 0-4.935 1.993-4.935 4.983m19.953-8.518.308 1.97c1.305-2.112 3.084-2.42 4.816-2.42 1.756 0 3.464.688 4.39 1.636l-1.899 3.678c-.854-.736-1.66-1.115-3.037-1.115-2.206 0-4.246 1.186-4.246 4.318v8.991H55.36v-15.23c0-.997.806-1.828 1.826-1.828zm33.57-.664 1.685 1.281-1.898 2.42c1.304 1.495 1.803 3.18 1.803 5.054 0 2.111-.807 5.077-3.607 6.358 2.847 1.423 3.535 3.464 3.535 5.646 0 4.698-3.606 7.616-8.54 7.616-4.935 0-8.636-3.013-8.636-7.616h4.175c0 2.207 2.04 3.678 4.46 3.678s4.319-1.305 4.319-3.678c0-2.372-2.23-3.44-4.342-3.416-4.437.024-8.233-3.25-8.588-7.687-.451-5.86 3.582-9.537 8.612-9.537 1.352 0 2.728.166 3.914.972l.593-.735a1.787 1.787 0 0 1 2.515-.356M81.34 18.099c0 2.965 2.017 4.744 4.46 4.744 2.42 0 4.437-1.803 4.437-4.744 0-2.942-2.017-4.817-4.436-4.817-2.468 0-4.46 1.85-4.46 4.817m19.977-15.256v9.467c1.518-1.97 3.392-2.563 5.338-2.563 4.84 0 6.975 3.298 6.975 8.304v8.992h-4.223v-8.944c0-3.108-1.637-4.437-3.867-4.437-2.492 0-4.223 2.111-4.223 4.674v8.707h-4.223V4.67c0-.996.806-1.827 1.826-1.827zm21.186 2.35v4.839h4.697v3.63h-4.745v7.378c0 1.637.902 2.42 2.207 2.42.664 0 1.423-.213 2.04-.522l1.186 3.607c-1.21.474-2.206.688-3.487.735-3.701.142-6.121-1.97-6.121-6.216v-7.402H115.1v-3.63h3.179V7.28c0-.925.712-1.708 1.637-1.803zm-51.578 6.57v15.303h4.223V9.937h-2.396c-.997 0-1.827.807-1.827 1.827m4.911-6.57c0 3.7-5.623 3.7-5.623 0 .024-3.702 5.623-3.702 5.623 0M25.728 15.75c-.308-1.068-1.423-1.495-3.321-1.329l-.64.048c-1.187.118-2.705.26-4.342.403 5.361-3.511 14.353-8.161 14.424-8.185l-.332-1.163c-.166-.617-.878-.83-1.566-.498-1.708.878-10.344 5.6-14.52 8.375C18.446 6.52 21.198.779 21.245.66L20.011.352c-.617-.166-1.353.238-1.661.902a383 383 0 0 0-5.6 12.408c-1.375-2.206-3.13-4.08-4.15-5.077-.428-.427-1.235-.332-1.78.213L5.8 9.866c.023.024 2.941 2.633 4.816 5.789-2.776.332-5.41.711-7.379 1.139-.711.142-1.28.854-1.233 1.518l.07 1.257c1.52-.427 3.892-.806 6.501-1.162a117 117 0 0 0-7.26 6.097c-.545.498-.664 1.281-.26 1.708l.83.854a109 109 0 0 1 8.114-6.903c-1.803 4.483-3.44 8.896-4.318 12.241l-.048.167c-.284 1.044.783 1.637 1.756.972l.142-.095c.333-.237 8.09-5.646 12.503-9.632 4.484-4.128 6.145-6.453 5.694-8.066m-7.236 6.358c-2.633 2.396-6.69 5.433-9.371 7.378 1.139-3.44 2.752-7.615 4.46-11.696 2.99-.332 5.837-.593 7.853-.783l.64-.047c.618-.048.926-.024 1.068.023-.142.38-.877 1.709-4.65 5.125"
                ></path>
              </svg>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    // href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-sky-400 text-white"
                        : "text-gray-300 hover:bg-sky-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a
                    // href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    // href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    // href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              // href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}