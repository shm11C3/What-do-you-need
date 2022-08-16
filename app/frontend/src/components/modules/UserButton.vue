<template>
  <div class="mx-4 lg:mx-16">
    <div class="flex lg:flex-row flex-col items-stretch h-auto">
      <button
        v-bind:class="
          bgColors[0] +
          animation[0] +
          ' grow text-white text-center text-xl px-4 py-2 my-2 rounded-full h-16 shadow-xl'
        "
        v-on:click="onClickButton(0)"
      >
        <div class="flex justify-center">
          <Post :size="28"></Post>
          Posts
        </div>
      </button>
      <button
        v-bind:class="
          bgColors[1] +
          animation[1] +
          ' grow text-white text-center text-xl px-4 py-2 my-2 mx-0 lg:mx-4 rounded-full h-16 shadow-xl'
        "
        v-on:click="onClickButton(1)"
      >
        <div class="flex justify-center">
          <AccountEdit :size="28"></AccountEdit>
          Edit
        </div>
      </button>
      <button
        v-bind:class="
          bgColors[2] +
          animation[2] +
          ' grow text-white text-center text-xl px-4 py-2 my-2 rounded-full h-16 shadow-xl'
        "
        v-on:click="onClickButton(2)"
      >
        <div class="flex justify-center">
          <Cog :size="28"></Cog>
          Setting
        </div>
      </button>
    </div>
  </div>
</template>
<script>
import Post from "vue-material-design-icons/Post.vue";
import AccountEdit from "vue-material-design-icons/AccountEdit.vue";
import Cog from "vue-material-design-icons/Cog.vue";
import { ref } from "vue";

const bgColor = {
  active: "bg-blue-500",
  inactive: "bg-slate-500",
};

export default {
  name: "UserProfileCard",

  components: {
    Post,
    AccountEdit,
    Cog,
  },

  props: {
    isOwner: { type: Boolean, default: false }, // ユーザー自身の投稿の場合true
    active: { type: Number, default: 0 }, // ロード時にアクティブとなるボタン
  },

  setup(props, context) {
    const bgColors = ref();
    const animation = ref();

    /**
     * ボタンのバックグラウンドカラーを変更する
     *
     * @param {int} active
     */
    const changeBgColors = (active) => {
      bgColors.value = [bgColor.inactive, bgColor.inactive, bgColor.inactive];
      bgColors.value[active] = bgColor.active;
    };

    const initClickAnimation = () => {
      animation.value = ["", "", ""];
    };

    /**
     * ボタンクリック時のCSSアニメーションを0.5秒追加する
     *
     * @param {int} buttonNumber
     */
    const clickAnimation = (buttonNumber) => {
      initClickAnimation();
      animation.value[buttonNumber] = " animate-bounce";

      setTimeout(initClickAnimation, 500);
    };

    /**
     * ボタン押下時に見た目の変更を親コンポーネントへの値受け渡しを行う
     *
     * @param {int} button_number
     */
    const onClickButton = (buttonNumber) => {
      changeBgColors(buttonNumber);
      clickAnimation(buttonNumber);
      context.emit("clickButton", buttonNumber);
    };

    changeBgColors(props.active);
    initClickAnimation();

    return {
      onClickButton,
      bgColors,
      animation,
    };
  },
};
</script>
