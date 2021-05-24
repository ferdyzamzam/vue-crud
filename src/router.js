import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue';
import edit from '@/views/edit.vue';
import user from '@/views/user/user.vue';
import edit_user from '@/views/user/edit_user.vue';


Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/index',
            name: 'index',
            component: Index,
        },
        {
            path: '/edit/:id',
            name: 'edit',
            component: edit,
        },
        {
            path: '/user',
            name: 'user',
            component: user,
        },
        {
            path: '/edit_user/:id',
            name: 'edit_user',
            component: edit_user,
        },

    ]
})

export default router;