<script setup lang="ts">

const isModalOpen = ref(false)




</script>




<template>
    <div class="px-6 sm:px-40 flex border-b-2 sm:pt-6 sm:pb-6 pt-0 pb-6">


        <Icon @click="isModalOpen = true" name="fluent:line-horizontal-3-20-regular" class="xl:hidden w-6 h-6" />


        <div v-if="isModalOpen" class="fixed inset-0 z-50 bg-white xl:hidden">

            <div class="flex justify-between items-center p-4 border-b">
                <div></div>
                <button @click="isModalOpen = false" class="text-3xl ">&times;</button>
            </div>
            <ul class="flex flex-col items-center w-full text-[14px] font-bold">

                <li><span href="#"
                        class="inline-block transition duration-300 ease-in-out hover:scale-125 mb-10">Grocery</span>
                </li>
                <li><a href="#"
                        class="inline-block transition duration-300 ease-in-out hover:scale-125 mb-10">Electronics</a>
                </li>
                <li><a href="#"
                        class="inline-block transition duration-300 ease-in-out hover:scale-125 mb-10">Clothing</a>
                </li>
                <li><a href="#"
                        class="inline-block transition duration-300 ease-in-out hover:scale-125 mb-10">Furniture</a>
                </li>
                <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125 mb-10">Toys &
                        Video
                        games</a></li>
                <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125 mb-10">Baby</a>
                </li>
                <li><a href="#"
                        class="inline-block transition duration-300 ease-in-out hover:scale-125 mb-10">Beauty</a></li>
                <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125 mb-10">Personal
                        Care</a>
                </li>
                <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125 mb-10">Pets</a>
                </li>
                <li><a href="#"
                        class="inline-block transition duration-300 ease-in-out hover:scale-125 mb-10">Sports</a></li>
                <li><a href="#"
                        class="inline-block transition duration-300 ease-in-out hover:scale-125 mb-10">Stationery</a>
                </li>
                <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125 ">Brands</a>
                </li>
            </ul>

        </div>



        <ul class="hidden xl:flex justify-around w-full text-[14px] font-bold">

            <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125">Grocery</a></li>
            <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125">Electronics</a>
            </li>
            <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125">Clothing</a></li>
            <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125">Furniture</a></li>
            <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125">Toys & Video
                    games</a></li>
            <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125">Baby</a></li>
            <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125">Beauty</a></li>
            <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125">Personal Care</a>
            </li>
            <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125">Pets</a></li>
            <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125">Sports</a></li>
            <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125">Stationery</a></li>
            <li><a href="#" class="inline-block transition duration-300 ease-in-out hover:scale-125">Brands</a></li>
        </ul>
    </div>



</template>
