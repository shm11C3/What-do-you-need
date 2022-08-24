<template>
  <div class="mx-2 mt-6">
    <h1 class="text-xl">Application Source Codes</h1>
    <table class="table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">Role</th>
          <th class="px-4 py-2">Link</th>
          <th class="px-4 py-2">Author</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border px-4 py-2">Frontend App</td>
          <td class="flex border px-4 py-2">
            <Github />
            <a
              href="https://github.com/shm11C3/strn-frontend"
              target="_blank"
              rel="noopener noreferrer"
              class="no-underline hover:underline text-cyan-600 dark:text-cyan-400 ml-2"
              >https://github.com/shm11C3/strn-frontend</a
            >
          </td>
          <td class="border px-4 py-2">
            <a
              href="https://github.com/shm11C3"
              target="_blank"
              rel="noopener noreferrer"
              class="no-underline hover:underline text-cyan-600 dark:text-cyan-400"
              >@shm11C3</a
            >
          </td>
        </tr>
        <tr class="bg-gray-100">
          <td class="border px-4 py-2">Backend App</td>
          <td class="flex border px-4 py-2">
            <Github />
            <a
              href="https://github.com/shm11C3/strn-backend"
              target="_blank"
              rel="noopener noreferrer"
              class="no-underline hover:underline text-cyan-600 dark:text-cyan-400 ml-2"
              >https://github.com/shm11C3/strn-backend</a
            >
          </td>
          <td class="border px-4 py-2">
            <a
              href="https://github.com/shm11C3"
              target="_blank"
              rel="noopener noreferrer"
              class="no-underline hover:underline text-cyan-600 dark:text-cyan-400"
              >@shm11C3</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import Github from "vue-material-design-icons/Github.vue";
</script>
