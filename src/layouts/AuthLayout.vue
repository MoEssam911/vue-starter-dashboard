<template>
  <div class="auth-layout">
    <div class="auth-container grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      <AuthImgCover class="" />
      <div>
        <div class="logo flex justify-center lg:pt-[13.5rem] md:pt-[10rem] pt-[5rem] pb-10">
          <img
            src="../assets/images/svg/common/logo.svg"
            width="150"
            height="51"
            alt="img-cover"
            class="w-[150px] object-cover object-[26%_50%]"
          />
        </div>

        <router-view />

        <div class="text-center">
          <span class="text-lg font-semibold">العربيه</span>
          <span> - </span>
          <span class="text-lg text-[#A9A9BC]">English</span>
          <p class="text-[#A9A9BC]">جميع الحقوق محفوظة لدي شورلي {{ new Date().getFullYear() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthImgCover from './components/AuthImgCover.vue'
</script>
