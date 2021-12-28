<script setup>
import { ref, watch, toRefs } from 'vue';
import { useSearchFilters } from '@/composables/useSearchFilters';
import { usePlugins } from '@/composables/usePlugins';

const props = defineProps({ open: Boolean, plugin: Object });
const emit = defineEmits(['add', 'close']);

const { open } = toRefs(props);
const searchInput = ref('');
const input = ref({});
const isValid = ref(true);
const selectedPlugin = ref('');

const { filteredPlugins } = useSearchFilters();
const { getPluginInfo } = usePlugins();

function handleSubmit() {
  emit('add', { input: input.value, key: selectedPlugin.value });
  emit('close');
}

function selectPlugin(plugin) {
  selectedPlugin.value = plugin;
  input.value = getPluginInfo(selectedPlugin.value).defaults?.space ?? {};
}

watch(open, () => {
  if (props.plugin) {
    const key = Object.keys(props.plugin)[0];
    input.value = props.plugin[key];
    selectedPlugin.value = key;
  } else {
    input.value = {};
    selectedPlugin.value = '';
  }
});
</script>

<template>
  <UiModal :open="open" @close="$emit('close')">
    <template v-slot:header>
      <h3>
        {{
          selectedPlugin ? $t('settings.editPlugin') : $t('settings.addPlugin')
        }}
      </h3>
    </template>
    <Search
      v-if="!selectedPlugin"
      v-model="searchInput"
      :placeholder="$t('searchPlaceholder')"
      :modal="true"
    />
    <div class="mt-4 mx-0 md:mx-4">
      <div v-if="selectedPlugin" class="mb-4 link-color">
        <h4 v-text="selectedPlugin.name" class="mb-3 text-center" />
        <UiButton
          class="block w-full mb-3 overflow-x-auto"
          style="height: auto"
        >
          <TextareaJson
            v-model="input"
            v-model:is-valid="isValid"
            :placeholder="$t('settings.pluginParameters')"
            class="input text-left"
            style="width: 560px"
          />
        </UiButton>
        <a :href="getPluginInfo(selectedPlugin).website" target="_blank">
          <UiButton class="w-full mb-3">
            Readme
            <Icon name="external-link" size="14" class="text-color" />
          </UiButton>
        </a>
        <UiButton
          @click="handleSubmit"
          :disabled="!isValid"
          class="w-full"
          primary
        >
          {{ selectedPlugin ? $t('save') : $t('add') }}
        </UiButton>
      </div>
      <div v-else>
        <a
          v-for="(plugin, i) in filteredPlugins(searchInput)"
          :key="i"
          @click="selectPlugin(plugin)"
        >
          <BlockPlugin :plugin="plugin" />
        </a>
        <NoResults
          v-if="Object.keys(filteredPlugins(searchInput)).length < 1"
        />
      </div>
    </div>
  </UiModal>
</template>
