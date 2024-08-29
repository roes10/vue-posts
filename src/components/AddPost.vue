<template>
    <div class="container mt-4">
        <form @submit.prevent="handleSubmit" class="bg-light p-4 rounded border">
            <div class="form-group mb-3">
                <label for="title" class="form-label">Título</label>
                <input id="title" v-model="title" type="text" class="form-control" placeholder="Título" />
            </div>
            <div class="form-group mb-3">
                <label for="body" class="form-label">Corpo</label>
                <textarea id="body" v-model="body" class="form-control" placeholder="Corpo" rows="4"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
                {{ isEditing ? 'Atualizar' : 'Adicionar' }}
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import http from '@/plugins/http';

const props = defineProps({
    post: Object,
});
const emit = defineEmits(['post-added']);

const title = ref('');
const body = ref('');
const isEditing = ref(false);
const postId = ref(null);

watch(() => props.post, (newPost) => {
    if (newPost) {
        title.value = newPost.title;
        body.value = newPost.body;
        postId.value = newPost.id;
        isEditing.value = true;
    } else {
        title.value = '';
        body.value = '';
        postId.value = null;
        isEditing.value = false;
    }
});

const handleSubmit = async () => {
    try {
        if (isEditing.value && postId.value) {
            await http.put(`/posts/${postId.value}`, {
                title: title.value,
                body: body.value,
            });
        } else {
            await http.post('/posts', {
                title: title.value,
                body: body.value,
            });
        }
        emit('post-added');
        title.value = '';
        body.value = '';
        postId.value = null;
        isEditing.value = false;
    } catch (error) {
        console.error('Erro ao salvar o post:', error);
    }
};
</script>

<style scoped></style>
