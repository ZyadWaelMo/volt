<script setup lang="ts">
import type { BrandsResponse } from '~~/types/types';

const { data } = useFetch<BrandsResponse>(`https://fillcart.staging.hbm.studio/api/v1/brands`)
const checkedBrands = ref<{ id: string, title: string }[]>([])

const showAllBrands = ref(false)  // Toggle for show more/less
const maxVisibleBrands = 13  // Show first 13 brands


const emit = defineEmits<{
    brandsChanged: [brandIds: string[]]
}>()

const toggleBrand = (brand: { id: string, title: string }) => {
    const index = checkedBrands.value.findIndex(c => c.id === brand.id)

    if (index === -1) {
        checkedBrands.value.push(brand)
    } else {
        checkedBrands.value.splice(index, 1)
    }

    emit('brandsChanged', ids.value)


}

const isChecked = (brandId: string) => {
    return checkedBrands.value.some(c => c.id === brandId)
}

const ids = computed(() => checkedBrands.value.map(c => c.id))
const titles = computed(() => checkedBrands.value.map(c => c.title))



// Get visible brands based on showAllBrands state
const visibleBrands = computed(() => {
    if (!data.value?.data) return []
    
    if (showAllBrands.value) {
        return data.value.data  // Show all
    } else {
        return data.value.data.slice(0, maxVisibleBrands)  // Show first 13
    }
})

// Calculate remaining brands count
const remainingBrandsCount = computed(() => {
    if (!data.value?.data) return 0
    return data.value.data.length - maxVisibleBrands
})


</script>
<!-- 
<template>
    <div class="w-[500px]">
        Brands

        <div class="mb-2" v-for="brand in data?.data" :key="brand.id">

            <input type="checkbox" :id="brand.id" :checked="isChecked(brand.id)"
                @change="toggleBrand({ id: brand.id, title: brand.title })" class="mr-1" />
            <label :for="brand.id">
                {{ brand.title }} ({{ brand.products_count }})
            </label>

        </div>
        <div class="mt-4">
            <strong>Checked Brands:</strong>
            <pre>{{ ids }}</pre>
            <pre>{{ titles }}</pre>
        </div>
    </div>
</template> -->


<template>
    <div class="w-[500px] mt-4">
        <h3 class="font-bold mb-2">Brands</h3>

        <div class="mb-2" v-for="brand in visibleBrands" :key="brand.id">
            <input 
                type="checkbox" 
                :id="brand.id" 
                :checked="isChecked(brand.id)"
                @change="toggleBrand({ id: brand.id, title: brand.title })" 
                class="mr-1" 
            />
            <label :for="brand.id" class="cursor-pointer">
                {{ brand.title }} ({{ brand.products_count }})
            </label>
        </div>

        <!-- Show More / Show Less Button -->
        <button 
            v-if="data?.data && data.data.length > maxVisibleBrands"
            @click="showAllBrands = !showAllBrands"
            class="text-blue-600 hover:text-blue-800 underline mt-2"
        >
            <span v-if="!showAllBrands">
                Show more ({{ remainingBrandsCount }} brands)
            </span>
            <span v-else>
                Show less
            </span>
        </button>

        <div class="mt-4">
            <strong>Checked Brands:</strong>
            <pre>{{ ids }}</pre>
            <pre>{{ titles }}</pre>
        </div>
    </div>
</template>
