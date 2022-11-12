<template>
  <div class="m-5 sm:flex md:flex-auto">
    <div>
      <h1 class="text-4xl bold">404 Not Found</h1>
      <p class="text-lg">Oops! This page does not exist.</p>
    </div>
    <div class="mt-8 flex flex-row-reverse ml-auto">
      <router-link
        to="/"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Back to Top Page
      </router-link>
    </div>
  </div>
</template>
