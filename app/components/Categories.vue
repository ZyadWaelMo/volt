<script setup lang="ts">
import type { CategoriesResponse } from '~~/types/types';





const searchQuery = ref('')

const filteredCategories = computed(() => {
    if (!data.value) {
        return []
    }
    return data.value.data.filter(category =>
        category.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})




const { data } = useFetch<CategoriesResponse>(`https://fillcart.staging.hbm.studio/api/v2/categories`)

const checkedCategories = ref<{ id: string, title: string }[]>([])


const emit = defineEmits<{
    categoriesChanged: [categoryIds: string[]],
    categoriesTitlesChanged: [categoriesTitles: string[]]
}>()


const toggleCategory = (category: { id: string, title: string }) => {
    const index = checkedCategories.value.findIndex(c => c.id === category.id)

    if (index === -1) {
        checkedCategories.value.push(category)
    } else {
        checkedCategories.value.splice(index, 1)
    }

    emit('categoriesChanged', ids.value)
    emit('categoriesTitlesChanged', titles.value)


}

const isChecked = (categoryId: string) => {
    return checkedCategories.value.some(c => c.id === categoryId)
}

const ids = computed(() => checkedCategories.value.map(c => c.id))
const titles = computed(() => checkedCategories.value.map(c => c.title))



const flag = ref(true)
// const toggleCategories = () => {
//     flag.value = !flag.value
// }



</script>

<template>
    <div class="w-[262px]">


        <span class="font-bold mb-2 text-xl">Category</span>
        <span @click="flag = !flag" class="ml-56 sm:ml-36 text-4xl cursor-pointer">{{ flag === true ?
            '-' : '+' }}</span>



        <div :class="flag ? '' : 'hidden'">

            <div class="relative flex py-3">
                <Icon class="absolute left-4 top-7 z-10" name="streamline-sharp:magnifying-glass" width="24"
                    height="24" />
                <input v-model="searchQuery" type="text"
                    class="p-4 pl-10 w-full h-12 bg-gray-200 rounded-full text-black placeholder-[black]"
                    placeholder="Search by category">
            </div>


            <div class="mb-2 flex items-center" v-for="category in filteredCategories" :key="category.id">
                <input type="checkbox" :id="category.id" :checked="isChecked(category.id)"
                    @change="toggleCategory({ id: category.id, title: category.title })"
                    class="mr-2 w-5 h-5 accent-black" />
                <label :for="category.id" class="cursor-pointer">
                    {{ category.title }}
                </label>
            </div>


        </div>
        <!-- <div class="mt-4">
            <strong>Checked categories:</strong>
            <pre>{{ ids }}</pre>
            <pre>{{ titles }}</pre>
        </div> -->
    </div>
</template>
