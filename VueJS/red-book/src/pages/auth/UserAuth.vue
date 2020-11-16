<template>
    <div>
        <base-dialog :show="!!error" title="The Red Book" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="isLoading" title="Authenticating" fixed>
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <h1>{{header}}</h1>
                <h5 v-if="mode!=='login'">You may be met with an error if on Mobile ¯\_(ツ)_/¯</h5>
                <div v-if="mode!=='login'"  class="form-control">
                <label class="" for="name">First Name</label>
                <input type="text" id="name" v-model.trim="name" required /> 
                </div> 
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model.trim="email" required/>
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model.trim="password" required/>
                </div>
                <div v-if="mode === 'login'">
                    <p class="forgot" @click="forgotPassword">I forgot my Password</p>
                </div> 
                <p v-if="!formIsValid">Please enter a valid e-mail and password (at least 6 characters)</p>
                <base-button>{{submitButtonCaption}}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">{{switchModeButtonCaption}}</base-button>
                <hr>
                <base-button type="button" @click="guestLogin">Guest Login</base-button>
                <h4>(Guests cannot Add Entries)</h4>
            </form>
        </base-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null
        }
    },
    computed: {
        submitButtonCaption() {
            if(this.mode === 'login'){
                return 'Login';
            }else{
                return 'Sign up';
            }
        },
        switchModeButtonCaption() {
            if(this.mode === 'login'){
                return 'Sign up';
            }else{
                return 'Login';
            }
        },
        header() {
            if(this.mode === 'login'){
                return 'Existing User Login';
            }else{
                return 'New User Sign up';
            }
        }
    },
    methods: {
        async submitForm() {
            this.formIsValid = true;
            try{
                if (this.email === '' || !this.email.includes('@') || this.password.length < 6){
                this.formIsValid = false;
                return;
                }
                this.isLoading = true;

                const actionPayload = {
                    email: this.email,
                    password: this.password,
                    name: this.name
                };

                if (this.mode === 'login'){
                    await this.$store.dispatch('login', actionPayload);
                } else {
                    await this.$store.dispatch('signup', actionPayload);
                }
                this.$router.replace('/random');
            } catch (err) {
                this.error = err.message || 'Failed to authenticate...';
            }
            this.isLoading = false;
        },
        async forgotPassword() {
            if(!this.email){
                this.error = "Enter your e-mail address first!"
                return;
            }
          try{
                await this.$store.dispatch('forgotPassword', this.email);
                this.error = "Check your inbox for a password reset e-mail!"
            } catch (err) {
                this.error = err.message || 'Password Reset Error';
            }
        },
        switchAuthMode() {
            if(this.mode === 'login') {
                this.mode = 'signup';
            } else {
                this.mode = 'login';
            }
        },
        handleError() {
            this.error = null;
        },
        async guestLogin() {
            try{
                await this.$store.dispatch('guestLogin');
                this.$router.replace('/random');
            } catch (err) {
                this.error = err.message || 'Guest Login Error';
            }
        }
    }
}
</script>


<style scoped>

.forgot {
  text-decoration: underline;
  cursor: pointer;
}
.forgot:hover {
    color: blue;
    text-decoration-color: blue;
    font-weight: bold;
}

form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>