<script setup lang="ts">

import { type ProductsType } from "../../types/types"
defineProps<{
    product: ProductsType
}>();

</script>

<template>
    <div class="p-4 pl-12 flex justify-between w-[247px] mr-5">
        <div>
            <div class="h-[296px] w-[247px]">
                <NuxtImg :src="product.featured_image" sizes="xs:100vw sm:50vw lg:400px" format="webp" densities="x1"
                    alt="Img" />
            </div>
            <h3>{{ product.title }}</h3>
            <p>{{ product.price }}</p>
        </div>
    </div>
</template>
