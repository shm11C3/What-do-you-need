<template>
  <label>
    <UploadImageButton
      v-show="!isLoading"
      :isDisable="disableImageButton || imageCount >= 4"
      @selectImage="selectImage"
    />
    <LoadingSpinner v-show="isLoading" />
  </label>
</template>
<script setup>
import { ref, onMounted } from "vue";
import UploadImageButton from "@/components/parts/buttons/UploadImageButton.vue";
import Compressor from "compressorjs";
import postImageFetcher from "@/js/fetchers/postImageFetcher";
import { useStore } from "vuex";
import { useCookies } from "vue3-cookies";
import LoadingSpinner from "@/components/parts/LoadingSpinner.vue";

// eslint-disable-next-line no-undef
const emit = defineEmits(["pushUploadedImage"]);

onMounted(() => {
  if (cookies.isKey("post_form_image")) {
    store.dispatch("setImageGroupUuid", cookies.get("post_form_image"));
  }
});

const store = useStore();
const { cookies } = useCookies();

/**
 * 写真圧縮時のパラメータ
 */
const compressionParam = {
  quality: 0.8,
  maxWidth: 1920,
  maxHeight: 1080,
  mimeType: "image/jpeg",
};

const disableImageButton = ref(false);
const imageCount = ref(0);
const isLoading = ref(false);

/**
 * ファイル選択時
 *
 * @param {*} file
 */
const selectImage = (file) => {
  if (file === null) return;

  sendFile(file);
};

/**
 * ファイルをcompressorjsで圧縮し、送信
 *
 * @param {*} file
 */
const sendFile = async (file) => {
  const { uploadPostImage } = postImageFetcher();
  disableImageButton.value = isLoading.value = true;

  const payload = {
    quality: compressionParam.quality,
    maxWidth: compressionParam.maxWidth,
    maxHeight: compressionParam.maxHeight,
    mimeType: compressionParam.mimeType,
    async success(blob) {
      // DataURL(プレビュー用)を生成
      //blobToDataURL(blob, (dataUrl) => {
      //  preview.value.push(dataUrl);
      //});

      // FormDataを作成し、画像データを格納
      const data = new FormData();
      data.append("image", blob, "image.jpeg");

      const image_group_uuid = store.getters.form_post.image_group_uuid ?? null;

      // image_group_uuidが存在する場合はformDataに追加
      if (image_group_uuid) {
        data.append("image_group_uuid", image_group_uuid);
      }

      const result = await uploadPostImage(data);

      emit("pushUploadedImage", result);

      imageCount.value++;

      store.dispatch("setImageGroupUuid", result.image_group_uuid);
      cookies.set("post_form_image", result.image_group_uuid, null, "/post");

      disableImageButton.value = isLoading.value = false;
    },
    error(err) {
      console.error(err.message);
      disableImageButton.value = isLoading.value = false;
    },
  };

  new Compressor(file, payload);
};

/**
 * blobをDataURLに変換
 *
 * @url 参考 https://stackoverflow.com/questions/23150333/html5-javascript-dataurl-to-blob-blob-to-dataurl
 * @param {*} blob
 * @param {*} callback
 */
//const blobToDataURL = (blob, callback) => {
//  const fr = new FileReader();
//  fr.onload = function (e) {
//    callback(e.target.result);
//  };
//  fr.readAsDataURL(blob);
//};
</script>
