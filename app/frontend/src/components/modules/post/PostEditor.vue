<!--[Todo]GitHubのパチモンみたいになったのでデザインを少し変える-->
<template>
  <div>
    <div v-show="!showDraftList">
      <div class="lg:flex justify-center mt-10 px-2">
        <div class="lg:w-6/12">
          <div v-show="isSaved">
            <AlertIndicate
              class="my-2"
              theme="info"
              :showSummary="false"
              message="Successfully saved!"
            />
          </div>
          <div class="flex flex-row-reverse">
            <button
              class="text-blue-500 hover:text-blue-400 hover:underline"
              @click="changeShowDraftList"
            >
              View saved drafts
            </button>
          </div>
          <div class="mb-4 w-full">
            <input
              v-model="title"
              class="w-full border px-4 py-2 rounded-lg outline-none"
              type="text"
              placeholder="Title"
            />
            <div
              v-show="showRequireErrors || titleValidationErrors"
              v-for="error in titleValidationErrors.concat(titleRequired)"
              :key="error"
            >
              <p class="text-red-600">{{ error }}</p>
            </div>
          </div>
          <div class="mb-4">
            <label
              for="categories"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >Category</label
            >
            <select
              v-model="category"
              class="border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option
                selected
                :value="null"
                class="text-lg text-white bg-gray-300"
                disabled
              >
                Please select a category
              </option>
              <option
                v-for="category_form in categories"
                :key="category_form"
                :value="category_form.uuid"
                class="text-lg"
              >
                {{ category_form.name }}
              </option>
            </select>
            <div
              v-show="showRequireErrors"
              v-for="error in categoryValidationErrors"
              :key="error"
            >
              <p class="text-red-600">{{ error }}</p>
            </div>
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
            class="w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600"
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
          <div
            v-show="showRequireErrors || contentValidationErrors"
            v-for="error in contentValidationErrors.concat(contentRequired)"
            :key="error"
          >
            <p class="text-red-600">{{ error }}</p>
          </div>
          <div v-for="error in errors" :key="error">
            <AlertIndicate
              class="my-2"
              theme="danger"
              :showSummary="false"
              :message="error[0]"
            ></AlertIndicate>
          </div>
          <div v-show="!isLoading" class="flex flex-row-reverse mt-4">
            <button
              v-on:click="submit(false, true)"
              class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 shadow-lg"
            >
              Publish post
            </button>
            <button
              v-on:click="submit(true, false)"
              class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-gray-500 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-800 mr-2 ml-auto shadow-lg"
              v-bind:disabled="!draftAllValid"
            >
              Save Draft
            </button>
            <button
              v-on:click="cancel"
              class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center black rounded-lg focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-900 hover:bg-gray-200 border border-gray-600 shadow-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-show="showDraftList">
      <div class="lg:flex justify-center mt-10 px-2">
        <div class="lg:w-6/12">
          <div class="flex flex-row-reverse">
            <button
              class="text-blue-500 hover:text-blue-400 hover:underline"
              @click="changeShowDraftList"
            >
              Close saved drafts
            </button>
          </div>
          <div v-for="(draft, i) in draft_list" :key="draft">
            <div class="rounded-lg bg-blue-50 border">
              <p class="text-xl pt-4 pl-4">
                <span v-if="draft.title">{{ draft.title }}</span>
                <span v-else>(Title not registered)</span>
              </p>
              <p class="h-16 p-4 truncate">
                <span v-if="draft.content">{{ draft.content }}</span>
                <span v-else>(Content not registered)</span>
              </p>
            </div>
            <div class="flex flex-row-reverse mt-1 mb-4">
              <button
                @click="editDraft(i)"
                class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center rounded-lg focus:ring-4 text-white bg-blue-500 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 shadow-lg"
              >
                Edit
              </button>
              <button
                @click="deleteDraftConfirm = true"
                class="inline-flex items-center px-5 py-2.5 mr-2 text-sm font-medium text-center rounded-lg focus:ring-4 text-white bg-gray-500 focus:ring-gray-100 dark:focus:ring-gray-900 hover:bg-gray-900 shadow-lg"
              >
                Delete
              </button>
            </div>
            <div v-show="deleteDraftConfirm">
              <PopUpModal
                iconType="info"
                :cancelButton="false"
                message="Delete a saved draft. Do you want to execute it?"
                positiveMessage="Cancel"
                negativeMessage="Delete"
                positiveColor="gray"
                negativeColor="blue"
                @positive="deleteDraftConfirm = false"
                @negative="deletePost(i)"
              />
            </div>
          </div>
          <IntersectionObserver
            @observed="addDrafts"
            :disableObserver="isLoading"
          />
        </div>
      </div>
    </div>
    <div v-show="isLoading" class="mt-10">
      <LoadingSpinner />
    </div>
    <div v-show="showCancelConfirm">
      <PopUpModal
        iconType="info"
        :cancelButton="true"
        message="This post has not yet been saved. Do you want to save and exit?"
        positiveMessage="Exit without saving"
        negativeMessage="Save and exit"
        positiveColor="gray"
        negativeColor="blue"
        @positive="cancelConfirmed"
        @negative="saveAndCancel"
        @cancel="hideCancelModal"
      />
    </div>
  </div>
