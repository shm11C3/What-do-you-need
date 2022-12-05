<template>
  <div class="infinity" ref="observeElement"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  disableObserver: { type: Boolean, default: false },
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["observed"]);

const observeElement = ref(null);

const callbackWrapper = async (entries) => {
  const entry = entries[0];

  if (entry && entry.isIntersecting && !props.disableObserver) {
    emit("observed", true);
  }
};

const options = {
  threshold: 0,
};

onMounted(() => {
  const observer = new IntersectionObserver(callbackWrapper, options);
  observer.observe(observeElement.value);
});
</script>
