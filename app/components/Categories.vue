<script setup lang="ts">
import type { CategoriesResponse } from '~~/types/types';

const { data } = useFetch<CategoriesResponse>(`https://fillcart.staging.hbm.studio/api/v2/categories`)
const checkedCategories = ref<{ id: string, title: string }[]>([])

const emit = defineEmits<{
    categoriesChanged: [categoryIds: string[]]
}>()

const toggleCategory = (category: { id: string, title: string }) => {
    const index = checkedCategories.value.findIndex(c => c.id === category.id)

    if (index === -1) {
        checkedCategories.value.push(category)
    } else {
        checkedCategories.value.splice(index, 1)
    }

    emit('categoriesChanged', ids.value)


}

const isChecked = (categoryId: string) => {
    return checkedCategories.value.some(c => c.id === categoryId)
}

const ids = computed(() => checkedCategories.value.map(c => c.id))
const titles = computed(() => checkedCategories.value.map(c => c.title))






</script>

<template>
    <div class="w-[500px]">
        Categories

        <div class="mb-2" v-for="category in data?.data" :key="category.id">

            <input type="checkbox" :id="category.id" :checked="isChecked(category.id)"
                @change="toggleCategory({ id: category.id, title: category.title })" class="mr-1" />
            <label :for="category.id">
                {{ category.title }}
            </label>

        </div>
        <div class="mt-4">
            <strong>Checked categories:</strong>
            <pre>{{ ids }}</pre>
            <pre>{{ titles }}</pre>
        </div>
    </div>
</template>
