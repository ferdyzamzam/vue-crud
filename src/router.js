import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue';
import edit from '@/views/edit.vue';
import user from '@/views/user/user.vue';
import edit_user from '@/views/user/edit_user.vue';
import Home from '@/Home.vue';
import info from '@/views/info/info.vue';
import info_create from '@/views/info/info_create.vue';
import info_show from '@/views/info/info_show.vue';
import info_index from '@/views/info/info_index.vue';
import info_edit from '@/views/info/info_edit.vue';
import category from '@/views/category.vue';


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
            path: '/home',
            name: 'home',
            component: Home,
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
        {
            path: '/info',
            name: 'info',
            component: info,
        },
        {
            path: '/info/create',
            name: 'info_create',
            component: info_create,
        },
        {
            path: '/info/show/:id',
            name: 'info_show',
            component: info_show,
        },
        {
            path: '/info/index/',
            name: 'info_index',
            component: info_index,
        },
        {
            path: '/info/edit/:id',
            name: 'info_edit',
            component: info_edit,
        },
        {
            path: '/category',
            name: 'category',
            component:category,
        }

    ]
})

export default router;