<!--[Todo]GitHubのパチモンみたいになったのでデザインを少し変える-->
<template>
  <div class="lg:flex justify-center mt-10 px-2">
    <div class="lg:w-6/12">
      <div class="mb-4 w-full">
        <input
          v-model="title"
          class="w-full border px-4 py-2 rounded-lg outline-none"
          type="text"
          placeholder="Title"
        />
      </div>
      <div class="flex">
        <button
          class="rounded-t-lg py-2 w-16 text-gray-800 ml-2"
          :class="preview ? '' : 'bg-blue-200 border-t border-x'"
          v-on:click="preview = false"
        >
          Edit
        </button>
        <button
          class="rounded-t-lg py-2 w-16 text-gray-800"
          :class="preview ? 'bg-blue-200 border-t border-x' : ''"
          v-on:click="preview = true"
        >
          Preview
        </button>
        <button class="flex items-center ml-auto">
          Styling with markdowns is also supported
          <HelpCircleOutline :size="18" class="ml-1" />
        </button>
      </div>
      <div
        class="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600"
      >
        <div v-show="!preview">
          <div class="py-2 px-4 bg-white rounded-lg dark:bg-gray-800">
            <label for="editor" class="sr-only">Publish post</label>
            <textarea
              v-model="content"
              rows="8"
              class="block px-0 w-full text-sm outline-0 text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none"
              placeholder="Write an article..."
              :style="styles"
              ref="area"
            ></textarea>
          </div>
        </div>
        <div
          v-show="preview"
          class="py-2 px-4 bg-white rounded-lg h-auto"
          style="min-height: 11rem"
        >
          <vue-markdown-it class="md-container" :source="replacedContent" />
        </div>
      </div>
      <div v-for="error in errors" :key="error">
        <AlertIndicate
          class="my-2"
          theme="danger"
          :showSummary="false"
          :message="error[0]"
        ></AlertIndicate>
      </div>
      <div v-show="!isLoading" class="flex flex-row-reverse">
        <button
          v-on:click="submit(false, true)"
          class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Publish post
        </button>
        <button
          v-on:click="submit(true, false)"
          class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-gray-500 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-800 mr-2 ml-auto"
        >
          Save Draft
        </button>
        <button
          v-on:click="cancel"
          class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center black rounded-lg focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-900 hover:bg-gray-200 border border-gray-600"
        >
          Cancel
        </button>
      </div>
      <div v-show="isLoading">
        <LoadingSpinner />
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, computed, onMounted, nextTick } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import mdHelper from "@/js/helpers/mdHelper";
import postFetcher from "@/js/fetchers/postFetcher";
import AlertIndicate from "@/components/parts/AlertIndicate.vue";
import LoadingSpinner from "@/components/parts/LoadingSpinner.vue";
import VueMarkdownIt from "vue3-markdown-it";
import HelpCircleOutline from "vue-material-design-icons/HelpCircleOutline.vue";

// eslint-disable-next-line no-undef
const emit = defineEmits(["success"]);

const { replacePlainToMd } = mdHelper();
const store = useStore();
const router = useRouter();

const title = ref("");
const content = ref("");
const is_draft = ref(false);
const is_publish = ref(false);

const height = ref();
const area = ref(null);
const preview = ref(false);

const isLoading = ref(false);
const errors = ref([]);
const isSaved = ref(false); // Whether saved in DB or not
const showCancelConfirm = ref(false);
const confirmCancel = ref(false);

if (store.getters.form_post) {
  title.value = store.getters.form_post.title;
  content.value = store.getters.form_post.content;
}

/**
 * Adjust `textarea` height
 */
const resizeTextArea = () => {
  height.value = "auto";
  nextTick(() => {
    height.value = area.value.scrollHeight + "px";
  });
};

/**
 * Output CSS
 */
const styles = computed(() => {
  return {
    height: height.value,
  };
});

onMounted(() => {
  resizeTextArea();
});

watch(content, () => {
  resizeTextArea();
});

const replacedContent = computed(() => {
  return replacePlainToMd(content.value);
});

watch([title, content], () => {
  isSaved.value = false;
  registerPostData_toVuex();
});

const registerPostData_toVuex = () => {
  const data = {
    title: title.value,
    content: content.value,
    is_draft: is_draft.value,
    is_publish: is_publish.value,
  };

  store.dispatch("setForm_post", data);
};

/**
 * Call the process of posting to the API
 *
 * @param {boolean} draft
 * @param {boolean} publish
 */
const submit = async (draft, publish) => {
  is_draft.value = draft;
  is_publish.value = publish;

  isLoading.value = true;

  registerPostData_toVuex();
  const { submitPost } = postFetcher();

  try {
    const response = await submitPost();
    const result = JSON.parse(JSON.stringify(response));
    if (result) {
      emit("success", is_draft.value);

      if (draft) {
        isSaved.value = true;
      } else {
        store.dispatch("setForm_post", null);
      }
    }
  } catch (e) {
    errors.value = e.response.data.errors;
  }

  isLoading.value = false;
};

const cancel = () => {
  if (isSaved.value || confirmCancel.value) {
    showCancelConfirm.value = true;
    // [Todo] キャンセルボタン押下時に`confirmCancel`をtrueにしてもう一度このメソッドを呼び出す
    return;
  }

  store.dispatch("setForm_post", null);

  router.push(router.referrer);
};
</script>
