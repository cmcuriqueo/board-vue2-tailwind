<template>
  <!-- color 1D2125 -->
  <nav class="bg-gray-900">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-12 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img 
              class="h-8 w-8" 
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            >
          </div>
          <div class="hidden md:block">
            <div class="ml-2 flex items-baseline space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <a 
                href="#" 
                class="bg-gray-900 text-gray-400 rounded-md px-3 py-2 text-sm font-bold"
                aria-current="page"
              >
                Dashboard
              </a>
              <a 
                href="#"
                class="ml-4 text-gray-400 hover:bg-gray-700 rounded-md px-3 py-2 text-sm "
              >
                Workspace
              </a>
              <a 
                href="#" 
                class="text-gray-400 hover:bg-gray-700 rounded-md px-3 py-2 text-sm"
              >
                Recent
              </a>
              <a 
                href="#" 
                class="text-gray-400 hover:bg-gray-700 rounded-md px-3 py-2 text-sm"
              >
                Starred
              </a>
              <a 
                href="#" 
                class="text-gray-400 hover:bg-gray-700 rounded-md px-3 py-2 text-sm"
              >
                Templates
              </a>
              <a>
                <button 
                  type="button"
                  class="hidden md:block items-center rounded-md bg-blue-500 px-3 py-2 mt-0.5 text-sm  text-black shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create
                </button>
              </a>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-8">
            <button 
              type="button"
              class="mr-4 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">View notifications</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" 
                />
              </svg>
            </button>
            <button 
              type="button"
              class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">View notifications</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="1.5"
                stroke="currentColor" 
                class="w-6 h-6"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" 
                />
              </svg>
            </button>
            <button 
              type="button"
              class="ml-4 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">View notifications</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="1.5"
                stroke="currentColor" 
                class="w-6 h-6"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.12 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" 
                />
              </svg>
            </button>
            <button 
              type="button"
              class="ml-4 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">View notifications</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="1.5"
                stroke="currentColor" 
                class="w-6 h-6"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" 
                />
              </svg>
            </button>
            <button 
              id="user-menu-button" 
              type="button"
              class="ml-4 relative rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-expanded="false" 
              aria-haspopup="true"
            >
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <img 
                class="h-8 s w-8 rounded-full"
                :src="'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'"
                alt="avatar"
              >
            </button>
          </div>
        </div>        
      </div>
    </div>
  </nav>
</template>

<script>
export default {
    // @vue/component
    name: 'HeaderBar',
    computed:   {
        
		currentUser() {
            console.log(this.$store.state.auth);
			return this.$store.state.auth.user;
		},
    }
}
</script>
