<template>
    <div class="login-page">
        <div class="login-form">
            <input type="text" v-model="email" placeholder="Your email" />
            <input type="password" v-model="password" placeholder="Password" />
            <Button class="login-button" @click.native="onLoginClick">Login</Button>
            <div v-if="error">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Button from './Button.vue';

export default {
    components: {
        Button,
    },
    data() {
        return {
            email: null,
            password: null,
            error: null,
        };
    },
    methods: {
        ...mapActions(['login']),
        async onLoginClick() {
            this.error = null;
            try {
                await this.login({ email: this.email, password: this.password });
            } catch (error) {
                this.error = error.response.data.message;
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.login-page {
    width: 100%;
    max-width: 400px;
    margin: auto;

    .login-form {
        display: flex;
        flex-direction: column;
        margin-top: 320px;
        width: 400px;
        padding: 48px;
        border-radius: 6px;
        background-color: $white;
        box-shadow: $shadow-login;

        &> * {
            margin-top: 12px;
        }

        input {
          width: 100%;
          border-radius: 20px;
          margin-bottom: 16px;
          color: #ADADAD;
        }

        .login-button {
            width: 100%;
        }
    }
}
</style>
