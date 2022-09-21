<template>
  <div
    class="lg:flex flex-col lg:flex-row block bg-gray-700 shadow-xl rounded-3xl lg:h-28 h-56 mx-3"
  >
    <div class="inline-block items-center m-4">
      <img class="rounded-full" src="https://via.placeholder.com/80x80x/" />
    </div>
    <div class="flex-auto flex">
      <div class="my-6 pl-3 flex-grow lg:w-auto">
        <p class="text-xl text-white">@{{ username }}</p>
        <p class="text-2xl text-white">
          {{ showName }}
        </p>
      </div>
      <div class="inline-block items-center my-9 mr-9">
        <button v-on:click="changeCountryView">
          <span v-if="showCountryName">
            <p class="text-2xl text-white">{{ country_name }}</p>
          </span>
          <span v-else>
            <country-flag :country="country_code" size="big" />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import CountryFlag from "vue-country-flag-next";
import country from "../../js/consts/county";

export default {
  name: "UserProfileCard",
  components: {
    CountryFlag,
  },
  props: {
    showName: { type: String, default: "No data" },
    username: { type: String, default: "No data" },
    country_id: { type: Number, default: 0 },
    country_name: { type: String, default: "No data" },
  },
  setup(props) {
    const { country_code_list } = country();

    const showCountryName = ref(false);

    const country_code = computed(() => {
      return country_code_list.find((el) => el.code == props.country_id).label;
    });

    const changeCountryView = () => {
      showCountryName.value = !showCountryName.value;
    };

    return {
      changeCountryView,
      country_code,
      showCountryName,
    };
  },
};
</script>
