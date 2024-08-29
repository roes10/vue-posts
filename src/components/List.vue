<template>
    <div class="container mt-4">
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Corpo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in paginatedPosts" :key="post.id">
                        <td>{{ post.title }}</td>
                        <td>{{ post.body }}</td>
                        <td>
                            <div class="d-flex">
                                <button @click="editPost(post)" class="btn btn-warning btn-sm me-2">
                                    <IconEdit />
                                </button>

                                <button @click="deletePost(post.id)" class="btn btn-danger btn-sm">
                                    <IconTrash />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Anterior</a>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Próximo</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import http from '@/plugins/http';
import IconTrash from './icons/IconTrash.vue';
import IconEdit from './icons/IconEdit.vue';

const props = defineProps({
    posts: Array,
});
const emit = defineEmits(['post-deleted', 'post-updated']);

const currentPage = ref(1);
const postsPerPage = 5;

const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage;
    const end = start + postsPerPage;
    return props.posts.slice(start, end);
});

const totalPages = computed(() => Math.ceil(props.posts.length / postsPerPage));

const deletePost = async (id) => {
    try {
        await http.delete(`/posts/${id}`);
        emit('post-deleted');
    } catch (error) {
        console.error('Erro ao deletar o post:', error);
    }
};

const editPost = (post) => {
    emit('post-updated', post);
};

const changePage = (page) => {
    if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
    }
};
</script>

<style scoped></style>
