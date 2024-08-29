<template>
    <div class="container mt-4">
        <h1 class="mb-4">Posts</h1>
        <AddPost :post="selectedPost" @post-added="fetchPosts" />
        <List :posts="posts" @post-deleted="fetchPosts" @post-updated="setSelectedPost" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AddPost from '@/components/AddPost.vue';
import List from '@/components/List.vue';
import http from '@/plugins/http';

const posts = ref([]);
const selectedPost = ref(null);

const fetchPosts = async () => {
    try {
        const response = await http.get('/posts');
        posts.value = response.data;
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
    }
};

const setSelectedPost = (post) => {
    selectedPost.value = post;
};

onMounted(() => {
    fetchPosts();
});
</script>

<style scoped></style>
