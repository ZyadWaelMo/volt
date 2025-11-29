<script setup lang="ts">
import { type ProductsResponse } from "../../types/types"

const selectedCategoryIds = ref<string[]>([])
const selectedBrandIds = ref<string[]>([])
const currentPage = ref(1)
const pageGroup = ref(0)



const apiUrl = computed(() => {
    const baseUrl = 'https://fillcart.staging.hbm.studio/api/v2/products'
    const page = `page=${currentPage.value}`
    const perPage = `per_page=32`
    const filters = []

    if (selectedCategoryIds.value.length > 0) {
        const categoryIds = selectedCategoryIds.value.join(',')
        filters.push(`filter[v2_categories]=${categoryIds}`)
    }
    if (selectedBrandIds.value.length > 0) {
        const brandIds = selectedBrandIds.value.join(',')
        filters.push(`filter[brands]=${brandIds}`)
    }
    const filteredFilters = filters.length > 0 ? filters.join('&') + '&' : ''


    return `${baseUrl}?${filteredFilters}${page}&${perPage}`

})
const handleCategoriesChanged = (categoryIds: string[]) => {
    selectedCategoryIds.value = categoryIds
    currentPage.value = 1
    pageGroup.value = 1
}

const handleBrandsChanged = (brandIds: string[]) => {
    selectedBrandIds.value = brandIds
    currentPage.value = 1
    pageGroup.value = 1

}

///////////////////////////////////////////////////////////////////////////////
// Get the 3 pages for current group
const getVisiblePages = computed(() => {
    if (!data.value?.pagination) return []

    const startPage = pageGroup.value * 3 + 1
    const lastPage = data.value.pagination.last_page
    const pages = []

    for (let i = startPage; i < startPage + 3 && i <= lastPage; i++) {
        pages.push(i)
    }

    return pages
})

// Go to next group of 3 pages
const nextGroup = () => {
    if (!data.value?.pagination) return

    const nextGroupStart = (pageGroup.value + 1) * 3 + 1
    if (nextGroupStart <= data.value.pagination.last_page) {
        pageGroup.value++
        currentPage.value = nextGroupStart  // Set to first page of next group
    }
}

// Go to previous group of 3 pages
const prevGroup = () => {
    if (pageGroup.value > 0) {
        pageGroup.value--
        currentPage.value = pageGroup.value * 3 + 1  // Set to first page of previous group
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////



const { data } = useFetch<ProductsResponse>(apiUrl)


</script>




<template>
    <div class="p-4 pl-12">
        <h2 class="text-3xl">Appliances</h2>
        <div class="flex">
            <div class="flex flex-col">
                <Categories @categoriesChanged="handleCategoriesChanged" />
                <Brands @brandsChanged="handleBrandsChanged" />
            </div>
            <div class="flex flex-wrap">

                <ProductCard v-for="product in data?.data" :product />
            </div>

        </div>


        <div v-if="data?.pagination">
            <button @click="prevGroup" :disabled="pageGroup === 0"
                class="px-4 py-2 bg-black text-white disabled:bg-gray-300">
                < </button>



                    <!-- Page Number Buttons (always shows 3 pages per group) -->
                    <button v-for="page in getVisiblePages" :key="page" @click="currentPage = page" :class="[
                        'px-4 py-2 text-white rounded transition-colors',
                        currentPage === page
                            ? 'bg-black'
                            : 'bg-zinc-400 hover:bg-zinc-500'
                    ]">
                        {{ page }}
                    </button>




                    <!-- Next Group Button -->
                    <button @click="nextGroup" :disabled="(pageGroup + 1) * 3 + 1 > (data.pagination?.last_page || 0)"
                        class="px-4 py-2 bg-black text-white disabled:bg-gray-300 rounded">
                        &gt;
                    </button>
        </div>



    </div>
</template>
