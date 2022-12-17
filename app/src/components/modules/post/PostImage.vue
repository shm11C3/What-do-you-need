<template>
  <label>
    <UploadImageButton
      :isDisable="disableImageButton || preview.length >= 4"
      @selectImage="selectImage"
    />
  </label>
</template>
<script setup>
import { ref } from "vue";
import UploadImageButton from "@/components/parts/buttons/UploadImageButton.vue";
import Compressor from "compressorjs";
import postImageFetcher from "@/js/fetchers/postImageFetcher";

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
const preview = ref([]);

/**
 * ファイル選択時
 *
 * @param {*} file
 */
const selectImage = (file) => {
  if (file === null) return;

  disableImageButton.value = true;

  sendFile(file);

  disableImageButton.value = false;
};

/**
 * ファイルをcompressorjsで圧縮し、送信
 *
 * @param {*} file
 */
const sendFile = (file) => {
  const { uploadPostImage } = postImageFetcher();

  const payload = {
    quality: compressionParam.quality,
    maxWidth: compressionParam.maxWidth,
    maxHeight: compressionParam.maxHeight,
    mimeType: compressionParam.mimeType,
    success(blob) {
      // DataURL(プレビュー用)を生成
      blobToDataURL(blob, (dataUrl) => {
        preview.value.push(dataUrl);
      });

      // FormDataを作成し、画像データを格納
      const data = new FormData();
      data.append("image", blob, "image.jpeg");

      uploadPostImage(data);
    },
    error(err) {
      console.log(err.message);
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
const blobToDataURL = (blob, callback) => {
  const fr = new FileReader();
  fr.onload = function (e) {
    callback(e.target.result);
  };
  fr.readAsDataURL(blob);
};
</script>