</template>

<script setup>
import { watch, ref, computed, onMounted, nextTick } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import mdHelper from "@/js/helpers/mdHelper";
import postFetcher from "@/js/fetchers/postFetcher";
import postValidator from "@/js/validators/postValidator";
import AlertIndicate from "@/components/parts/AlertIndicate.vue";
import LoadingSpinner from "@/components/parts/LoadingSpinner.vue";
import PopUpModal from "@/components/parts/PopUpModal.vue";
import IntersectionObserver from "@/components/parts/IntersectionObserver.vue";
import VueMarkdownIt from "vue3-markdown-it";
import HelpCircleOutline from "vue-material-design-icons/HelpCircleOutline.vue";

// eslint-disable-next-line no-undef
const emit = defineEmits(["success"]);

const { replacePlainToMd } = mdHelper();
const store = useStore();
const router = useRouter();
const { cookies } = useCookies();

const ulid = ref(null);
const title = ref("");
const content = ref("");
const category = ref(null);
const is_draft = ref(false);
const is_publish = ref(false);
const isSaved = ref(false); // Whether saved in DB or not

const categories = ref(false);

const height = ref();
const area = ref(null);
const preview = ref(false);

const isLoading = ref(false);
const errors = ref([]);
const showCancelConfirm = ref(false);
const confirmCancel = ref(false);
const showRequireErrors = ref(false);
const showDraftList = ref(false);
const draft_list = ref([]);
const deleteDraftConfirm = ref(false);
const draft_nextPage = ref(1);

onMounted(() => {
  if (cookies.isKey("post_form")) {
    registerFormValue();
  }
});

/**
 * set value from cookie
 */
const registerFormValue = () => {
  const data = cookies.get("post_form");

  title.value = data.title;
  content.value = data.content;
  ulid.value = data.ulid;
  isSaved.value = data.isSaved;

  registerPostData_toVuex();
};

// `is_draft == true`の場合`required`は不要なのでエラーの表示を分割する
const titleRequired = ref([]);
const contentRequired = ref([]);

const { validationTitle, validationContent, requireForm } = postValidator();

/**
 * @return {array}
 */
const requireValidationErrors = computed(() => {
  return requireForm({
    title: title.value,
    content: replacedContent.value,
    category: category.value,
  });
});

/**
 * @return {array}
 */
const titleValidationErrors = computed(() => {
  return validationTitle(title.value);
});

/**
 * @return {array}
 */
const contentValidationErrors = computed(() => {
  return validationContent(replacedContent.value);
});

const categoryValidationErrors = ref([]);

/**
 * @return {bool}
 */
const publishAllValid = computed(() => {
  return !(
    titleValidationErrors.value.length +
    contentValidationErrors.value.length +
    requireValidationErrors.value.length
  );
});

/**
 * @return {bool}
 */
const draftAllValid = computed(() => {
  return !(
    titleValidationErrors.value.length + contentValidationErrors.value.length
  );
});

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

