<template>
  <div class="relative inline-block">
    <!-- Avatar button -->
    <button
      @click="toggle($event)"
      class="flex items-center gap-3 rounded-full cursor-pointer"
      :aria-expanded="open ? 'true' : 'false'"
      aria-haspopup="true"
      type="button"
    >
      <OverlayBadge :severity="online ? 'success' : 'danger'" position="bottom-left">
        <Avatar v-if="image" :image="image" size="large" shape="circle" class="w-10! h-10!" />
        <Avatar size="large" shape="circle" class="w-10! h-10!">
          <i class="pi pi-user"></i>
        </Avatar>
      </OverlayBadge>
    </button>

    <!-- OverlayPanel (the menu) -->
    <OverlayPanel
      ref="op"
      :dismissable="true"
      class="overflow-hidden rounded-xl shadow-lg"
      :style="{ minWidth: '260px' }"
    >
      <div class="bg-white text-dark">
        <!-- header -->
        <div class="flex gap-3 items-center pb-4 border-b border-slate-100">
          <OverlayBadge severity="success" position="bottom-left">
            <Avatar v-if="image" :image="image" size="large" shape="circle" class="w-10! h-10!" />
            <Avatar size="large" shape="circle" class="w-10! h-10!">
              <i class="pi pi-user"></i>
            </Avatar>
          </OverlayBadge>

          <div>
            <p class="text-dark text-sm">{{ name }}</p>
            <p class="text-secondary-4 text-xs">{{ email }}</p>
          </div>
        </div>

        <!-- menu items -->
        <ul class="divide-y divide-slate-100">
          <li v-for="(item, idx) in items" :key="idx">
            <button
              @click="onItemClick(item)"
              class="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50 cursor-pointer rounded"
              role="menuitem"
            >
              <img :src="item.icon" alt="icon" />
              <span class="flex-1 text-sm">{{ $t(item.label) }}</span>
            </button>
          </li>
        </ul>

        <!-- footer small links / version -->
        <div class="px-4 py-1 text-xs text-secondary-4 flex items-center gap-1">
          <a href="#" class="flex-shrink-0">الشروط</a>
          ·
          <a href="#" class="flex-shrink-0">الخصوصية</a>
          ·
          <span href="#" class="flex-shrink-0">v1.1</span>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Avatar from 'primevue/avatar'
import OverlayPanel from 'primevue/overlaypanel'
import { OverlayBadge } from 'primevue'
import SettingsSvg from '@/assets/images/svg/common/settings.svg'
import LogoutSvg from '@/assets/images/svg/common/logout.svg'
import { useAuthStore } from '@/modules/auth/stores/authStore'
import router from '@/router'

const authStore = useAuthStore()
const props = defineProps({
  name: { type: String, default: 'اسم المستخدم' },
  email: { type: String, default: 'user@example.com' },
  image: { type: String, default: null },
  items: {
    type: Array,
    default: () => [
      { label: 'common.settings', icon: SettingsSvg, event: 'Settings' },
      { label: 'common.logout', icon: LogoutSvg, event: 'logout' },
    ],
  },
  online: { type: Boolean, default: true },
})

const op = ref(null)

function toggle(event) {
  if (!op.value) return
  op.value.toggle(event)
}

function onItemClick(item) {
  if (item.event === 'logout') {
    authStore.logout()
  } else {
    router.push({ name: item.event })
  }

  if (op.value) op.value.hide()
}
</script>

<style scoped>
:deep(.p-overlaybadge .p-badge) {
  inset-block-start: 36px;
  inset-inline-end: 6px;
}
:deep(.p-popover-content) {
  padding: 8px !important;
}
</style>
