<script setup lang="ts">

import { type ProductsType } from "../../types/types"
defineProps<{
    product: ProductsType
}>();

</script>

<template>
    <div
        class=" flex justify-between flex-wrap sm:w-[248px] sm:h-[383px] w-[157px] h-[244px] sm:mr-6 sm:mb-[70px] mr-[12px] mb-[70px] sm:ml-[0px] ml-[8px] ">
        <div>
            <div class="relative">

                <div class="sm:h-[296px] sm:w-[248px] h-[188px] w-[157px] ">
                    <NuxtImg :src="product.featured_image" class="w-full h-full" format="webp" densities="x1"
                        alt="Img" />
                </div>
                <div
                    class="w-[24px] h-[24px] sm:w-[38px] sm:h-[38px] bg-white rounded-full absolute top-3 right-2 z-10">
                    <Icon name="mdi-light:heart"
                        class=" h-[25px] w-[25px] sm:h-[35px] sm:w-[35px] mt-0 sm:mt-0.5 ml-0 sm:ml-0.5 cursor-pointer" />
                </div>
            </div>
            <h3 class="sm:text-lg text-xs pt-4">{{ product.title }}</h3>
            <p class="font-bold sm:text-lg text-xs">{{ product.price }} EGP</p>
        </div>
    </div>
</template>
