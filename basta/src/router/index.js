import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AccountOverview from '@/components/account/AccountOverview'
import Login from '@/components/account/Login'
import Logout from '@/components/account/Logout'
import Activation from '@/components/account/Activation'
import Registration from '@/components/account/Registration'
import PasswordResetMail from '@/components/account/PasswordResetMail'
import PasswordResetConfirmation from '@/components/account/PasswordResetConfirmation'
import BugReportOverview from '@/components/bugReport/BugReportOverview'


import FoodOverview from '@/components/food/FoodOverview'
import FoodDetail from '@/components/food/FoodDetail'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/login', name: 'login', component: Login},
    {path: '/logout', name: 'logout', component: Logout, meta: {auth: false}},
    {path: '/registration', name: 'registration', component: Registration},
    {path: '/activation/:uuid/:token', name: 'activation', component: Activation},
    {path: '/account', name: 'account', component: AccountOverview, meta: {auth: true}},
    {path: '/password-reset', name: 'password-reset-mail', component: PasswordResetMail, meta: {auth: false}},
    {
      path: '/password-reset/confirm/:uuid/:token',
      name: 'password-reset-confirm',
      component: PasswordResetConfirmation,
      meta: {auth: false}
    },

    {path: '/food', name: 'food', component: FoodOverview},
    {path: '/food/:id', name: 'food-detail', component: FoodDetail},
    {path: '/bug-report', name: 'bug-report', component: BugReportOverview},
  ]
})
