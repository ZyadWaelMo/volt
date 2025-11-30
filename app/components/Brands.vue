<script setup lang="ts">
import type { BrandsResponse } from '~~/types/types';

const { data } = useFetch<BrandsResponse>(`https://fillcart.staging.hbm.studio/api/v1/brands`)
const checkedBrands = ref<{ id: string, title: string }[]>([])


const emit = defineEmits<{
    brandsChanged: [brandIds: string[]],
    brandsTitleChanged: [brandTitles: string[]]
}>()




const searchQuery = ref('')
const filteredBrands = computed(() => {
    if (!data.value) {
        return []
    }

    return data.value.data.filter(brand =>
        brand.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})



const toggleBrand = (brand: { id: string, title: string }) => {
    const index = checkedBrands.value.findIndex(c => c.id === brand.id)

    if (index === -1) {
        checkedBrands.value.push(brand)
    } else {
        checkedBrands.value.splice(index, 1)
    }

    emit('brandsChanged', ids.value)
    emit('brandsTitleChanged', titles.value)


}

const isChecked = (brandId: string) => {
    return checkedBrands.value.some(c => c.id === brandId)
}

const ids = computed(() => checkedBrands.value.map(c => c.id))
const titles = computed(() => checkedBrands.value.map(c => c.title))



// const visibleBrands = computed(() => {
//     if (!data.value?.data) return []

//     if (showAllBrands.value) {
//         return data.value.data  // Show all
//     } else {
//         return data.value.data.slice(0, maxVisibleBrands)  // Show first 13
//     }
// })

const showAllBrands = ref(false)  // Toggle for see more/less
const maxVisibleBrands = 13  // Show first 13 brands (same as categories XD)

const visibleFilteredBrands = computed(() => {
    if (!filteredBrands) {
        return []
    }
    return showAllBrands.value ? filteredBrands.value : filteredBrands.value.slice(0, maxVisibleBrands)
})


const remainingBrandsCount = computed(() => {

    return Math.max(filteredBrands.value.length - maxVisibleBrands, 0)
})


const flag = ref(true)




</script>



<template>

    <div class="w-[262px] mt-4">


        <span class="font-bold mb-2 text-xl">Brand</span>
        <span @click="flag = !flag" class="ml-64 sm:ml-44 text-4xl cursor-pointer">{{ flag === true ?
            '-' : '+' }}</span>



        <div :class="flag ? '' : 'hidden'">

            <div class="relative flex py-3">
                <Icon class="absolute left-4 top-7 z-10" name="streamline-sharp:magnifying-glass" width="24"
                    height="24" />
                <input v-model="searchQuery" type="text"
                    class="p-4 pl-10 w-full h-12 bg-gray-200 rounded-full text-black placeholder-[black]"
                    placeholder="Search by brand">
            </div>


            <div class="mb-2 flex items-center" v-for="brand in visibleFilteredBrands" :key="brand.id">
                <input type="checkbox" :id="brand.id" :checked="isChecked(brand.id)"
                    @change="toggleBrand({ id: brand.id, title: brand.title })" class="mr-2 w-5 h-5 accent-black" />
                <label :for="brand.id" class="cursor-pointer">
                    {{ brand.title }} ({{ brand.products_count }})
                </label>
            </div>



            <!-- Show More / Show Less Button -->
            <button v-if="remainingBrandsCount > 0" @click="showAllBrands = !showAllBrands"
                class="text-black hover:text-gray-700 mt-2">
                <span v-if="!showAllBrands">
                    See more ({{ remainingBrandsCount }} brands)
                </span>
                <span v-else>
                    See less
                </span>
            </button>


        </div>


        <!-- <div class="mt-4">
            <strong>Checked Brands:</strong>
            <pre>{{ ids }}</pre>
            <pre>{{ titles }}</pre>
        </div> -->
    </div>
</template>
