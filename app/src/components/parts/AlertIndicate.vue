<template>
  <div
    :class="`${bgColor} ${txtColor} px-4 py-3 rounded-3xl shadow`"
    role="alert"
  >
    <div v-if="showSummary">
      <strong class="font-bold">{{ summary }}</strong
      ><br />
    </div>
    <span class="block sm:inline">{{ message }}</span>
  </div>
</template>
<script>
const bgColorList = {
  danger: "bg-pink-100",
  info: "bg-indigo-100",
  warn: "bg-amber-100",
};

const txtColorList = {
  danger: "text-red-700",
  info: "text-blue-800",
  warn: "text-orange-700",
};

export default {
  name: "AlertIndicate",
  props: {
    theme: { type: String, default: "danger" },
    showSummary: { type: Boolean, default: true },
    summary: { type: String, default: "Error" },
    message: { type: String },
  },
  setup(props) {
    return {
      bgColor: bgColorList[props.theme],
      txtColor: txtColorList[props.theme],
    };
  },
};
</script>
