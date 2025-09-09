<template>
  <div class="bg-white flex justify-between items-center py-7 px-28">
    <div>
      <LanguageSwitcher />
    </div>
    <div class="flex gap-4 items-center">
      <IconField >
        <InputIcon class="pi pi-search" />
        <InputText class="max-w-56" v-model="value1" :placeholder="$t('common.search')" />
      </IconField>
      <Divider layout="vertical" class="h-3" />
      <Notifications />
      <Divider layout="vertical" class="h-3" />
      <AvatarMenu name="اسم المستخدم" email="user@surely.com" />
    </div>
  </div>
</template>

<script setup>
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import Notifications from '@/components/common/Notifications.vue'
import AvatarMenu from '@/components/common/AvatarMenu.vue'
import Divider from 'primevue/divider'
</script>
