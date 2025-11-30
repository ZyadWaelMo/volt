<script setup lang="ts">
import { type ProductsResponse } from "../../types/types"

const selectedCategoryIds = ref<string[]>([])
const selectedBrandIds = ref<string[]>([])
const currentPage = ref(1)
const pageGroup = ref(0)


const isModalOpen = ref(false)


const selectedCategoryTitles = ref<string[]>([])
const selectedBrandTitles = ref<string[]>([])




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

const { data } = useFetch<ProductsResponse>(apiUrl)





const handleCategoriesChanged = (categoryIds: string[]) => {
    selectedCategoryIds.value = categoryIds
    currentPage.value = 1
    pageGroup.value = 0
}


const handleBrandsChanged = (brandIds: string[]) => {
    selectedBrandIds.value = brandIds

    currentPage.value = 1
    pageGroup.value = 0

}





const handleCategoriesTitlesChanged = (categoriesTitles: string[]) => {
    selectedCategoryTitles.value = categoriesTitles
}

const handleBrandsTitlesChanged = (brandTitles: string[]) => {
    selectedBrandTitles.value = brandTitles
}





const flag = ref(true)
const toggleFilters = () => {
    flag.value = !flag.value
}



const strCategory = computed<string>(() => {
    return selectedCategoryTitles.value.join(' ');

})

const strBrand = computed<string>(() => {
    return selectedBrandTitles.value.join(' ');

})




const totalProductsCount = computed(() => {
    return data.value?.pagination?.total || 0
})





const clearAllFilters = () => {
    selectedBrandIds.value = []
    selectedCategoryIds.value = []
    selectedBrandTitles.value = []
    selectedCategoryTitles.value = []
    currentPage.value = 1
    pageGroup.value = 0
    isModalOpen.value = false
}





const numberOfFilters = computed(() => {
    return selectedCategoryIds.value.length + selectedBrandIds.value.length
})






const removeCategory = (categoryTitle: string) => {

    const index = selectedCategoryTitles.value.indexOf(categoryTitle)

    if (index > -1) {
        selectedCategoryIds.value.splice(index, 1)
        selectedCategoryTitles.value.splice(index, 1)
        currentPage.value = 1
        pageGroup.value = 0

    }

}

const removeBrand = (brandTitle: string) => {

    const index = selectedBrandTitles.value.indexOf(brandTitle)

    if (index > -1) {

        selectedBrandIds.value.splice(index, 1)
        selectedBrandTitles.value.splice(index, 1)
        currentPage.value = 1
        pageGroup.value = 0
    }


}




</script>




<template>

    <div class="sm:p-4 sm:pl-12 p-4 pl-4">

        <h2 class="text-3xl mb-10 sm:block hidden">Appliances</h2>


        <div class="flex sm:flex-row flex-col ">


            <div class="hidden sm:flex flex-col  pt-[70px]">
                <div :class="flag ? '' : 'hidden'">
                    <Categories @categoriesChanged="handleCategoriesChanged"
                        @categoriesTitlesChanged="handleCategoriesTitlesChanged" />
                    <Brands @brandsChanged="handleBrandsChanged" @brandsTitleChanged="handleBrandsTitlesChanged" />
                </div>
            </div>


            <div class="flex flex-col w-full ">

                <div class="flex flex-wrap sm:flex-nowrap ">


                    <!-- Mobile -->
                    <div class="relative sm:hidden">
                        <Icon name="mage:filter" class="absolute top-3 left-4 w-5 h-5" />
                        <button @click="isModalOpen = true" class="py-2 px-10 ">Filter</button>
                        <span class="border-r-2 border-gray-400 "></span>
                    </div>


                    <!-- Desktop -->
                    <div class="relative hidden sm:block  order-1 sm:order-1 h-8 ">
                        <Icon name="mage:filter" class="absolute top-2 left-4 w-5 h-5" />
                        <button @click="toggleFilters"
                            class="sm:text-sm  border border-black py-2 rounded-md w-40 text-center">
                            {{ flag ? 'Hide Filters' : 'Filter' }}</button>

                    </div>




                    <div
                        :class="(strCategory.length > 0 || strBrand.length > 0) ? 'flex items-center flex-wrap text-sm rounded-sm p-2 order-3 sm:order-2 w-full sm:w-auto' : 'flex order-3 sm:order-2'">

                        <div v-for="category in selectedCategoryTitles"
                            class="bg-gray-100 px-2 py-1 mx-1 mb-3 rounded text-black ">
                            {{ category }} <span class="cursor-pointer" @click="removeCategory(category)"> &nbsp;
                                &times;</span>
                        </div>

                        <div v-for="brand in selectedBrandTitles" :key="brand"
                            class="bg-gray-100 px-2 py-1 mx-1 mb-3 rounded text-black ">
                            {{ brand }} <span class="cursor-pointer" @click="removeBrand(brand)"> &nbsp; &times;</span>
                        </div>

                        <span class="hidden sm:block sm:text-sm p-2 sm:self-start order-2 sm:order-3 ">{{
                            totalProductsCount }} Item{{ totalProductsCount !== 1 ?
                                's' : '' }}</span>
                    </div>
                    <span class="block sm:hidden p-2 self-start  order-2 sm:order-3 ">{{
                        totalProductsCount }} Item{{ totalProductsCount !== 1 ?
                            's' : '' }}</span>
                </div>


                <div class="flex flex-wrap justify-center mt-[14px] ">
                    <ProductCard v-for="product in data?.data" :product />
                </div>


            </div>

        </div>


        <Pagination :pagination="data?.pagination" v-model:currentPage="currentPage" v-model:pageGroup="pageGroup"
            class="text-center my-8" />



        <!-- Filter Modal lel mobile -->
        <div v-if="isModalOpen" class="fixed inset-0 z-50 bg-white sm:hidden">
            <!-- Header -->
            <div class="flex justify-between items-center p-4 border-b">
                <h2 class="text-xl font-bold">Filter by ({{ numberOfFilters }})</h2>
                <button @click="isModalOpen = false" class="text-3xl">&times;</button>
            </div>

            <!-- Filters -->
            <div class="overflow-y-auto p-4" style="height: calc(100vh - 140px)">
                <Categories @categoriesChanged="handleCategoriesChanged"
                    @categoriesTitlesChanged="handleCategoriesTitlesChanged" class="border-b-2 w-full" />
                <Brands @brandsChanged="handleBrandsChanged" @brandsTitleChanged="handleBrandsTitlesChanged"
                    class="border-b-2 w-full" />
            </div>

            <!-- Buttons -->
            <div class="fixed bottom-0 left-0 right-0 p-4 bg-white border-t flex gap-3">
                <button @click="clearAllFilters" class="flex-1 py-3 border border-black rounded-md">
                    Clear All
                </button>
                <button @click="isModalOpen = false" class="flex-1 py-3 bg-black text-white rounded-md">
                    View {{ totalProductsCount }} Items
                </button>
            </div>
        </div>


    </div>
</template>
