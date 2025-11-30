<script setup lang="ts">
import type { Pagination } from '../../types/types'

interface Props {
    pagination: Pagination | null | undefined
    currentPage: number
    pageGroup: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'update:currentPage': [value: number]
    'update:pageGroup': [value: number]
}>()

// pages for current group
const getVisiblePages = computed(() => {
    if (!props.pagination) return []

    const startPage = props.pageGroup * 3 + 1
    const lastPage = props.pagination.last_page
    const pages = []

    for (let i = startPage; i < startPage + 3 && i <= lastPage; i++) {
        pages.push(i)
    }

    return pages
})

//  next group 
const nextGroup = () => {
    if (!props.pagination) return

    const nextGroupStart = (props.pageGroup + 1) * 3 + 1
    if (nextGroupStart <= props.pagination.last_page) {
        emit('update:pageGroup', props.pageGroup + 1)
        emit('update:currentPage', nextGroupStart)
    }
}

//  previous group 
const prevGroup = () => {
    if (props.pageGroup > 0) {
        emit('update:pageGroup', props.pageGroup - 1)
        emit('update:currentPage', props.pageGroup * 3 + 1 - 3)
    }
}

const setCurrentPage = (page: number) => {
    emit('update:currentPage', page)
}
</script>

<template>
    <div v-if="pagination">

        <!-- Previous Group  -->
        <button @click="prevGroup" :disabled="pageGroup === 0"
            class="px-4 py-2 border border-gray-500 bg-white rounded-md text-black disabled:text-gray-300">
            < </button>

                <!-- Page Number Buttons -->
                <button v-for="page in getVisiblePages" :key="page" @click="setCurrentPage(page)" :class="[
                    'px-4 py-2  rounded-md transition-colors mx-2',
                    currentPage === page
                        ? 'bg-black text-white'
                        : 'bg-white text-black border border-gray-500 hover:bg-zinc-500'
                ]">
                    {{ page }}
                </button>

                <!-- Next Group  -->
                <button @click="nextGroup" :disabled="(pageGroup + 1) * 3 + 1 > (pagination?.last_page || 0)"
                    class="px-4 py-2 border border-gray-500 bg-white rounded-md text-black disabled:text-gray-300">
                    &gt;
                </button>
    </div>
</template>