<template>
  <div
    tabindex="-1"
    class="flex items-center justify-center ju overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
      <div
        class="relative bg-white border rounded-lg drop-shadow-2xl dark:bg-gray-700"
      >
        <div v-show="props.cancelButton">
          <button
            @click="cancel"
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="popup-modal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <div class="p-6 text-center">
          <div v-if="props.iconType == 'warn'">
            <AlertCircleOutline
              class="flex justify-center text-red-500"
              :size="48"
            />
          </div>
          <div v-else>
            <InformationOutline
              class="flex justify-center text-blue-500"
              :size="48"
            />
          </div>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {{ props.message }}
          </h3>
          <button
            @click="pushPositive"
            data-modal-toggle="popup-modal"
            type="button"
            class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            :class="`bg-${props.positiveColor}-500 hover:bg-${props.positiveColor}-800 focus:ring-${props.positiveColor}-300`"
          >
            {{ props.positiveMessage }}
          </button>
          <button
            @click="pushNegative"
            data-modal-toggle="popup-modal"
            type="button"
            class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 focus:z-10"
            :class="`bg-${props.negativeColor}-500 hover:bg-${props.negativeColor}-700 focus:ring-${props.negativeColor}-300`"
          >
            {{ props.negativeMessage }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import AlertCircleOutline from "vue-material-design-icons/AlertCircleOutline.vue";
import InformationOutline from "vue-material-design-icons/InformationOutline.vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  cancelButton: { type: Boolean, default: false },
  iconType: { type: String, default: "info" },
  message: {
    type: String,
    default: "Do you wish to continue with this operation?",
  },
  positiveMessage: { type: String, default: "Yes, I'm sure" },
  negativeMessage: { type: String, default: "No, cancel" },
  positiveColor: { type: String, default: "red" },
  negativeColor: { type: String, default: "gray" },
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["positive", "negative", "cancel"]);

const pushPositive = () => {
  emit("positive");
};

const pushNegative = () => {
  emit("negative");
};

const cancel = () => {
  emit("cancel");
};
</script>