watch([title, content, category], () => {
  isSaved.value = false;
  showRequireErrors.value = false;
  addRequireErrors();
  registerPostData_toVuex();
  store.dispatch("setForm_post_isSaved", isSaved.value);
});

const registerPostData_toVuex = () => {
  const data = {
    ulid: ulid.value,
    title: title.value,
    content: replacedContent.value,
    category_uuid: category.value,
    is_draft: is_draft.value,
    is_publish: is_publish.value,
    isSaved: isSaved.value,
  };

  store.dispatch("setForm_post", data);
  cookies.set("post_form", data, null, "/post");
};

const addRequireErrors = () => {
  const errors = requireValidationErrors.value;

  titleRequired.value = errors.includes("title") ? ["Title is required"] : [];
  categoryValidationErrors.value = errors.includes("category")
    ? ["category is required"]
    : [];
  contentRequired.value = errors.includes("content")
    ? ["Content is required"]
    : [];
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

  if (publish && !publishAllValid.value) {
    showRequireErrors.value = true;
    addRequireErrors();
    return;
  }

  isLoading.value = true;
  errors.value = [];

  registerPostData_toVuex();
  const { submitPost, updatePost } = postFetcher();

  try {
    let result;
    if (ulid.value) {
      result = await updatePost();
    } else {
      result = await submitPost();
    }

    if (result) {
      ulid.value = result.ulid;
      emit("success", is_draft.value);

      if (draft) {
        isSaved.value = true;
        store.dispatch("setForm_post_isSaved", isSaved.value);
      } else {
        store.dispatch("setForm_post", null);
        cookies.remove("post_form");
      }
    }
  } catch (e) {
    errors.value = e.response.data.errors;
  }

  isLoading.value = false;
};

const getCategories = async () => {
  const { fetchCategories } = postFetcher();

  try {
    const response = await fetchCategories();
    categories.value = JSON.parse(JSON.stringify(response));
  } catch (e) {
    errors.value = e.response.data.errors;
  }
};

/**
 * Switch screen to draft list
 */
const changeShowDraftList = () => {
  if (showDraftList.value == false) {
    getDrafts();
  }
  showDraftList.value = !showDraftList.value;
};

const getDrafts = async () => {
  const { fetchDrafts } = postFetcher();

  isLoading.value = true;

  try {
    const response = await fetchDrafts(draft_nextPage.value);

    draft_list.value = JSON.parse(JSON.stringify(draft_list.value)).concat(
      response[0].data
    );

    draft_nextPage.value = response[0].next_page_url
      ? response[0].current_page + 1
      : null;
  } catch (e) {
    errors.value = e.response.data.errors;
  }

  isLoading.value = false;
};

const addDrafts = () => {
  if (draft_nextPage.value) {
    getDrafts();
  }
};

const cancel = () => {
  if (
    !isSaved.value &&
    !confirmCancel.value &&
    title.value.length + content.value.length
  ) {
    showCancelConfirm.value = true;
    return;
  }

  store.dispatch("setForm_post", null);
  cookies.remove("post_form");

  router.push(router.referrer);
};

const cancelConfirmed = () => {
  confirmCancel.value = true;
  cancel();
};

const saveAndCancel = () => {
  submit(true, false);
  confirmCancel.value = true;
  cancel();
};

const hideCancelModal = () => {
  showCancelConfirm.value = false;
};

/**
 * Reflect the contents of the draft in the form
 *
 * @param {int} i
 */
const editDraft = (i) => {
  ulid.value = draft_list.value[i].ulid;
  title.value = draft_list.value[i].title ? draft_list.value[i].title : "";
  content.value = draft_list.value[i].content
    ? draft_list.value[i].content
    : "";
  category.value = draft_list.value[i].category_uuid;

  registerPostData_toVuex();

  showDraftList.value = false;
};

/**
 * @param {int} i
 */
const deletePost = (i) => {
  const { deletePost } = postFetcher();
  deletePost(draft_list.value[i].ulid);

  if (ulid.value == draft_list.value[i].ulid) {
    ulid.value = null;
    registerPostData_toVuex();
  }

  draft_list.value.splice(i, 1);
  deleteDraftConfirm.value = false;
};

getCategories();
</script>
